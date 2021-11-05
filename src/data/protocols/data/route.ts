export type Microfront = {
  id: string
  moduleFederationComponent: string
  moduleFederationEntrypoint: string
  moduleFederationName: string
  url: string
}

export type RouteType = {
  id: number
  route: string
  microfrontend: Microfront
}

export type RouteDataType = {
  items: RouteType[]
}
