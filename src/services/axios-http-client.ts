import axios, { AxiosResponse } from 'axios'
import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from '../data/protocols/http/http-client'

export const axiosHttpClient = async (
  data: HttpRequest
): Promise<HttpResponse> => {
  let axiosResponse: AxiosResponse

  try {
    axiosResponse = await axios.request({
      url: data.url,
      method: data.method,
      data: data.body,
      headers: data.headers,
      params: data.params
    })
  } catch (error) {
    axiosResponse = error.response
    throw new Error(axiosResponse.statusText)
  }

  if (axiosResponse) {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  } else {
    return {
      statusCode: HttpStatusCode.notFound,
      body: null
    }
  }
}
