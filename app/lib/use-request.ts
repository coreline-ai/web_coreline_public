import useSWR from 'swr';
import { api } from './api-client';
import { ApiResponse } from './types/api';

export function useRequest<T>(url: string | null, options?: any) {
    const fetcher = async (url: string) => {
        return api.get<T>(url);
    };

    const { data, error, isLoading, mutate } = useSWR<ApiResponse<T>>(url, fetcher, options);

    return {
        data,
        error,
        isLoading,
        mutate,
    };
}
