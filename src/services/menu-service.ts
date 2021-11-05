import constants from '../constants/constants'
import { MenuModule } from '../data/protocols/data/menu'
import { HttpResponse } from '../data/protocols/http/http-client'
import platformApi from './platform-api'

const { BASE_PATH, MODULES } = constants.URL.MENU

const getModules = async (): Promise<HttpResponse<MenuModule[]>> => {
  return platformApi.get(`${BASE_PATH}${MODULES}`)
}

const menuService = {
  getModules
}

export default menuService
