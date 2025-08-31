import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { useSearchParams } from "react-router-dom";

export const useCabins = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterValue = searchParams.get("discount");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { filterField: "discount", value: filterValue, method: "eq" };

  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins", filter],
    queryFn: () => getCabins({ filter }),
  });

  return { isLoading, cabins, error };
};
