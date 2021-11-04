import constants from '../constants/constants'
import { UserData } from '../data/protocols/data/user'
import { HttpResponse } from '../data/protocols/http/http-client'
import platformApi from './platform-api'

const { BASE_PATH, CURRENT_USER } = constants.URL.USER_MANAGER

const getCurrentUser = async (): Promise<HttpResponse<UserData>> => {
  return platformApi.get(`${BASE_PATH}${CURRENT_USER}`)
}

const userManagerService = {
  getCurrentUser
}

export default userManagerService
