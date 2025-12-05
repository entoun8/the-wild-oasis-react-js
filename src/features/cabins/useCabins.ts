import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";
import type { FilterOption, SortOption } from "../../types";

export const useCabins = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount");

  const filter: FilterOption | undefined =
    !filterValue || filterValue === "all"
      ? undefined
      : { filterField: "discount", value: filterValue, method: "eq" };

  const sortByRaw = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortByRaw.split("-");

  const sortBy: SortOption = {
    field,
    direction: (direction === "asc" || direction === "desc") ? direction : "asc"
  };

  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins", filter, sortBy],
    queryFn: () => getCabins({ filter, sortBy }),
  });

  return { isLoading, cabins, error };
};
