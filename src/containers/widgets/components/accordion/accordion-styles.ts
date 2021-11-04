import styled from 'styled-components'
import { ifProp } from 'styled-tools'
import ChevronUpSvg from '../../../../../assets/chevron-up.svg'

export const AccordionContainer = styled.div`
  background-color: #ffffff;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
  flex-direction: column;
  width: 360px;
  height: fit-content;
  max-height: 306px;
  margin-bottom: 1px;
  &:hover {
  }
`

export const AccordionTitleContainer = styled.div`
  align-items: center;
  justify-content: space-between;
`

export const AccordionTitle = styled.span`
  font-size: 24px;
  color: #464646;
`

type PropTypeActive = {
  active: boolean
}

export const AccordionChevronUp = styled.img.attrs((props: PropTypeActive) => ({
  src: ChevronUpSvg,
  alt: 'chevron-up',
  active: props.active
}))<PropTypeActive>`
  display: flex;
  height: 24px;
  width: 24px;
  transform: ${ifProp({ active: true }, 'rotate(0deg)', 'rotate(180deg)')};
`

export const AccordionPanel = styled.div<PropTypeActive>`
  margin: 16px 0px;
  background-color: white;

  ${ifProp({ active: false }, 'display: none')};
`
