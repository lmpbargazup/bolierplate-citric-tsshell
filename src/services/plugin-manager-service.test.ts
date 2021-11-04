import faker from 'faker'

import PlatformApi from './platform-api'
import PluginManagerService from './plugin-manager-service'

describe('Plugin Manager Service', () => {
  test('should call platformApi correctly to fetch plugins', async () => {
    const platformApiSpy = jest.spyOn(PlatformApi, 'get').mockResolvedValue({
      statusCode: faker.random.number()
    })
    await PluginManagerService.getPlugins()
    expect(platformApiSpy).toHaveBeenCalledWith(
      '/plugin-manager/plugins',
      { page: 0 }
    )
  })
})
