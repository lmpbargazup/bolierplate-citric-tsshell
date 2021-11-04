import React from 'react'
import styled from 'styled-components'
import Icon from '../icon'
import { strokeColor } from './icon-utils'

const Svg = styled(Icon)`
  width: 24px;
  height: 24px;
`
type Props = {
  selected?: boolean
}
export const CatalogIcon: React.FC<Props> = ({ selected }: Props) => {
  const stroke = strokeColor(selected)

  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 10.5L9 13L6.5 15.5"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 13.5H16.5"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 4.75C14.1381 4.75 14.25 4.86193 14.25 5C14.25 5.13807 14.1381 5.25 14 5.25C13.8619 5.25 13.75 5.13807 13.75 5C13.75 4.86193 13.8619 4.75 14 4.75"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 4.75C17.1381 4.75 17.25 4.86193 17.25 5C17.25 5.13807 17.1381 5.25 17 5.25C16.8619 5.25 16.75 5.13807 16.75 5C16.75 4.86193 16.8619 4.75 17 4.75"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 4.75C20.1381 4.75 20.25 4.86193 20.25 5C20.25 5.13807 20.1381 5.25 20 5.25C19.8619 5.25 19.75 5.13807 19.75 5C19.75 4.86193 19.8619 4.75 20 4.75"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.5 3.5C0.5 2.94771 0.947715 2.5 1.5 2.5H22.5C23.0523 2.5 23.5 2.94772 23.5 3.5V20.5C23.5 21.0523 23.0523 21.5 22.5 21.5H1.5C0.947715 21.5 0.5 21.0523 0.5 20.5V3.5Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.5 7.5H23.5"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
