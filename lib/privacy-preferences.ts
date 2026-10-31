export const PRIVACY_PREFERENCES_KEY = "mt-games-privacy-preferences-v1";
export const OPEN_PRIVACY_SETTINGS_EVENT = "mt-games:open-privacy-settings";

export type PrivacyPreferences = {
  version: 1;
  optionalAdvertising: boolean;
  consentTimestamp: string;
};

export function readPrivacyPreferences(storage: Pick<Storage, "getItem">): PrivacyPreferences | null {
  const value = storage.getItem(PRIVACY_PREFERENCES_KEY);
  if (!value) return null;

  try {
    const parsed: unknown = JSON.parse(value);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("version" in parsed) ||
      parsed.version !== 1 ||
      !("optionalAdvertising" in parsed) ||
      typeof parsed.optionalAdvertising !== "boolean" ||
      !("consentTimestamp" in parsed) ||
      typeof parsed.consentTimestamp !== "string" ||
      Number.isNaN(Date.parse(parsed.consentTimestamp))
    ) {
      return null;
    }

    return {
      version: 1,
      optionalAdvertising: parsed.optionalAdvertising,
      consentTimestamp: parsed.consentTimestamp,
    };
  } catch {
    return null;
  }
}

export function savePrivacyPreferences(
  storage: Pick<Storage, "setItem">,
  optionalAdvertising: boolean,
  now: Date = new Date(),
): PrivacyPreferences {
  const preferences: PrivacyPreferences = {
    version: 1,
    optionalAdvertising,
    consentTimestamp: now.toISOString(),
  };
  storage.setItem(PRIVACY_PREFERENCES_KEY, JSON.stringify(preferences));
  return preferences;
}
