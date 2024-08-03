/** @format */

interface IPropstopProducts {
  data: {
    image: isTypeObject
    productDescription: isTypeString
    wishList?: boolean
    price: number
    brandIcon?: isTypeObject
    priceType?: string
    priceTypeImage?: any
    salePrice?: number
    presentSelected?: boolean
  }
  index?: number
  topProducts?: boolean
  imageAbsoluteTop?: boolean
  onPress?: (value: any) => any
  customStyle?: StyleSheetProps
  showAddButton?: boolean
  onPressAdd?: (value: any) => any
  isWishList?: boolean
  arrayKey?: string
}
