import React from 'react'

type Props = {
  width: number
}
export const Horizontal: React.FC<Props> = ({ width }: Props) => {
  return <div style={{ width: width }} />
}
