import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import type { FilterOption, SortOption } from "../../types";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  const queryClient = useQueryClient();

  const filterValue = searchParams.get("status");

  const filter: FilterOption | undefined =
    !filterValue || filterValue === "all"
      ? undefined
      : { filterField: "status", value: filterValue, method: "eq" };

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");

  const sortBy: SortOption = {
    field,
    direction: (direction === "asc" || direction === "desc") ? direction : "desc"
  };

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    data: { data: bookings, count } = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, currentPage],
    queryFn: () => getBookings({ filter, sortBy, page: currentPage }),
  });

  const pageCount = Math.ceil((count || 0) / PAGE_SIZE);

  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage + 1],
      queryFn: () => getBookings({ filter, sortBy, page: currentPage + 1 }),
    });
  }

  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, currentPage - 1],
      queryFn: () => getBookings({ filter, sortBy, page: currentPage - 1 }),
    });
  }

  return { bookings, isLoading, error, count };
};
