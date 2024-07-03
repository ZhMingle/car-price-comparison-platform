type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface RequestOptions {
  headers?: HeadersInit
  body?: any
}

interface ResponseData<T> {
  data: T
  status: number
}

async function httpRequest<T>(url: string, method: HttpMethod, options?: RequestOptions): Promise<any> {
  const { headers, body } = options || {}

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      Authorization: `Bearer ${localStorage.getItem('token') as string}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if ([401].includes(response.status)) {
    location.href = '/login'
  }

  if (response.headers.get('content-length') === '0') {
    return await response
  } else {
    const responseData = await response.json()
    return {
      data: responseData,
      status: response.status,
    }
  }
}

export async function get<T>(url: string, headers?: HeadersInit): Promise<ResponseData<T>> {
  return httpRequest<T>(url, 'GET', { headers })
}

export async function post<T>(url: string, body: any, headers?: HeadersInit): Promise<ResponseData<T>> {
  return httpRequest<T>(url, 'POST', { headers, body })
}

export async function put<T>(url: string, body: any, headers?: HeadersInit): Promise<ResponseData<T>> {
  return httpRequest<T>(url, 'PUT', { headers, body })
}

export async function del<T>(url: string, headers?: HeadersInit): Promise<ResponseData<T>> {
  return httpRequest<T>(url, 'DELETE', { headers })
}
