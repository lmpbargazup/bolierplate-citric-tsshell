import React from 'react'
import EmptyStateIllustrationSvg from '../../../../assets/empty_state_ghost_Illustration.svg'
import constants from '../../../../constants/constants'
import strings from '../../../../constants/strings'
import {
  Container,
  EmptyStateIllustration,
  Text,
  Title
} from './empty-state-styles'

export const EmptyState: React.FC = () => {
  const {
    EMPTY_STATE_GHOST,
    NOTHING_TO_SHOW,
    TRY_AGAIN,
    EMPTY_STATE_IMAGE_ALT
  } = strings.CONTAINERS.WIDGETS.COMPONENTS.EMPTY_STATE
  const { ILLUSTRATION, TITLE, TEXT_NOTHING_TO_SHOW, TEXT_TRY_AGAIN } =
    constants.DATA_TESTID.CONTAINERS.WIDGETS.COMPONENTS.EMPTY_STATE

  return (
    <Container>
      <EmptyStateIllustration
        data-testid={ILLUSTRATION}
        src={EmptyStateIllustrationSvg}
        alt={EMPTY_STATE_IMAGE_ALT}
        height={120}
        width={120}
      />
      <Title data-testid={TITLE}>{EMPTY_STATE_GHOST}</Title>
      <Text data-testid={TEXT_NOTHING_TO_SHOW}>{NOTHING_TO_SHOW}</Text>
      <Text data-testid={TEXT_TRY_AGAIN}>{TRY_AGAIN}</Text>
    </Container>
  )
}
