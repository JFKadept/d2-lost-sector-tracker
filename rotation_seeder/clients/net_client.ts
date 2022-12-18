type NetClientInit = Partial<{
    baseURL: string
    headers: Headers
    redirect: Request["redirect"]
}>

type NetRequest = Partial<{
    method: string
    params: URLSearchParams
    headers: Headers
    body: BodyInit
}>

type NetResponse<T> = {
    status: number
    statusText: string
    headers: Headers
    body: T
}

export class NetClient {
    private defaults: NetClientInit

    constructor(cfg: NetClientInit) {
        this.defaults = cfg
    }

    private async request<T>(pathname: string, init?: NetRequest): Promise<NetResponse<T>> {
        const url = this.defaults.baseURL ? new URL(pathname, this.defaults.baseURL) : pathname
        const urlWithParams = `${url}${init?.params ? `?${init.params.toString()}` : ""}`
        const method = init?.method?.toUpperCase() ?? "GET"

        console.log(`${method} to ${urlWithParams}`)

        const res = await fetch(url, {
            method,
            body: init?.body,
            redirect: this.defaults.redirect,
            headers: init?.headers,
        })

        if (!res.ok) {
            throw new Error(`${method} to ${urlWithParams} failed with ${res.status} (${res.statusText})`)
        }

        return {
            body: await res.json() as T,
            headers: res.headers,
            status: res.status,
            statusText: res.statusText,
        }
    }

    protected get<T>(pathname: string, init?: Omit<NetRequest, "method"|"body">): Promise<NetResponse<T>> {
        return this.request(pathname, {
            ...init,
            method: "GET",
        })
    }

    protected post<T>(pathname: string, init?: Omit<NetRequest, "method">): Promise<NetResponse<T>> {
        return this.request(pathname, {
            ...init,
            method: "POST",
        })
    }
}