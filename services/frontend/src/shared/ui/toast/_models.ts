export interface ToastProps {
  text: string
}

export interface ToastItem {
  createDate: Date
  text: string
  type: string
  icon?: string
}

export type ToastContextProps = {
  success: (props: ToastProps) => void
  error: (props: ToastProps) => void
  info: (props: ToastProps) => void
}

export const initialToastContextValue: ToastContextProps = {
  success: () => {},
  error: () => {},
  info: () => {}
}