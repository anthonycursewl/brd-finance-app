export interface IFetchOptions {
    options: {
        method: string,
        headers: {
            'Content-Type': string,
            'Authorization': string
        },
        body?: any
        url: string,
    },
    setLoading: (loading: boolean) => void
}

export interface IFetchResponse {
    response?: any,
    error?: string
}