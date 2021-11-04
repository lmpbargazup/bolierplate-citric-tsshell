type MenuMicrofrontend = {
  url: string
  id: number
}

export type MenuModule = {
  id: number
  moduleName: string
  route: string
  microfrontend?: MenuMicrofrontend
  contexts?: MenuContext[]
}

export type MenuPage = {
  id: number
  name: string
  route: string
  microfrontend: MenuMicrofrontend
}

export type MenuContext = {
  id: number
  contextName: string
  route: string
  pages: MenuPage[]
}
