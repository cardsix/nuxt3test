import md5 from 'md5'
import type { SearchParameters } from 'ofetch'

type UrlType = string | Request | Ref<string | Request> | (() => string | Request)

export interface RequestOptions {
    method?: any
    headers?: Objable<string> | [key: string, value: string][] | Headers
    key?: string
    body?: RequestInit['body'] | Objable
}

async function _useFetch<T>(url: UrlType, params?: SearchParameters, options?: RequestOptions) {
    const headers = useRequestHeaders(['cookie'])
    const method = options?.method ?? 'GET'
    const body = options?.body
    const config = useRuntimeConfig();
    return await useFetch<T>(url as string, {
        key: options?.key ?? md5(url as string),
        method,
        params: method === 'GET' ? params : undefined,
        headers: {
            ...headers,
            ...options?.headers,
        },
        credentials: 'include',
        body: method === 'POST' ? params : undefined,
        onRequest({ request, options }) {
            // Set the request headers
            options.headers = options.headers || {};
            // const token = useCookie('token')
            //@ts-ignore
            options.headers.Secret = 'tt_secret';
            //@ts-ignore
            options.headers.withCredentials = true
            // options.headers.Authorization = token.value||null
        },
        onRequestError({ error }) {
            ElMessage.closeAll()
            // error && ElMessage.error('Sorry, The Data Request Failed')
            // Handle the request errors
        },
        onResponse({ response }) {
            const data = response._data
            if (data && data.code !== 200) {
                if (process.client) {
                if (data.msg) {
                    ElMessage({
                    type: 'error',
                    message: data.msg
                    })
                }
                }
                return data
            } else {
                return data
            }
        
        },
        onResponseError({ request }) {
            console.log('🚀 ~ onResponseError ~ request:', request)
            // Handle the response errors
        },
    })
}

async function _fetch<T>(url: UrlType, params?: SearchParameters, options?: RequestOptions) {
    const headers = useRequestHeaders(['cookie'])
    const method = options?.method ?? 'GET'
    const body = options?.body
    return await $fetch<T>(url as string, {
        method,
        params: { ...params },
        headers: {
            ...headers,
            ...options?.headers,
        },
        credentials: 'include',
        body: method === 'POST' ? body : undefined,
        onRequest() {
            // Set the request headers
            // options.headers = options.headers || {};
        },
        onRequestError({ error }) {
            ElMessage.closeAll()
            error && ElMessage.error('Sorry, The Data Request Failed')
            // Handle the request errors
        },
        onResponse({ response }) {
            // Process the response data
            if (response._data.code !== 200) {
                ElMessage.error(response._data.message)
                return response._data = null
            }
            return response._data = response._data.data
        },
        onResponseError({ request }) {
            console.log('🚀 ~ onResponseError ~ request:', request)
            // Handle the response errors
        },
    })
}

export default () => {
    return {
        /**
         * $fetch.GET 封装
         * @param url api地址
         * @param params 请求参数
         * @param option 包含 method, headers, body 参数
         * @returns T
         */
        $get: <T>(url: string, params?: SearchParameters, option?: RequestOptions) => {
            return _fetch<T>(url, params, { method: 'GET', ...option })
        },
        /**
         * $fetch.POST 封装
         * @param url api地址
         * @param params 请求参数
         * @param option 包含 method, headers, body 参数
         * @returns T
         */
        $post: <T>(url: string, params?: SearchParameters, option?: RequestOptions) => {
            return _fetch<T>(url, params, { method: 'POST', ...option })
        },

        /**
         * useFetch.GET 封装
         * @param url api地址
         * @param params 请求参数
         * @param option 包含 method, headers, key, body 参数
         * @returns T
         * @description
         * ```
         *    type AsyncData<DataT, ErrorT> = {
         *      data: Ref<DataT | null>
         *      pending: Ref<boolean>
         *      refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
         *      execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
         *      error: Ref<ErrorT | null>
         *      status: Ref<AsyncDataRequestStatus>
         *    }
         * ```
         */
        get: <T>(url: UrlType, params?: SearchParameters, option?: RequestOptions) => {
            return _useFetch<T>(url, params, { method: 'GET', ...option })
        },
        /**
         * useFetch.POST 封装
         * @param url api地址
         * @param params 请求参数
         * @param option 包含 method, headers, key, body 参数
         * @returns useFetch
         * @description
         * ```
         *  type AsyncData<DataT, ErrorT> = {
         *      data: Ref<DataT | null>
         *      pending: Ref<boolean>
         *      refresh: (opts?: AsyncDataExecuteOptions) => Promise<void>
         *      execute: (opts?: AsyncDataExecuteOptions) => Promise<void>
         *      error: Ref<ErrorT | null>
         *      status: Ref<AsyncDataRequestStatus>
         *  }
         * ```
         */
        post: <T>(url: UrlType, params?: SearchParameters, option?: RequestOptions) => {
            return _useFetch<T>(url, params, { method: 'POST', ...option })
        },
    }
}
