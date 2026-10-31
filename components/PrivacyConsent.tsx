"use client";

import { useEffect, useRef, useState } from "react";
import {
  OPEN_PRIVACY_SETTINGS_EVENT,
  readPrivacyPreferences,
  savePrivacyPreferences,
  type PrivacyPreferences,
} from "@/lib/privacy-preferences";

const ADSENSE_SCRIPT_ID = "mt-games-adsense";
const ADSENSE_SCRIPT_URL =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4221940206853514";

export default function PrivacyConsent() {
  const [preferences, setPreferences] = useState<PrivacyPreferences | null>(null);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [allowOptional, setAllowOptional] = useState(false);
  const [storageError, setStorageError] = useState("");
  const scriptAdded = useRef(false);
  const preferencesRef = useRef<PrivacyPreferences | null>(null);

  useEffect(() => {
    try {
      const saved = readPrivacyPreferences(window.localStorage);
      preferencesRef.current = saved;
      setPreferences(saved);
      setAllowOptional(saved?.optionalAdvertising ?? false);
      if (saved) setBannerVisible(false);
      if (saved?.optionalAdvertising) loadAdScript();
    } catch {
      setStorageError("Your browser could not read saved preferences. Essential game storage will continue to work.");
    }

    const openSettings = () => {
      setAllowOptional(preferencesRef.current?.optionalAdvertising ?? false);
      setDialogOpen(true);
    };
    window.addEventListener(OPEN_PRIVACY_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_PRIVACY_SETTINGS_EVENT, openSettings);
  }, []);

  function loadAdScript() {
    if (document.getElementById(ADSENSE_SCRIPT_ID)) return;
    const script = document.createElement("script");
    script.id = ADSENSE_SCRIPT_ID;
    script.async = true;
    script.src = ADSENSE_SCRIPT_URL;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
    scriptAdded.current = true;
  }

  function saveChoice(optionalAdvertising: boolean) {
    const wasScriptAdded = scriptAdded.current || !!document.getElementById(ADSENSE_SCRIPT_ID);
    try {
      const saved = savePrivacyPreferences(window.localStorage, optionalAdvertising);
      preferencesRef.current = saved;
      setPreferences(saved);
      setAllowOptional(optionalAdvertising);
      setStorageError("");
      setBannerVisible(false);
      setDialogOpen(false);

      if (optionalAdvertising) loadAdScript();
      else if (wasScriptAdded) window.location.reload();
    } catch {
      setStorageError("Your browser could not save this choice. Please check its storage settings and try again.");
    }
  }

  function openPreferences() {
    setAllowOptional(preferencesRef.current?.optionalAdvertising ?? false);
    setDialogOpen(true);
  }

  return (
    <>
      {bannerVisible && (
        <aside
          aria-label="Privacy and cookie choices"
          className="fixed inset-x-0 bottom-0 z-[80] border-t border-slate-200 bg-white p-4 shadow-[0_-8px_30px_rgba(15,23,42,0.18)] sm:p-5"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-3xl text-sm leading-relaxed text-slate-800">
              <p className="font-bold text-sky-deep">Your privacy choices</p>
              <p className="mt-1">
                MT Games uses local storage for essential game progress and settings. Hosting services may use
                technical cookies. The existing Google advertising script loads only if you accept optional
                advertising; Google may then use advertising cookies or similar technologies. Rejecting optional
                advertising does not disable essential game storage.
              </p>
              {storageError && <p role="alert" className="mt-2 font-semibold text-red-700">{storageError}</p>}
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button type="button" onClick={() => saveChoice(true)} className="min-h-11 rounded-lg bg-sky-900 px-4 font-bold text-white hover:bg-sky-800">
                Accept
              </button>
              <button type="button" onClick={() => saveChoice(false)} className="min-h-11 rounded-lg border border-slate-400 px-4 font-bold text-slate-800 hover:bg-slate-100">
                Reject Optional
              </button>
              <button type="button" onClick={openPreferences} className="min-h-11 rounded-lg border border-slate-400 px-4 font-bold text-slate-800 hover:bg-slate-100">
                Manage Preferences
              </button>
            </div>
          </div>
        </aside>
      )}

      {dialogOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/70 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-settings-title"
            className="max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto overscroll-contain rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
          >
            <h2 id="privacy-settings-title" className="text-xl font-extrabold text-sky-deep sm:text-2xl">
              Privacy Settings
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Essential local storage keeps game progress and settings working and is not controlled by this
              optional advertising choice. If enabled, the existing Google AdSense script may use advertising
              cookies or similar technologies.
            </p>
            <label className="mt-5 flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3">
              <input
                type="checkbox"
                checked={allowOptional}
                onChange={(event) => setAllowOptional(event.target.checked)}
                className="mt-1 h-5 w-5 accent-sky-800"
              />
              <span>
                <span className="block font-bold text-slate-900">Allow optional advertising</span>
                <span className="mt-1 block text-sm text-slate-600">
                  Allow the existing Google advertising script to load on this site.
                </span>
              </span>
            </label>
            {preferences && (
              <p className="mt-3 text-xs text-slate-600">
                Your last choice was saved in this browser on{" "}
                <time dateTime={preferences.consentTimestamp}>
                  {new Date(preferences.consentTimestamp).toLocaleString()}
                </time>
                .
              </p>
            )}
            {storageError && <p role="alert" className="mt-3 text-sm font-semibold text-red-700">{storageError}</p>}
            <p className="mt-3 text-xs leading-relaxed text-slate-600">
              Changing from accepted to rejected reloads this page so the script is not loaded again. This setting
              does not remove cookies already set by a service; manage or clear those in your browser.
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
              <button type="button" onClick={() => saveChoice(true)} className="min-h-11 rounded-lg bg-sky-900 px-4 font-bold text-white hover:bg-sky-800">
                Accept
              </button>
              <button type="button" onClick={() => saveChoice(false)} className="min-h-11 rounded-lg border border-slate-400 px-4 font-bold text-slate-800 hover:bg-slate-100">
                Reject Optional
              </button>
              <button type="button" onClick={() => saveChoice(allowOptional)} className="min-h-11 rounded-lg bg-slate-100 px-4 font-bold text-slate-900 hover:bg-slate-200">
                Save Preferences
              </button>
              <button type="button" onClick={() => setDialogOpen(false)} className="min-h-11 rounded-lg px-4 font-bold text-slate-700 hover:bg-slate-100">
                Cancel
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
