import { useState, useEffect, useCallback, useRef } from "react";

const { NODE_ENV } = process.env;

type UseFetchReturn<T> = {
  status: Status;
  fetchedData: T | null;
  get: (endpoint?: string, options?: RequestInit) => Promise<void>;
  post: (endpoint: string, options?: RequestInit) => Promise<void>;
};

export type Status = "idle" | "resolved" | "error" | "pending";

export const useFetch = <T>(
  url: string,
  initialFetch = true
): UseFetchReturn<T> => {
  const [status, setStatus] = useState<Status>("idle");
  const [fetchedData, setFetchedData] = useState<T | null>(null);
  const abortController = useRef(new AbortController());

  const fetchAPI = useCallback(
    (endpoint?: string, options?: RequestInit) => {
      setStatus("pending");

      NODE_ENV === "development" && console.log("Fetching data...", url);

      const callToApi = async () => {
        try {
          const response = await fetch(url + (endpoint || ""), {
            signal: abortController.current.signal,
            ...options,
          });
          if (!response.ok) {
            throw new Error("Failed to fetch");
          }
          if (abortController.current.signal.aborted) return;
          setStatus("resolved");

          if (
            response.headers.get("content-length") === "0" ||
            !response.headers.get("content-type")?.includes("application/json")
          )
            return;

          const data: T = await response.json();
          if (abortController.current.signal.aborted) return;
          setFetchedData(data);
        } catch (err) {
          if (abortController.current.signal.aborted) return;
          console.error(err);
          setStatus("error");
        }
      };

      return callToApi();
    },
    [url]
  );

  useEffect(() => {
    if (!initialFetch) return;

    const controller = abortController.current;
    fetchAPI();

    return () => controller.abort();
  }, [fetchAPI, initialFetch]);

  const get = useCallback(
    (endpoint?: string, options?: RequestInit) => fetchAPI(endpoint, options),
    [fetchAPI]
  );

  const post = useCallback(
    (endpoint: string, options?: RequestInit) =>
      fetchAPI(endpoint, { method: "POST", ...options }),
    [fetchAPI]
  );

  return { status, fetchedData, get, post };
};
