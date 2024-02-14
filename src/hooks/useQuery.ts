import { useEffect, useState } from "react";

function useQuery<Result>(fn?: () => Promise<Result>) {
  const [data, setData] = useState<Result>();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [error, setError] = useState();

  const refetch = async () => {
    if (!fn) return;

    try {
      setIsRefetching(true);
      const data = await fn();
      setData(data);
    } catch (error) {
      console.error("Error fetching todo:", error);
    } finally {
      setIsRefetching(false);
    }
  };

  useEffect(() => {
    if (!fn) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fn();
        setData(data);
      } catch (error) {
        setError(error);
        console.error("Error fetching todo:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [fn]);

  return {
    data,
    refetch,
    error,
    isLoading, // initial loading
    isRefetching, // second, third, etc. loading not to show loading indicator
  };
}

export default useQuery;
