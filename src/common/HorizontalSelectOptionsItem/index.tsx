import React, { useState } from "react";
import { ButtonView } from "../../components";
import Block from "../Block";
import GradientView from "../GradientView";
import { Text } from "../";
import styles from "./styles";
import { Colors } from "../../theme";

const HorizontalSelectOptionsItem: React.FC<any> = ({
  item,
  selectedState,
  setSelectedState,
}) => {
  // const [selectedState, setSelectedState] = useState<string>("");
  const TagView = selectedState === item.identifier ? GradientView : Block;

  return (
    <ButtonView
      style={[styles.headerView]}
      onPress={() => {
        if (selectedState !== item.identifier) {
          setSelectedState(item.identifier);
        } else {
          setSelectedState("");
        }
      }}
    >
      <TagView style={styles.headerViewGradient}>
        <Text
          color={
            selectedState === item.identifier ? Colors.WHITE : Colors.APP_TEXT
          }
        >
          {item.text}
        </Text>
      </TagView>
    </ButtonView>
  );
};

export default HorizontalSelectOptionsItem;
