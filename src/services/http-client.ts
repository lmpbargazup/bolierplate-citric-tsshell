import constants from '../constants/constants'
import { keycloakInstance } from '../containers/keycloak/keycloak'
import { HttpRequest, HttpResponse } from '../data/protocols/http/http-client'
import { axiosHttpClient } from './axios-http-client'

const { BEARER } = constants.HEADERS

const request = async (data: HttpRequest): Promise<HttpResponse> => {
  data.headers = {
    Authorization: `${BEARER}${keycloakInstance.token}`
  }
  return axiosHttpClient(data)
}

const httpClient = {
  request
}

export default httpClient
