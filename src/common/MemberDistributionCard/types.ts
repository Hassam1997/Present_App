interface MemberDistributionProps {
  item: {
    image: any;
    name: string;
    isPaid: boolean;
    percentage: number;
    price: number;
    isAdmin: boolean;
  };
  isActive?: boolean;
  onPress?: (item: any) => void; // Define the type for onPress
  onCheckPress?: (item: any) => void; // Define the type for onCheckPress
  isCustom?: boolean;
  data?: any;
  callback?: any;
}
