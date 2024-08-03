/** @format */

interface ItemProps {
  model_id?: number;
  saved_type?: string;
  id?: any;
}

interface SelectOptionListProps {
  optionList: {
    identifier: string;
    text: string;
  }[];
  selectedItem: string | string[];
  selectedItems: string[];
  setSelecteditem: (value: string | string[]) => void;
  isReal?: boolean;
}
