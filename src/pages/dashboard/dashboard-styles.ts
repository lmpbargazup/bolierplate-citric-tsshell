import styled from 'styled-components'
import styles from '../../constants/styles'

const { BASE_COLOR_2, BASE_COLOR_4 } = styles.BASE_COLORS

export const LoaderContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const HomeContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`

export const HomeBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 2% 0px 2%;

  @media (min-width: 0px) {
    width: 90%;
  }
  @media (min-width: 1350px) {
    width: 1136px;
  }
`

export const HomeOrangeStack = styled.p`
  color: ${BASE_COLOR_2};
  font-size: 14px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
`

export const HomeTitle = styled.h1`
  margin: 16px 0px 0px 0px;
  font-size: 64px;
  font-weight: normal;
  font-family: 'Montserrat', sans-serif;
  b {
    font-weight: 600;
  }
`

export const HomeIntroduction = styled.h3`
  margin: 16px 0px 0px 0px;
  font-size: 24px;
  font-weight: normal;
  color: ${BASE_COLOR_4};
  font-family: 'Roboto', sans-serif;
`

export const HomeResources = styled.h2`
  margin: 74px 0px 0px 0px;
  font-size: 40px;
  font-weight: normal;
  color: ${BASE_COLOR_2};
  font-family: 'Montserrat', sans-serif;
`

export const HomeWidgetsContainer = styled.div`
  display: flex;
  flex: 1;
`
