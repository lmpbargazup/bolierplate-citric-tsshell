import constants from '../constants/constants'
import { Plugins } from '../data/protocols/data/plugin'
import { HttpResponse } from '../data/protocols/http/http-client'
import platformApi from './platform-api'

const { BASE_PATH, PLUGINS } = constants.URL.PLUGIN_MANAGER

const getPlugins = async (page = 0): Promise<HttpResponse<Plugins>> => {
  return platformApi.get(`${BASE_PATH}${PLUGINS}`, { page })
}

const pluginManagerService = {
  getPlugins
}

export default pluginManagerService
