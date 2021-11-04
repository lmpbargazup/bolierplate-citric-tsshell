import faker from 'faker'

import HttpClient from './http-client'
import * as AxiosHttpClient from './axios-http-client'
import { HttpRequest } from '../data/protocols/http/http-client'

jest.mock('../containers/keycloak/keycloak', () => ({ keycloakInstance: { token: '' } }))
jest.mock('./axios-http-client', () => ({ axiosHttpClient: jest.fn() }))

const mockHttpRequest: HttpRequest = {
  method: 'get',
  url: faker.internet.url(),
  body: faker.random.objectElement(),
  headers: faker.random.objectElement(),
  params: faker.random.objectElement()
}

describe('Http Client', () => {
  test('should make request correctly calling AxiosHttpClient', async () => {
    const clientSpy = jest.spyOn(AxiosHttpClient, 'axiosHttpClient')

    await HttpClient.request(mockHttpRequest)
    expect(clientSpy).toHaveBeenCalledWith(mockHttpRequest)
  })
})
