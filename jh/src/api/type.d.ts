//  顶部导航栏item
export interface L {
  id: string
  name: string
  wallet_id: string
  wallet_name: string
  game_type: number
  maintained: number
  flags: number
  state: number
  seq: number
  share_wallet: number
}
export interface CGDialogProps {
  title: string
  content: string
  content2?: string
  cancelText?: string
  confirmText?: string
  isCancel?: boolean
  onOk: () => void
}