import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import constants from '../../../../constants/constants'
import { Accordion } from './accordion'

const { PLUGIN } = constants.DATA_TESTID

describe('Accordion component', () => {
  test('should hide panel when component title was clicked', async () => {
    const sut = render(
      <Accordion title={'widget'} key={'widget'}>
        <h1 data-testid={PLUGIN}>plugin</h1>
      </Accordion>
    )

    let plugin = await sut.findByTestId(PLUGIN)
    expect(plugin).not.toBeVisible()

    const title = await sut.findByTestId('title-container')
    fireEvent.click(title)

    plugin = await sut.findByTestId(PLUGIN)
    expect(plugin).toBeVisible()
  })
})
