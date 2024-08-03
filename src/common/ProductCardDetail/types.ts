/** @format */

interface ProductCardDetailProps {
  item: {
    image?: any // Define the type for image
    title?: string
    price?: number // Define the type for price
  }
  onPress?: (item: any) => void // Define the type for onPress
  index?: number
  type?: string
}
