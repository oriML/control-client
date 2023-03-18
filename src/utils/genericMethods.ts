import { QueryFunctionContext, useQuery, useQueryClient, UseQueryOptions } from "react-query";
import { useAxiosDAL } from "../hooks/useAxiosDAL";
import { useGenericMutation } from "../hooks/useGenericMutation";

type QueryKeyT = [string, object | undefined];

const fetcher = <T>({
    queryKey,
    pageParam,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {

    const { Get } = useAxiosDAL();

    const [url, params] = queryKey;

    return Get(url, { params: { ...params, pageParam } }).then(x => x.data);
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

export {
    useFetch,
    usePrefetch
}

