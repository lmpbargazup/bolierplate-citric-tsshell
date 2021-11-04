import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'

export const StyledToast = styled(ToastContainer)`
  width: auto;
`

export const ToastMessageContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 24px 16px;
`

type ColorProp = {
  color: string
}

export const ToastMessageLine = styled.div<ColorProp>`
  width: 4px;
  background: ${(props) => props.color};
  border-radius: 8px;
  margin-right: 24px;
`

export const ToastMessageTitleContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`

export const ToastMessageTitleIconContainer = styled.div`
  display: flex;
  align-items: center;
`

export const ToastMessageMessageContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
`

export const ToastMessageDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const ToastMessageTitle = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #1a2138;
  margin-left: 12px;
`

export const ToastMessageMessage = styled.p`
  margin-top: 16px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #404659;
  width: 424px;
`
export const ToastMessageCloseButton = styled.div`
  display: flex;
  height: 28px;
  width: 28px;
  &:hover {
    cursor: pointer;
  }
`

export type SolveButtonProps = {
  textColor: string
  background: boolean
  backgroundColor: string
}

export const ToastMessageSolveButton = styled.button<{
  colors: SolveButtonProps
}>`
  margin-top: 17px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 8px;
  width: 133px;
  height: 36px;
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;

  color: ${(props) => props.colors.textColor};
  border: 1px solid ${({ colors }) => colors.backgroundColor};
  background: red;
  background: ${({ colors }) =>
    colors.background ? colors.backgroundColor : 'none'};

  &:hover {
    cursor: pointer;
  }
`
