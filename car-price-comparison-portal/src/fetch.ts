import msg from '@/utility'
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface RequestOptions {
  headers?: HeadersInit
  body?: any
}

interface ResponseData<T> {
  data: T
  status: number
}

async function httpRequest<T>(url: string, method: HttpMethod, options?: RequestOptions): Promise<ResponseData<T>> {
  const { headers, body } = options || {}

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      // Authorization: localStorage.getItem('token'),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if ([401, 400].includes(response.status)) {
    const text = await response.text()
    msg.error(text)
  }
  console.log(response)
  try {
    const responseData = await response.json()
    return {
      data: responseData,
      status: response.status,
    }
  } catch (e) {
    console.error(e)
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
