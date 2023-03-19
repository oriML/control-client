import { AxiosError, AxiosResponse } from "axios";
import { QueryFunctionContext, useInfiniteQuery, useMutation, useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { useAxiosDAL } from "../hooks/useAxiosDAL";
import { GetInfinitePagesInterface } from "../models";

type QueryKeyT = [string, object | undefined];

const fetcher = <T>({
    queryKey,
    pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {

    const api = useAxiosDAL();

    const [url, params] = queryKey;

    return api.Get(url, { params: { ...params, pageParam } }).then(x => x.data);
};
const usePost = <T, S>(
    url: string,
    params?: object,
    updater?: (oldData: T, newData: S) => T
) => {
    const api = useAxiosDAL();

    return useGenericMutation<T, S>(
        (data) => api.Post(url, data),
        url,
        params,
        updater
    );
};

const useDelete = <T>(
    url: string,
    params?: object,
    updater?: (oldData: T, id: string | number) => T
) => {
    const api = useAxiosDAL();

    return useGenericMutation<T, string | number>(
        (id) => api.Delete(`${url}/${id}`),
        url,
        params,
        updater
    );
};

const useFetch = <T>(
    url: string | null,
    params?: object,
    config?: UseQueryOptions<T, Error, T, QueryKeyT>
) => {
    const context = useQuery<T, Error, T, QueryKeyT>(
        [url!, params],
        ({ queryKey }) => fetcher({ queryKey, meta: undefined }),
        {
            enabled: !!url,
            ...config,
        }
    );

    return context;
};

const usePrefetch = <T>(url: string | null, params?: object) => {
    const queryClient = useQueryClient();

    return () => {
        if (!url) {
            return;
        }

        queryClient.prefetchQuery<T, Error, T, QueryKeyT>(
            [url!, params],
            ({ queryKey }) => fetcher({ queryKey, meta: undefined })
        );
    };
};

const useLoadMore = <T>(url: string | null, params?: object) => {
    const context = useInfiniteQuery<
        GetInfinitePagesInterface<T>,
        Error,
        GetInfinitePagesInterface<T>,
        QueryKeyT
    >(
        [url!, params],
        ({ queryKey, pageParam = 1 }) => fetcher({ queryKey, pageParam, meta: undefined }),
        {
            getPreviousPageParam: (firstPage) => firstPage.previousId ?? false,
            getNextPageParam: (lastPage) => {
                return lastPage.nextId ?? false;
            },
        }
    );

    return context;
};

const useGenericMutation = <T, S>(
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

export {
    usePost,
    useDelete,
    useFetch,
    usePrefetch,
    useLoadMore,
    useGenericMutation
}

