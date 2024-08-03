/** @format */

interface GiftCardProps {
  item: {
    image?: any; // Define the type for image
    isSelected?: boolean;
    title?: string;
    userName?: string;
    price?: number; // Define the type for price
    purchased?: boolean;
    isPrioritize: boolean;
    category?: string;
  };
  isSelected?: any;
  cardStyle?: any;
  onPress?: (item: any) => void; // Define the type for onPress
  showPurchaseStatus?: boolean;
  isGroupPurchase?: boolean;
  onCheckPress?: (item: any) => any; // Define the type for onCheckPress
  onPressPurchased?: (item: any) => void;
  onCrossPress?: (item: any) => void;
  onStarPress?: (item: any) => void;
  isCross?: boolean;
  isActive?: boolean;
  showStatus?: boolean;
  isStar?: boolean;
  isPast?: boolean;
  category?: boolean;
}
