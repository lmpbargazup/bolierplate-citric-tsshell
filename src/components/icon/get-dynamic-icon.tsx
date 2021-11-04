/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { LogoOrange } from './icons/logo_orange'

export const getDynamicIcon = (name: string) => {
  const icons = {
    ['logo-orange']: LogoOrange
  }

  const icon = icons[name] as JSX.Element

  if (icon) {
    return icon
  }
}
