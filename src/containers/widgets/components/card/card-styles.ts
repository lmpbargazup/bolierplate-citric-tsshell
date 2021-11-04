import styled from 'styled-components'
import { ifProp } from 'styled-tools'
import styles from '../../../../constants/styles'

const { BASE_COLOR_10, BASE_COLOR_6, BASE_COLOR_3, BASE_COLOR_1 } =
  styles.BASE_COLORS

const { COMPLEMENTARY_7 } = styles.COMPLEMENTARY_COLORS

type CardContainerTypes = {
  showChildren: boolean
}

export const CardContainer = styled.div<CardContainerTypes>`
  display: flex;
  box-sizing: border-box;
  width: calc(32.3333%);
  height: ${ifProp({ showChildren: true }, 'auto', '226px')};
  opacity: ${ifProp({ showChildren: true }, '1', '0.48')};
  padding: 24px;
  background: ${BASE_COLOR_10};
  border: 1px solid ${BASE_COLOR_6};
  border-radius: 8px;
  margin-right: 16px;
  &:hover {
    box-shadow: 0px 9px 46px rgba(0, 0, 0, 0.12);
  }
`

type CardContentContainerTypes = {
  load?: boolean
}

export const CardContentContainer = styled.div<CardContentContainerTypes>`
  display: ${ifProp({ load: true }, 'none', 'flex')};
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`

export const CardLabelsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: start;
`

const LoaderAnimation = `
  border-radius: 4px;
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f6f6;
  background: linear-gradient(to right, #f6f6f6 8%, #f0f0f0 18%, #f6f6f6 33%);
  background-size: 800px 104px;

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
`

export const CardIconLoader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 48px;
  height: 48px;
  ${LoaderAnimation}
`

type CardIconTypes = {
  error?: boolean
}

export const CardIcon = styled.div<CardIconTypes>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  background: ${ifProp(
    { error: true },
    'rgba(194, 0, 0, 0.08);',
    'rgba(0, 175, 250, 0.08)'
  )};
  border-radius: 4px;
`

export const CardTypeLoader = styled.div`
  width: 70px;
  height: 20px;
  margin: 0;
  font-size: 14px;
  color: ${BASE_COLOR_3};
  font-weight: bold;
  ${LoaderAnimation}
`

export const CardType = styled.p`
  font-size: 14px;
  color: ${BASE_COLOR_3};
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
`

export const CardNameLoader = styled.div`
  width: 210px;
  height: 30px;
  margin: 0;
  font-size: 24px;
  color: ${BASE_COLOR_1};
  font-weight: 500;
  ${LoaderAnimation}
`

export const CardName = styled.h4`
  font-size: 24px;
  color: ${BASE_COLOR_1};
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
`

export const CardDescriptionLoader = styled.div`
  width: 100%;
  height: 20px;
  margin: 0;
  font-size: 16px;
  color: #6c757d;
  font-weight: 500;
  font-weight: 300;
  ${LoaderAnimation}
`

export const CardDescription = styled.p`
  font-size: 16px;
  color: #6c757d;
  font-weight: 500;
  font-weight: 300;
  font-family: 'Roboto', sans-serif;
`

type CardWidgetCointainerTypes = {
  showChildren?: boolean
}

export const CardWidgetContainer = styled.div<CardWidgetCointainerTypes>`
  width: 100%;
  margin-top: 16px;
  opacity: ${ifProp({ showChildren: true }, '1', '0')};
`

export const CardButtonLoader = styled.div`
  height: 48px;
  border-radius: 4px;
  background: ${COMPLEMENTARY_7};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  ${LoaderAnimation}
`

export const CardErrorButton = styled.button`
  height: 48px;
  border-radius: 4px;
  background: ${COMPLEMENTARY_7};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  border: none;
  width: 100%;
  font-size: 16px;
`

export const CardLoadingTest = styled.div`
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f6f6;
  background: linear-gradient(to right, #f6f6f6 8%, #f0f0f0 18%, #f6f6f6 33%);
  background-size: 800px 104px;

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
`
