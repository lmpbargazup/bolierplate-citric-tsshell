export interface CustomEvent {
  detail: {
    dateTime: string
    id: string
    message: string
    roomId: string
    user: {
      id: string
      name: string
      userName: string
    }
  }
}
