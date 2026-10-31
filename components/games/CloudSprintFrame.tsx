"use client";
import { useEffect, useRef, useState } from "react";

export default function CloudSprintFrame() {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const forwardEvent = (event: Event) => {
      const { command } = (event as CustomEvent<{ command: string }>).detail || {};
      frameRef.current?.contentWindow?.postMessage({ type: "mt-game-command", command }, window.location.origin);
    };
    const forwardPreferences = (event: Event) => {
      frameRef.current?.contentWindow?.postMessage({ type: "mt-game-preferences", preferences: (event as CustomEvent).detail }, window.location.origin);
    };
    const receiveGameEvent = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || !event.data) return;
      if (event.data.type === "mt-game-sound" || event.data.type === "mt-game-engine" || event.data.type === "mt-game-phase" || event.data.type === "mt-game-interaction") {
        window.dispatchEvent(new CustomEvent(event.data.type, { detail: event.data.detail }));
      }
    };
    window.addEventListener("mt-game-command", forwardEvent);
    window.addEventListener("mt-game-preferences", forwardPreferences);
    window.addEventListener("message", receiveGameEvent);
    return () => {
      window.removeEventListener("mt-game-command", forwardEvent);
      window.removeEventListener("mt-game-preferences", forwardPreferences);
      window.removeEventListener("message", receiveGameEvent);
    };
  }, []);

  return (
    <div className="relative h-[min(68dvh,680px)] min-h-[360px] overflow-hidden rounded-2xl bg-slate-950 shadow-xl ring-1 ring-slate-900/10 sm:min-h-[440px]">
      {!loaded && <div role="status" className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950 text-white">Loading 3D runner…</div>}
      <iframe
        ref={frameRef}
        src="/game/cloud-sprint.html"
        title="Cloud Sprint 3D endless runner"
        loading="lazy"
        allowFullScreen
        className="h-full w-full border-0"
        onLoad={() => {
          setLoaded(true);
          try {
            const preferences = localStorage.getItem("mt-game-settings");
            if (preferences) frameRef.current?.contentWindow?.postMessage({ type: "mt-game-preferences", preferences: JSON.parse(preferences) }, window.location.origin);
          } catch (error) {
            console.warn("Could not send game settings to Cloud Sprint.", error);
          }
        }}
      />
    </div>
  );
}
