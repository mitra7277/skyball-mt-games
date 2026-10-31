"use client";

import { OPEN_PRIVACY_SETTINGS_EVENT } from "@/lib/privacy-preferences";

export default function PrivacySettingsLink() {
  return (
    <a
      href="/privacy#privacy-settings"
      className="py-1 hover:underline"
      onClick={(event) => {
        event.preventDefault();
        window.dispatchEvent(new Event(OPEN_PRIVACY_SETTINGS_EVENT));
      }}
    >
      Privacy Settings
    </a>
  );
}
