import faker from 'faker'
import constants from '../constants/constants'
import platformApi from './platform-api'
import routeService from './route-service'
// import menuService from './menu-service'

const { BASE_PATH, MODULES } = constants.URL.ROUTES

describe('Route Service', () => {
  test('should call platformApi correctly to fetch routes', async () => {
    const platformApiSpy = jest.spyOn(platformApi, 'get').mockResolvedValue({
      statusCode: faker.random.number()
    })
    await routeService.getRoutes()
    expect(platformApiSpy).toHaveBeenCalledWith(
      `${BASE_PATH}${MODULES}`
    )
  })
})
