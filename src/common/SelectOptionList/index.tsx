import React, { useState } from "react";
import { View, Text } from "react-native";
import PropTypes from "prop-types";
import { Colors } from "../../theme";
import { ButtonView } from "../../components";
import styles from "./styles";
import GradientView from "../GradientView";
import Block from "../Block";


const Item: React.FC<ItemProps> = ({
  item,
  selectedItem,
  setSelecteditem,
  isMulti,
  isReal,
}) => {
  const onPress = () => {
    setSelecteditem(isReal ? item : item.identifier);
  };

  let isGradient = false;
  if (isMulti) {
    isGradient = (selectedItem as string[]).includes(
      isReal ? item : item.identifier
    );
  } else {
    isGradient = selectedItem === (isReal ? item : item.identifier);
  }

  const TagView = isGradient ? GradientView : View;

  return (
    <ButtonView onPress={onPress} style={[styles.timeItem]}>
      <TagView style={[styles.innerView]}>
        <Text
          style={[
            styles.time,
            isGradient && {
              color: Colors.WHITE,
            },
          ]}
        >
          {isReal ? item.text : item}
        </Text>
      </TagView>
    </ButtonView>
  );
};


const SelectOptionList: React.FC<SelectOptionListProps> = ({
  optionList,
  selectedItem,
  selectedItems,
  setSelecteditem,
  isReal = false,
}) => (
  <Block style={styles.container}>
    {optionList?.map((item) => (
      <Item
        key={item.identifier}
        item={item}
        selectedItem={
          selectedItems && selectedItems.length > 0
            ? selectedItems
            : selectedItem
        }
        isMulti={selectedItems && selectedItems.length > 0}
        setSelecteditem={setSelecteditem}
        isReal={isReal}
      />
    ))}
  </Block>
);

export default SelectOptionList;
