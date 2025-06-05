"use client";
import {
  Enabled,
  QueryFunction,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";

export const useQueryData = (
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: Enabled
) => {
  const { data, isFetching, isPending, isFetched, refetch } = useQuery({
    queryKey,
    queryFn,
    enabled,
  });
  return { data, isFetched, isFetching, isPending, refetch };
};
