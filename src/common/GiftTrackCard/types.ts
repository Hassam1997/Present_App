/** @format */

interface GiftTrackCardProps {
  item: {
    image?: any // Define the type for image
    trackId?: number
    title?: string
    deliveryDate?: string
    updatedDate?: string 
  }
  onPress?: (item: any) => void // Define the type for onPress

}
