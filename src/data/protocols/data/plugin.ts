export enum PluginTypeCode {
  IDE = 'IDE'
}

export interface PluginData {
  backendEndpoint: string
  created: string
  frontendEndpoint: string
  scope: string
  module: string
  component: string
  id: string
  maintainer: {
    author: string
    email: string
    id: string
  }
  name: string
  type: {
    code: PluginTypeCode | string
    description: string
    id: string
    name: string
  }
  updated: string
  version: string
  code: string
  description: string
  iconLink: string
}

export interface Plugins {
  data: PluginData[]
  page: number
  size: number
  totalElements: number
}
