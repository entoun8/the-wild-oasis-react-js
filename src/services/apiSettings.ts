import supabase from "./supabase";

interface Settings {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxNumberOfGuestPerBooking: number;
  breakfastPrice: number;
}

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
}

export async function updateSettingApi(newSetting: Partial<Settings>): Promise<Settings> {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
}
