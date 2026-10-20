"use client";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function GameFrame() {
  const sp = useSearchParams();
  const lvl = parseInt(sp.get("level") ?? "", 10);
  const src = lvl >= 1 && lvl <= 40 ? `/game/skyball.html?level=${lvl}` : "/game/skyball.html";
  const ref = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  return (
    <div>
      <div className="relative h-[72dvh] min-h-[400px] overflow-hidden rounded-2xl bg-sky-300 shadow-[0_24px_70px_-24px_rgba(10,42,94,.55)] ring-1 ring-sky-900/10 sm:h-[76dvh]" style={{ touchAction: "none" }}>
        {!loaded && (
          <div role="status" className="absolute inset-0 z-10 flex items-center justify-center bg-sky-deep text-white">
            Loading game…
          </div>
        )}
        <iframe
          ref={ref}
          src={src}
          title="Sky Ball 3D game"
          loading="lazy"
          allow="fullscreen"
          className="h-full w-full border-0"
          onLoad={() => { setLoaded(true); ref.current?.contentWindow?.focus(); }}
        />
      </div>
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          className="rounded-lg bg-sky-deep px-3 py-1 text-sm text-white"
          onClick={() => ref.current?.requestFullscreen?.().catch(() => undefined)}
        >
          Fullscreen
        </button>
      </div>
    </div>
  );
}
