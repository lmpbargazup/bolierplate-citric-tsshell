import React, { useState } from 'react'
import constants from '../../../../constants/constants'
import {
  AccordionChevronUp,
  AccordionContainer,
  AccordionPanel,
  AccordionTitle,
  AccordionTitleContainer
} from './accordion-styles'

type Props = {
  title: string
  children: any
}

export const Accordion: React.FC<Props> = (props: Props) => {
  const [showPanel, setShowPanel] = useState(false)
  const { TITLE_CONTAINER } = constants.DATA_TESTID

  return (
    <AccordionContainer>
      <AccordionTitleContainer
        data-testid={TITLE_CONTAINER}
        onClick={() => setShowPanel(!showPanel)}
      >
        <AccordionTitle>{props.title}</AccordionTitle>
        <AccordionChevronUp active={showPanel} />
      </AccordionTitleContainer>
      <AccordionPanel active={showPanel}>{props.children}</AccordionPanel>
    </AccordionContainer>
  )
}
