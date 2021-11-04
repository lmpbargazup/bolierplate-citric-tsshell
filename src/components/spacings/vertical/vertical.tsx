import React from 'react'

type Props = {
  heigth: number
}
export const Vertical: React.FC<Props> = ({ heigth }: Props) => {
  return <div style={{ height: heigth }} />
}
