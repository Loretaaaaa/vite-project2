import { useState } from 'react';

type UseMutationResult<Result> = [
  () => Promise<Result>,
  {
    isLoading: boolean;
    error: Error | null;
  }
];

export function useMutation<Result>(fn: () => Promise<Result>): UseMutationResult<Result> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>(null);

  const mutate = async (): Promise<Result> => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await fn();
      return result;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return [mutate, { isLoading, error }];
}
