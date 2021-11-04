/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { getDynamicIcon } from './get-dynamic-icon'

const Svg = styled.svg.attrs({
  version: '1.1',
  xmlns: 'http://www.w3.org/2000/svg',
  xmlnsXlink: 'http://www.w3.org/1999/xlink'
})``

type IconProps = {
  name: string
  width: number
  height: number
  color: string
}

export const Icon = ({ name, width, height, color }: IconProps) => {
  const DynamicIcon = getDynamicIcon(name)

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {DynamicIcon && <DynamicIcon fill={color} />}
    </Svg>
  )
}
