import { getSession } from 'next-auth/react';
import { ApiResponse } from './types/api';

const BASE_URL = '';

async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    // Get token from NextAuth session
    const session = typeof window !== 'undefined' ? await getSession() : null;
    const token = (session as any)?.accessToken || (typeof window !== 'undefined' ? localStorage.getItem('access_token') : null);

    const headers = new Headers(options.headers);
    if (!headers.has('Authorization')) {
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    }
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    const body = await response.json();

    if (!response.ok) {
        throw new Error(body.detail || body.error || 'API Request Failed');
    }

    return body as T;
}

export const api = {
    get: <T>(endpoint: string, options?: RequestInit) =>
        request<ApiResponse<T>>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, body: any, options?: RequestInit) =>
        request<ApiResponse<T>>(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(body),
        }),

    patch: <T>(endpoint: string, body: any, options?: RequestInit) =>
        request<ApiResponse<T>>(endpoint, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(body),
        }),

    put: <T>(endpoint: string, body: any, options?: RequestInit) =>
        request<ApiResponse<T>>(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(body),
        }),

    delete: <T>(endpoint: string, options?: RequestInit) =>
        request<ApiResponse<T>>(endpoint, { ...options, method: 'DELETE' }),
};
