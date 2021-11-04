export type ChipData = {
  text: string
  color: string
  isRemovable?: boolean
}

export type CardProps = {
  icon?: string
  type: string
  name: string
  description: string
  lastUpdate: string
  chipData: ChipData[]
  url: string
  scope: string
  module: string
  component: string
  id: string
  loadingInitialState?: boolean
  errorInitialState?: boolean
  showWidget: boolean
  setCurrentWidget: (id: string) => void
}
