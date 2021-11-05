import { Chip, Text } from 'citric'
import React, { useState } from 'react'
import { Vertical } from '../../../../components/spacings/vertical/vertical'
import constants from '../../../../constants/constants'
import strings from '../../../../constants/strings'
import {
  CardButtonLoader,
  CardContainer,
  CardContentContainer,
  CardDescription,
  CardDescriptionLoader,
  CardErrorButton,
  CardLabelsContainer,
  CardName,
  CardNameLoader,
  CardType,
  CardTypeLoader,
  CardWidgetContainer
} from './card-styles'
import { CardProps } from './card.types'

export const Card: React.FC<CardProps> = ({
  type,
  name,
  description,
  lastUpdate,
  chipData,
  url,
  scope,
  module,
  component,
  id,
  loadingInitialState = true,
  errorInitialState = false,
  showWidget,
  setCurrentWidget
}: CardProps) => {
  const [loading, setLoading] = useState(loadingInitialState)
  const [error, setError] = useState(errorInitialState)

  const { ERROR_TYPE, ERROR_NAME, ERROR_DESCRIPTION, ERROR_BUTTON } =
    strings.CONTAINERS.WIDGETS.CARD
  const {
    LOADING,
    WIDGET,
    ERROR,
    ERROR_BUTTON: ERROR_BUTTON_ID,
    WIDGET_CONTAINER
  } = constants.DATA_TESTID.CONTAINERS.WIDGETS.COMPONENTS.CARD

  const tryAgain = (): void => {
    setLoading(true)
    setError(false)
  }

  return (
    <CardContainer
      onMouseEnter={() => {
        setCurrentWidget(id)
      }}
      onMouseLeave={() => {
        setCurrentWidget('')
      }}
      data-testid={id}
      showChildren={showWidget}
    >
      {loading && (
        <CardContentContainer data-testid={LOADING}>
          <CardLabelsContainer>
            <CardTypeLoader />
            <Vertical heigth={8} />
            <CardNameLoader />
            <Vertical heigth={8} />
            <CardDescriptionLoader />
            <Vertical heigth={8} />
            <CardDescriptionLoader />
            <Vertical heigth={8} />
            <CardDescriptionLoader />
            <Vertical heigth={8} />
          </CardLabelsContainer>
          <CardWidgetContainer showChildren={showWidget}>
            <CardButtonLoader />
          </CardWidgetContainer>
        </CardContentContainer>
      )}

      {!error && (
        <CardContentContainer load={loading} data-testid={WIDGET}>
          <CardLabelsContainer>
            <Text.Overheader1 color="color.primary.main">
              {type}
            </Text.Overheader1>
            <Vertical heigth={4} />
            <Text.H3 color="color.base.b10">{name}</Text.H3>
            <Vertical heigth={16} />
            <Text.Body2 weight="regular" color="color.base.b8">
              {description}
            </Text.Body2>
            <Vertical heigth={16} />
            <Text.Microtext weight="semibold" color="color.base.b8">
              {lastUpdate}
            </Text.Microtext>
            <Vertical heigth={16} />
            <Chip.GroupChip>
              <Chip.Chip data={chipData} />
            </Chip.GroupChip>
          </CardLabelsContainer>
          <CardWidgetContainer
            showChildren={showWidget}
            data-testid={WIDGET_CONTAINER}
          >
            {/* <Module
              system={{
                url,
                scope,
                module,
                component
              }}
              setLoading={setLoading}
            /> */}
          </CardWidgetContainer>
        </CardContentContainer>
      )}
      {error && (
        <CardContentContainer load={loading} data-testid={ERROR}>
          <CardLabelsContainer>
            <CardType>{ERROR_TYPE}</CardType>
            <CardName>{ERROR_NAME}</CardName>
            <CardDescription>{ERROR_DESCRIPTION}</CardDescription>
          </CardLabelsContainer>
          <CardWidgetContainer
            showChildren={showWidget}
            data-testid={WIDGET_CONTAINER}
          >
            <CardErrorButton
              onClick={() => tryAgain()}
              data-testid={ERROR_BUTTON_ID}
            >
              {ERROR_BUTTON}
            </CardErrorButton>
          </CardWidgetContainer>
        </CardContentContainer>
      )}
    </CardContainer>
  )
}
