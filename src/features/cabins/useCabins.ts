import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

export const useCabins = () => {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { filterField: "discount", value: filterValue, method: "eq" };

  const sortByRaw = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortByRaw.split("-");

  const sortBy = { field, direction };

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
