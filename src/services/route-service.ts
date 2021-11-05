import constants from '../constants/constants'
import { RouteDataType } from '../data/protocols/data/route'
import { HttpResponse } from '../data/protocols/http/http-client'
import platformApi from './platform-api'

const { BASE_PATH, MODULES } = constants.URL.ROUTES

const getRoutes = async (): Promise<HttpResponse<RouteDataType>> => {
  return platformApi.get(`${BASE_PATH}${MODULES}`)
}

const routeService = {
  getRoutes
}

export default routeService
