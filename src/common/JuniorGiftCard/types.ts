/** @format */

interface JuniorGiftCard {
	item: { 
		image: isTypeString; 
		title: isTypeString | isTypeNumber 
		birthdate: isTypeString | isTypeNumber
	};
	onPress?: (item:any) => void;
}
