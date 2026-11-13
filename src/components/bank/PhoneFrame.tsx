import { useEffect, useState, type ReactNode } from "react";

// Every screen is laid out on a 402 x 871 canvas (ratio 720:1560 = 6:13) and
// scaled to fit, so a 720 x 1560 screen is just this canvas at 1.79x.
const DESIGN_W = 402;
const DESIGN_H = (DESIGN_W * 1560) / 720;
const MAX_SCALE = 720 / DESIGN_W;

type Fit = { scale: number; w: number; h: number; mobile: boolean } | null;

function measure(): Fit {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw < 640) {
    // Real phone: fill the screen, scale by width.
    const scale = vw / DESIGN_W;
    return { scale, w: vw, h: vh, mobile: true };
  }
  // Desktop: a 720:1560 device, capped at 720 x 1560 and shrunk to fit.
  const scale = Math.min(MAX_SCALE, (vh - 32) / DESIGN_H, (vw - 32) / DESIGN_W);
  return { scale, w: DESIGN_W * scale, h: DESIGN_H * scale, mobile: false };
}

/** Centered 720:1560 phone frame: full screen on mobile, a framed device on desktop. */
export function PhoneFrame({ children, overlay }: { children: ReactNode; overlay?: ReactNode }) {
  const [fit, setFit] = useState<Fit>(null);

  useEffect(() => {
    const update = () => setFit(measure());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const scale = fit?.scale ?? 1;

  return (
    <div className="flex min-h-dvh items-center justify-center bg-ink">
      <main
        className="relative overflow-hidden bg-surface shadow-2xl"
        style={{
          width: fit?.w ?? DESIGN_W,
          height: fit?.h ?? DESIGN_H,
          borderRadius: fit && !fit.mobile ? 44 * scale : 0,
          visibility: fit ? "visible" : "hidden",
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: DESIGN_W,
            height: fit ? fit.h / scale : DESIGN_H,
            transform: `scale(${scale})`,
          }}
        >
          <div className="no-scrollbar h-full overflow-y-auto">{children}</div>
          {overlay}
        </div>
      </main>
    </div>
  );
}
