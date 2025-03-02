import { IFetchOptions, IFetchResponse } from "../../interfaces/AuthInterfaces"

export const useFetch = async ({ options, setLoading }: IFetchOptions): Promise<IFetchResponse> => {
    try {
        setLoading(true)
        const response = await global.fetch(options.url, {
            method: options.method,
            headers: options.headers,
            body: options.body ? JSON.stringify(options.body) : null
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }

        const data = await response.json()
        setLoading(false)
        return { response: data }
    } catch (error: Error | any) {
        setLoading(false)
        return { error: error || 'Something went wrong' }
    }
}