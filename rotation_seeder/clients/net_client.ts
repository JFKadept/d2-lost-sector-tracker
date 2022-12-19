import { mergeHeaders } from "../lib/merge_headers.ts"

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
    protected defaults: NetClientInit

    constructor(cfg: NetClientInit) {
        this.defaults = {
            redirect: "follow",
            ...cfg,
        }
    }

    private trimLeadingSlash(pathname: string) {
        return pathname[0] === "/" ? pathname.slice(1) : pathname
    }

    private trimTrailingSlash(url: string) {
        return url[url.length - 1] === "/" ? url.slice(0, url.length - 1) : url
    }

    private async request<T>(pathname: string, init?: NetRequest): Promise<NetResponse<T>> {
        const url = this.defaults.baseURL
            ? new URL(this.trimLeadingSlash(pathname), `${this.trimTrailingSlash(this.defaults.baseURL)}/`)
            : pathname

        const urlWithParams = `${url}${init?.params ? `?${init.params.toString()}` : ""}`

        const method = init?.method?.toUpperCase() ?? "GET"

        const req = new Request(urlWithParams, {
            method,
            body: init?.body,
            redirect: this.defaults.redirect,
            headers: mergeHeaders(
                this.defaults.headers ?? new Headers(),
                init?.headers ?? new Headers()
            ),
        })

        console.log(`${req.method} to ${req.url}`)

        const res = await fetch(req)

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