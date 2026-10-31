"use client";
import { useEffect, useRef, useState } from "react";

type GraphicsQuality = "low" | "medium" | "high";
type GamePreferences = {
  music: boolean;
  soundEffects: boolean;
  masterMuted: boolean;
  musicVolume: number;
  effectsVolume: number;
  vibration: boolean;
  graphics: GraphicsQuality;
};

const STORAGE_KEY = "mt-game-settings";
const DEFAULT_PREFERENCES: GamePreferences = {
  music: false,
  soundEffects: true,
  masterMuted: false,
  musicVolume: 25,
  effectsVolume: 65,
  vibration: false,
  graphics: "medium",
};
const TUTORIALS: Record<string, string[]> = {
  "sky-ball": ["Roll with WASD or the arrow keys; drag the on-screen joystick on a phone.", "Reach the green finish pad. Touch a glowing checkpoint before attempting a difficult crossing.", "Collect stars for bonus points; falling returns you to your latest checkpoint. All 40 levels unlock in order."],
  "endless-runner": ["Use left and right to change lanes; press Space or Up to jump over a barrier.", "Avoid pink barriers and collect gold orbs. Your distance and collected orbs build your score.", "The pace rises over time. Pause with P or Escape, or use the on-screen buttons on mobile."],
  "block-puzzle": ["Swap two neighboring gems to make a horizontal or vertical line of at least three.", "Matches fall away and new gems drop in. Consecutive matches create score-boosting chains.", "Reach the level's score goal in 20 moves. Longer matches and cascades award more points."],
  "car-racing": ["Use left and right arrows or A and D to change lanes; swipe on a phone.", "Avoid the traffic to keep your run going and build distance.", "Traffic and road speed increase as you travel. Pause with P or Escape and use Restart for a new run."],
};

function readPreferences(): GamePreferences {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") as Partial<GamePreferences>;
    return {
      ...DEFAULT_PREFERENCES,
      ...saved,
      music: saved.music === true,
      soundEffects: saved.soundEffects !== false,
      masterMuted: saved.masterMuted === true,
      vibration: saved.vibration === true,
      musicVolume: Number.isFinite(saved.musicVolume) ? Math.min(100, Math.max(0, saved.musicVolume!)) : DEFAULT_PREFERENCES.musicVolume,
      effectsVolume: Number.isFinite(saved.effectsVolume) ? Math.min(100, Math.max(0, saved.effectsVolume!)) : DEFAULT_PREFERENCES.effectsVolume,
      graphics: ["low", "medium", "high"].includes(saved.graphics || "") ? saved.graphics as GraphicsQuality : DEFAULT_PREFERENCES.graphics,
    };
  } catch (error) {
    console.warn("Could not read game settings from browser storage.", error);
    return DEFAULT_PREFERENCES;
  }
}

export default function GameExperience({
  slug,
  title,
  objective,
  controls,
  children,
}: {
  slug: string;
  title: string;
  objective: string;
  controls: string[];
  children: React.ReactNode;
}) {
  const [preferences, setPreferences] = useState<GamePreferences>(DEFAULT_PREFERENCES);
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const musicGainRef = useRef<GainNode | null>(null);
  const engineRef = useRef<{ oscillator: OscillatorNode; gain: GainNode } | null>(null);

  useEffect(() => {
    setPreferences(readPreferences());
    try { setTutorialOpen(localStorage.getItem(`mt-tutorial-${slug}`) !== "done"); }
    catch (error) {
      console.warn(`Could not read the ${slug} tutorial state.`, error);
      setTutorialOpen(true);
    }
    setReady(true);
  }, [slug]);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences)); }
    catch (error) { console.warn("Could not save game settings to browser storage.", error); }
    window.dispatchEvent(new CustomEvent("mt-game-preferences", { detail: preferences }));
  }, [preferences, ready]);

  useEffect(() => {
    const onGamePhase = (event: Event) => {
      const { phase } = (event as CustomEvent<{ phase: string }>).detail || {};
      if (phase) setPaused(phase === "paused");
    };
    window.addEventListener("mt-game-phase", onGamePhase);
    return () => window.removeEventListener("mt-game-phase", onGamePhase);
  }, []);

  useEffect(() => {
    const unlockAudio = () => {
      if (!audioRef.current) {
        try {
          audioRef.current = new AudioContext();
          if (audioRef.current.state === "suspended") void audioRef.current.resume();
          setAudioReady(true);
        } catch (error) {
          console.warn("Could not initialize browser audio.", error);
        }
      }
    };
    const playEffect = (event: Event) => {
      const { frequency = 440, duration = 0.12, type = "sine" } = (event as CustomEvent<{ frequency?: number; duration?: number; type?: OscillatorType }>).detail || {};
      if (!preferences.soundEffects || preferences.masterMuted || preferences.effectsVolume === 0 || !audioRef.current) return;
      try {
        const oscillator = audioRef.current.createOscillator();
        const gain = audioRef.current.createGain();
        oscillator.type = type;
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(preferences.effectsVolume / 100 * 0.09, audioRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioRef.current.currentTime + duration);
        oscillator.connect(gain);
        gain.connect(audioRef.current.destination);
        oscillator.start();
        oscillator.stop(audioRef.current.currentTime + duration);
      } catch (error) {
        console.warn("Could not play a game sound effect.", error);
      }
    };
    const stopEngine = () => {
      if (!engineRef.current) return;
      engineRef.current.oscillator.stop();
      engineRef.current.gain.disconnect();
      engineRef.current = null;
    };
    const onEngine = (event: Event) => {
      const { active, frequency = 180 } = (event as CustomEvent<{ active: boolean; frequency?: number }>).detail || {};
      if (!active || !preferences.soundEffects || preferences.masterMuted || preferences.effectsVolume === 0 || !audioRef.current) {
        if (!active || preferences.masterMuted || !preferences.soundEffects || preferences.effectsVolume === 0) stopEngine();
        return;
      }
      if (!engineRef.current) {
        const oscillator = audioRef.current.createOscillator();
        const gain = audioRef.current.createGain();
        oscillator.type = "sawtooth";
        gain.gain.value = preferences.effectsVolume / 100 * 0.018;
        oscillator.connect(gain);
        gain.connect(audioRef.current.destination);
        oscillator.start();
        engineRef.current = { oscillator, gain };
      }
      engineRef.current.oscillator.frequency.setTargetAtTime(frequency, audioRef.current.currentTime, 0.08);
      engineRef.current.gain.gain.setTargetAtTime(preferences.effectsVolume / 100 * 0.018, audioRef.current.currentTime, 0.08);
    };
    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("mt-game-interaction", unlockAudio);
    window.addEventListener("mt-game-sound", playEffect);
    window.addEventListener("mt-game-engine", onEngine);
    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("mt-game-interaction", unlockAudio);
      window.removeEventListener("mt-game-sound", playEffect);
      window.removeEventListener("mt-game-engine", onEngine);
      if (!preferences.soundEffects || preferences.masterMuted || preferences.effectsVolume === 0) stopEngine();
    };
  }, [preferences]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !preferences.music || preferences.masterMuted || preferences.musicVolume === 0) {
      if (musicGainRef.current) {
        musicGainRef.current.gain.setTargetAtTime(0, audio?.currentTime || 0, 0.1);
        musicGainRef.current = null;
      }
      return;
    }
    const gain = audio.createGain();
    gain.gain.value = preferences.musicVolume / 100 * 0.025;
    gain.connect(audio.destination);
    const oscillators = [196, 247, 294].map((frequency) => {
      const oscillator = audio.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start();
      return oscillator;
    });
    musicGainRef.current = gain;
    return () => {
      oscillators.forEach((oscillator) => oscillator.stop());
      gain.disconnect();
    };
  }, [audioReady, preferences.music, preferences.masterMuted, preferences.musicVolume]);

  useEffect(() => () => {
    if (engineRef.current) {
      engineRef.current.oscillator.stop();
      engineRef.current.gain.disconnect();
      engineRef.current = null;
    }
    void audioRef.current?.close();
  }, []);

  const updatePreference = <K extends keyof GamePreferences>(key: K, value: GamePreferences[K]) => {
    setPreferences((current) => ({ ...current, [key]: value }));
  };
  const dismissTutorial = () => {
    try { localStorage.setItem(`mt-tutorial-${slug}`, "done"); }
    catch (error) { console.warn(`Could not save the ${slug} tutorial state.`, error); }
    setTutorialOpen(false);
  };
  const sendCommand = (command: "pause" | "restart") => {
    if (command === "pause") setPaused((current) => !current);
    else setPaused(false);
    window.dispatchEvent(new CustomEvent("mt-game-command", { detail: { command } }));
  };
  const openSettings = () => {
    setSettingsOpen(true);
    if (!paused) sendCommand("pause");
  };
  const closeSettings = () => {
    setSettingsOpen(false);
    if (paused) sendCommand("pause");
  };

  return (
    <section className="relative">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-sky-100 bg-white px-3 py-2 shadow-sm">
        <p className="m-0 text-sm font-bold text-slate-700">{title} · {preferences.graphics} graphics</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => sendCommand("pause")} aria-label={paused ? "Resume game" : "Pause game"} className="min-h-11 rounded-lg border border-slate-200 px-3 text-sm font-bold text-slate-800 hover:bg-slate-50">{paused ? "Resume" : "Pause"}</button>
          <button type="button" onClick={() => sendCommand("restart")} className="min-h-11 rounded-lg border border-slate-200 px-3 text-sm font-bold text-slate-800 hover:bg-slate-50">Restart</button>
          <button type="button" onClick={openSettings} className="min-h-11 rounded-lg bg-sky-900 px-4 text-sm font-bold text-white hover:bg-sky-800">Settings</button>
        </div>
      </div>
      {children}
      {tutorialOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4" role="dialog" aria-modal="true" aria-labelledby={`${slug}-tutorial-title`}>
          <div className="w-full max-w-lg rounded-2xl border border-white/15 bg-slate-900 p-6 text-white shadow-2xl">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[.2em] text-cyan-300">First visit · {title}</p>
            <h2 id={`${slug}-tutorial-title`} className="m-0 text-2xl font-black">Your quick-start guide</h2>
            <p className="mt-3 text-sm text-slate-200">{objective}</p>
            <ul className="my-4 list-disc space-y-2 pl-5 text-sm text-slate-200">
              {controls.map((control) => <li key={control}>{control}</li>)}
              {(TUTORIALS[slug] || []).map((step) => <li key={step}>{step}</li>)}
            </ul>
            <div className="flex gap-3">
              <button type="button" onClick={dismissTutorial} className="min-h-11 rounded-xl bg-amber-300 px-5 font-extrabold text-slate-950">Start playing</button>
              <button type="button" onClick={dismissTutorial} className="min-h-11 rounded-xl border border-white/20 px-4 font-bold text-white">Skip tutorial</button>
            </div>
          </div>
        </div>
      )}
      {settingsOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4" role="dialog" aria-modal="true" aria-labelledby={`${slug}-settings-title`}>
          <div className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl border border-white/15 bg-slate-900 p-6 text-white shadow-2xl">
            <h2 id={`${slug}-settings-title`} className="m-0 text-2xl font-black">Game settings</h2>
            <div className="mt-4 space-y-3">
              {([
                ["Background music", "music"],
                ["Sound effects", "soundEffects"],
                ["Master mute", "masterMuted"],
                ["Vibration on mobile", "vibration"],
              ] as const).map(([label, key]) => (
                <label key={key} className="flex min-h-11 items-center justify-between gap-3 rounded-lg bg-white/5 px-3 text-sm font-semibold">
                  {label}<input type="checkbox" checked={preferences[key]} onChange={(event) => updatePreference(key, event.target.checked)} />
                </label>
              ))}
              <label className="block text-sm font-semibold">Music volume · {preferences.musicVolume}%
                <input className="mt-1 block w-full accent-amber-300" type="range" min="0" max="100" value={preferences.musicVolume} onChange={(event) => updatePreference("musicVolume", Number(event.target.value))} />
              </label>
              <label className="block text-sm font-semibold">Sound effects volume · {preferences.effectsVolume}%
                <input className="mt-1 block w-full accent-amber-300" type="range" min="0" max="100" value={preferences.effectsVolume} onChange={(event) => updatePreference("effectsVolume", Number(event.target.value))} />
              </label>
              <label className="block text-sm font-semibold">Graphics quality
                <select className="mt-1 block min-h-11 w-full rounded-lg bg-white px-3 text-slate-950" value={preferences.graphics} onChange={(event) => updatePreference("graphics", event.target.value as GraphicsQuality)}>
                  <option value="low">Low · smoother on older devices</option>
                  <option value="medium">Medium · balanced</option>
                  <option value="high">High · sharper rendering</option>
                </select>
              </label>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={closeSettings} className="min-h-11 rounded-xl border border-white/20 px-4 font-bold">{paused ? "Resume" : "Close settings"}</button>
              <button type="button" onClick={() => { setTutorialOpen(true); setSettingsOpen(false); }} className="min-h-11 rounded-xl border border-white/20 px-4 font-bold">Replay tutorial</button>
              <button type="button" onClick={closeSettings} className="min-h-11 rounded-xl bg-amber-300 px-5 font-extrabold text-slate-950">Done</button>
            </div>
            <p className="mb-0 mt-3 text-xs text-slate-400">Settings and tutorials are saved in this browser. Original synthesized game audio only starts after your first interaction.</p>
          </div>
        </div>
      )}
    </section>
  );
}
