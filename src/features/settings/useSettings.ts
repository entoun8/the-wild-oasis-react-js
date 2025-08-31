import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export const useSettings = () => {
  const { isLoading: isLoadingSettings, data: settings } = useQuery({
    queryFn: getSettings,
    queryKey: ["cabins"],
  });

  return { isLoadingSettings, settings };
};
