import { useRuntimeConfig } from "#app";
import { $fetch } from 'ofetch'

const BASE_URL = 'https://www.googleapis.com/books/v1';

export async function fetchBooks(params: {
    q: string
    startIndex?: number
    maxResults?: number
    printType?: string
    filter?: string
}) {
    const config = useRuntimeConfig();

    return await $fetch(`${BASE_URL}/volumes`, {
        params: {
            ...params,
            key: config.public.googleBooksApiKey || undefined
        }
    })
}