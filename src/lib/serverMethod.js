import { getSettings } from "@/action/backendApi";

export const fetchSettingsData = async () => {
  const settings = await getSettings();
  return settings;
};
