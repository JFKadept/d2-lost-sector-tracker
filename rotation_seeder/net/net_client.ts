import {
  Status,
  STATUS_TEXT,
} from "https://deno.land/std@0.170.0/http/http_status.ts";

type NetClientConfig = Partial<{
  url: string;
  headers: Headers;
  params: URLSearchParams;
}>;

type RequestOptions =
  & Omit<RequestInit, "window">
  & Partial<{
    params: URLSearchParams;
  }>;

export class NetClient {
  #defaults: NetClientConfig;

  constructor(cfg?: NetClientConfig) {
    this.#defaults = cfg ?? {};
  }

  #trimLeadingSlash(url: string) {
    return url.startsWith("/") ? url.slice(1) : url;
  }

  #trimTrailingSlash(url: string) {
    return url.endsWith("/") ? url.slice(0, url.length - 1) : url;
  }

  #getParamsString(params: URLSearchParams) {
    return params.toString() ? `?${params.toString()}` : "";
  }

  #getRequestURL(url: string, params: URLSearchParams) {
    try {
      return new URL(
        this.#trimLeadingSlash(url),
        this.#trimTrailingSlash(this.#defaults.url ?? ""),
      ).toString() + this.#getParamsString(params);
    } catch (_) {
      return this.#defaults.url
        ? `${this.#trimTrailingSlash(this.#defaults.url)}/${
          this.#trimLeadingSlash(url)
        }${this.#getParamsString(params)}`
        : url + this.#getParamsString(params);
    }
  }

  #getStatusText(res: Response) {
    return res.statusText ?? STATUS_TEXT[res.status as Status];
  }

  async request<T = unknown>(url: string, opts?: RequestOptions) {
    const req = new Request(
      this.#getRequestURL(url, new URLSearchParams(opts?.params)),
      opts,
    );
    const res = await fetch(req);

    console.log(
      req.method,
      "request to",
      req.url,
      "responded with",
      res.status,
      `(${this.#getStatusText(res)})`,
    );

    return {
      body: await res.json() as T,
      headers: res.headers,
      status: res.status,
      statusText: this.#getStatusText(res),
    };
  }
}
