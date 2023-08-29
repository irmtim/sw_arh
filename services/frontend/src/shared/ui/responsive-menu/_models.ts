export interface ResponsiveMenuItemModel {
  name: string
  color: 'info' | 'secondary' | 'primary' | 'warning' | 'danger' | 'success'
  icon: string
  iconCssClass: string
  clickAction: () => void
  btnSize?: 'lg' | 'sm' | undefined
}