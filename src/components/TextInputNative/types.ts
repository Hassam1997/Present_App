/** @format */

import { Control } from "react-hook-form"

interface TextInputNativeProps {
  control?: Control
  name: string
  forwardRef?: isTypeObject
  title: string
  defaultValue?: string
  nextFocusRef?: isTypeObject
  error?: string | undefined
  customPlaceholder?: string
  renderLeft?: () => React.ReactNode
  renderRight?: () => React.ReactNode
  required?: boolean
  showCharCount?: boolean
  maxLength?: number
  onPress?: (onChange: (value: string) => void, value: string) => void
  hint?: string
  onSubmit?: () => any
  multiline?: boolean
  multlineStyle?: StyleSheetProps
  containerStyle?: object | object[]
  dropdownKey?: string
  formatValue?: (value: string) => string
  arrowDown?: boolean
  textAlign?: "left" | "right" | "center" | "auto" | "justify"
  setMultlineStyle?: boolean
  showTitle?: boolean
  customTitle?: string
  bottomSpaceLarge?: boolean
  topSpaceLarge?: boolean
  formatValueChange?: (value: string) => string
  disablePress?: boolean
  secureTextEntry?: boolean
  isPrice?: boolean
  onChangeCustom?: (value: string) => void
  isRightArrow?: boolean
  editable?: boolean
  tintColor?: string
  customBorderColor?: string
  rightIcon?: any
  isImage?: boolean
  focusedPlaceholder?: string
  leftIcon?: any
  isPhoneInput?: boolean
  code: string
  setCode?: isTypeObject
  backgroundColordefault?:string
  buttonAccessablityLabel?: string
  PhoneAccessibilityLabel?: string
  accessibilityLabel: string
  keyboardType?:
    | "default"
    | "numeric"
    | "email-address"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "number-pad"
    | "phone-pad"
    | "name-phone-pad"
    | "decimal-pad"
    | "twitter"
    | "web-search"
    | "visible-password"
  returnKeyType?: string | undefined
  defaultCode?: string | undefined
  blurOnSubmit?: boolean
}

export default TextInputNativeProps
