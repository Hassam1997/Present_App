interface HorizontalSelectOptionsItemProps {
    item: {
      identifier: string;
      text: string;
    };
    selectedState?: string 
    setSelectedState?:(data:any)=>void
  }