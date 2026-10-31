"use client";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function GameFrame() {
  const sp = useSearchParams();
  const lvl = parseInt(sp.get("level") ?? "", 10);
  const src = lvl >= 1 && lvl <= 40 ? `/game/skyball.html?level=${lvl}` : "/game/skyball.html";
  const ref = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [fullscreenMessage, setFullscreenMessage] = useState("");
  return (
    <div>
      <div className="game-interaction relative h-[min(68dvh,720px)] min-h-[360px] overflow-hidden rounded-2xl bg-sky-300 shadow-[0_24px_70px_-24px_rgba(10,42,94,.55)] ring-1 ring-sky-900/10 sm:h-[76dvh] sm:min-h-[440px]">
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
          allowFullScreen
          className="h-full w-full border-0"
          onLoad={() => { setLoaded(true); ref.current?.contentWindow?.focus(); }}
        />
      </div>
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          className="min-h-12 rounded-lg bg-sky-deep px-4 py-2 text-sm font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
          onClick={async () => {
            if (!ref.current?.requestFullscreen) {
              setFullscreenMessage("Fullscreen is not supported by this browser.");
              return;
            }
            try {
              await ref.current.requestFullscreen();
              setFullscreenMessage("");
            } catch (error) {
              console.error("Could not enter fullscreen mode.", error);
              setFullscreenMessage("Fullscreen could not be opened. Check your browser permissions.");
            }
          }}
        >
          Fullscreen
        </button>
      </div>
      {fullscreenMessage && <p role="status" className="mt-2 text-right text-sm text-slate-600">{fullscreenMessage}</p>}
    </div>
  );
}
