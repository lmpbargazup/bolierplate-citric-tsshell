import faker from 'faker'

import HttpClient from './http-client'
import PlatformApi from './platform-api'

describe('Platform API', () => {
  test('should call http-client with get method correctly', async () => {
    const httpClientSpy = jest.spyOn(HttpClient, 'request').mockResolvedValue({
      statusCode: faker.random.number()
    })
    const url = faker.internet.url()
    const params = faker.random.objectElement()
    await PlatformApi.get(url, params)

    expect(httpClientSpy).toHaveBeenCalledWith({
      url: `${process.env.POC_API_HOST}${url}`,
      method: 'get',
      params
    })
  })
  test('should call http-client with post method correctly', async () => {
    const httpClientSpy = jest.spyOn(HttpClient, 'request').mockResolvedValue({
      statusCode: faker.random.number()
    })
    const url = faker.internet.url()
    const params = faker.random.objectElement()
    const body = faker.random.objectElement()
    await PlatformApi.post(url, params, body)

    expect(httpClientSpy).toHaveBeenCalledWith({
      url: `${process.env.POC_API_HOST}${url}`,
      method: 'post',
      params,
      body
    })
  })
})
