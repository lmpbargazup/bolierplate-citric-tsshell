export type Microfront = {
  id: string
  moduleFederationComponent: string
  moduleFederationEntrypoint: string
  moduleFederationName: string
  url: string
}

export type Route = {
  id: number
  route: string
  microfrontend: Microfront
}

export type RouteData = {
  items: Route[]
}
