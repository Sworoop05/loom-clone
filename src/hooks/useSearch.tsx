"use client";
import React, { EventHandler } from "react";
import { useState, useEffect } from "react";
import { useQueryData } from "./useQueryData";
import { searchUsers } from "@/actions/user";
const useSearch = (key: string, type: "USERS") => {
  const [query, setQuery] = useState("");
  const [debounce, setDebounce] = useState("");
  const [onUser, setOnUser] = useState<
    | {
        id: string;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        image?: string | null;
        subscription: {
          plan: "FREE" | "PRO";
        } | null;
      }[]
    | undefined
  >(undefined);
  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  useEffect(() => {
    const setTimer = setTimeout(() => {
      setDebounce(query);
    }, 1000);
    return () => clearTimeout(setTimer);
  }, [query]);
  const { refetch, isFetching } = useQueryData(
    [key, debounce],
    async ({ queryKey }) => {
      if (type === "USERS") {
        const users = await searchUsers(queryKey[1] as string);
        if (users.status === 200) {
          setOnUser(users.data);
        }
      }
    },
    false
  );
  useEffect(() => {
    if (debounce) refetch();
    if (!debounce) setOnUser(undefined);
    return () => {
      debounce;
    };
  }, [debounce]);
  return { onSearchQuery, query, isFetching, onUser };
};

export default useSearch;
