import React, { useState } from 'react'
import constants from '../../constants/constants'
import { Card } from './components/card/card'
import { ChipData } from './components/card/card.types'
import { WidgetsContainer } from './widgets-styles'

const Widgets: React.FC = () => {
  const { WIDGETS } = constants.DATA_TESTID.CONTAINERS.WIDGETS
  const [currentWidgetId, setCurrentWidgetId] = useState('')
  const chipData: ChipData[] = [
    { text: 'Oficial', color: 'primary' },
    { text: '2.0.0.4', color: 'secondary' }
  ]

  return (
    <WidgetsContainer data-testid={WIDGETS}>
      <Card
        icon={'https://plugin-icons.s3.amazonaws.com/icons/microservice.png'}
        type={'BACK END'}
        name={'Communication Test'}
        description={'Microservice dispatch communication test.'}
        lastUpdate={'Updated October 20, 2020 • 16:24'}
        chipData={chipData}
        url={'/plugins/notifications/remoteEntry.js'}
        scope={'notification_plugin'}
        module={'./module'}
        component={'notification-plugin'}
        id={'widget.id.1'}
        key={'widget.id.1'}
        showWidget={currentWidgetId === 'widget.id.1'}
        setCurrentWidget={(id) => setCurrentWidgetId(id)}
      />
    </WidgetsContainer>
  )
}

export default Widgets
