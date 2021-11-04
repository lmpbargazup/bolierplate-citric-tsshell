import styled from 'styled-components'
import styles from '../../../../constants/styles'

const { BASE_COLOR_2, BASE_COLOR_4, BASE_COLOR_9, BASE_COLOR_7 } =
  styles.BASE_COLORS

export const Container = styled.div`
  width: 100%;
  background-color: ${BASE_COLOR_9};
  padding: 4em 2em;
  border: 1px solid ${BASE_COLOR_7};
  border-radius: 8px;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Title = styled.h3`
  margin: 16px 0px 0px 0px;
  font-size: 24px;
  font-weight: normal;
  color: ${BASE_COLOR_2};
  font-family: 'Montserrat', sans-serif;
`
export const Text = styled.p`
  margin: 16px 0px 0px 0px;
  font-size: 16px;
  font-weight: normal;
  color: ${BASE_COLOR_4};
  margin-top: 8px;
`
export const EmptyStateIllustration = styled.div`
  display: flex;
  height: 120px;
  width: 120px;
`
