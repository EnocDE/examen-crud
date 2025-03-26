import { useEffect, useState } from "react";
import { ZodSchema } from "zod";
import { usersConfig } from "../lib/axios";

interface UseFetchProps<T> {
  url: string;
  schema: ZodSchema<T>;
}

const errorInitialValue = {
  error: false,
  msg: "",
};

export function useFetch<T>({ url, schema }: UseFetchProps<T>) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState(errorInitialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await usersConfig.get(url);
        if (response.status !== 200) throw new Error();
        const parsedData = schema.safeParse(response.data);
        if (!parsedData.success) throw new Error();
        setData(parsedData.data);
      } catch (error) {
        if (error instanceof Error) {
          setError({
            error: true,
            msg: error.message,
          });
        }
      }
    }

    try {
      setError(errorInitialValue);
      setLoading(true);
      getData();
    } catch (error) {
      if (error instanceof Error) {
        setError({
          error: true,
          msg: error.message,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [url, schema]);

  return {
    data,
    error,
    loading,
  };
}
