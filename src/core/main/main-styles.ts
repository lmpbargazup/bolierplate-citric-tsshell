import styled from 'styled-components'
import styles from '../../constants/styles'

const { VIEW_WIDTH } = styles
const { BACKGROUND_COLOR } = styles.COLORS

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${VIEW_WIDTH};
  background-color: ${BACKGROUND_COLOR};
  position: relative;
`

export const AppContent = styled.div`
  display: flex;
`

// export const AppContainer = styled.div`
//   display: flex;
//   display: flex;
//   float: 1;
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `
