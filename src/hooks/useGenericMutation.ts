import { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "react-query";

export const useGenericMutation = <T, S>(
  func: (data: S) => Promise<AxiosResponse<S>>,
  url: string,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined
) => {

  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, S>(
    func, {
    onMutate: async (data) => {

      await queryClient.cancelQueries([url!, params]);

      const previousData = queryClient.getQueryData([url!, params]) as T;

      if (updater && previousData) {
        queryClient.setQueryData<T>(
          [url!, params],
          updater(previousData, data)
        );
      }

      return previousData;
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, _, context) => {
      console.error(err);
      queryClient.setQueryData([url!, params], context);
    },

    onSettled: () => {
      // invalidate the query to keep the fresh state
      queryClient.invalidateQueries([url!, params]);
    },
  });
};