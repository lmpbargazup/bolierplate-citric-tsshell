import axios, { AxiosResponse } from 'axios'
import faker from 'faker'
import {
  HttpRequest, HttpStatusCode
} from '../../data/protocols/http/http-client'
import { axiosHttpClient } from './axios-http-client'

jest.mock('axios')

type MockAxiosResponse = {
  data?: any
  status?: number
}

export const mockAxios = (responseMock: MockAxiosResponse = {}): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.request.mockResolvedValue({
    body: responseMock.data || faker.random.objectElement,
    status: responseMock.status || faker.random.number
  })
  return mockedAxios
}

const mockHttpRequest: HttpRequest = {
  method: 'get',
  url: faker.internet.url(),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
  params: faker.random.objectElement()
}

const mockAxiosResponse: AxiosResponse<any> = {
  data: faker.random.objectElement(),
  status: faker.random.number(),
  statusText: faker.random.word(),
  headers: faker.random.objectElement(),
  config: {}
}

describe('Axios Http Client', () => {
  test('should call axios with correct values', async () => {
    const mockedAxios = mockAxios()
    await axiosHttpClient(mockHttpRequest)
    expect(mockedAxios.request).toHaveBeenCalledWith({
      data: mockHttpRequest.body,
      headers: mockHttpRequest.headers,
      method: mockHttpRequest.method,
      params: mockHttpRequest.params,
      url: mockHttpRequest.url
    })
  })

  test('should catch error when axios throws', async () => {
    const mockedAxios = mockAxios()
    mockedAxios.request.mockRejectedValueOnce({
      response: mockAxiosResponse
    })
    const response = await axiosHttpClient(mockHttpRequest)
    expect(response).toEqual({
      statusCode: mockAxiosResponse.status,
      body: mockAxiosResponse.data
    })
  })

  test('should call axios with correct but axios is undefined', async () => {
    const mockedAxios = mockAxios()
    mockedAxios.request.mockRejectedValueOnce({
      response: undefined
    })
    const response = await axiosHttpClient(mockHttpRequest)
    expect(response).toEqual({
      statusCode: HttpStatusCode.notFound,
      body: null
    })
  })
})
