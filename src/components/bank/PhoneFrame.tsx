import type { ReactNode } from "react";

/** Centered phone-sized frame: full screen on mobile, a framed device on desktop. */
export function PhoneFrame({ children, overlay }: { children: ReactNode; overlay?: ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-ink sm:py-4">
      <main className="relative h-dvh w-full max-w-[402px] overflow-hidden bg-surface sm:h-[min(874px,calc(100dvh-2rem))] sm:rounded-[44px] sm:shadow-2xl">
        <div className="no-scrollbar h-full overflow-y-auto">{children}</div>
        {overlay}
      </main>
    </div>
  );
}
