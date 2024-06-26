

export default async function fetchApi<T>(endpoint: string, wrappedByKey?: string): Promise<T> {
    if (endpoint.startsWith('/')) {
        endpoint = endpoint.slice(1);
    }
    let apiUrl = import.meta.env.API_URL;
    if (apiUrl.endsWith('/')) {
        apiUrl = apiUrl.slice(0, -1);
    }

    const url = new URL(`${apiUrl}/${endpoint}`);

    const res = await fetch(url.toString());
    let data = await res.json();

    if (wrappedByKey) {
        data = data[wrappedByKey];
    }

    return data as T;
}
