/** @format */

interface IPropsEvents {
	item: {
		type: string;
		date: string;
		productDescription: string;
		timeRemaining?: undefined;
	};
	index?: number;
}


interface ISearchProps {
	route: {
		params: { selectedSearchValue: string, isRegistry: boolean, };
	};
}
