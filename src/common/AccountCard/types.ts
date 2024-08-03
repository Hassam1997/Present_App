/** @format */

interface AccountCardProps {
  data: Record<string, any>
  onPress?: () => void
  rightIcon?: isTypeObject
  imageStyle?: StyleSheetProps
  iconStyle?: StyleSheetProps
  disabled?: boolean
  showAdmin?: boolean
}
