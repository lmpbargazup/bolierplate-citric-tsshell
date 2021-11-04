export interface NotificationData {
  id: string
  userId: number
  pluginName: string
  message: string
  read: boolean
  timestamp: string
  title?: string
  redirectTo?: string
  category: 'DEFAULT'| 'WARNING' | 'ALARM' | 'SUCCESS'
}
