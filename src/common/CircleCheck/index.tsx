/** @format */

import React, { FC } from "react"
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native"
import { Text } from ".." // Update the path to the Text component if needed
import { ButtonView } from "../../components" // Update the path to the ButtonView component if needed
import { Colors, Images, Metrics } from "../../theme"
import Block from "../Block" // Update the path to the Block component if needed
import styles from "./styles"

interface CircleCheckProps {
  title?: string
  onPressButton?: (identifier: any) => void
  identifier?: any
  containerStyle?: StyleProp<ViewStyle>
  isSelected?: string | boolean | undefined | any
  tintColor?: string
  selectedColor?: string
  unckeck?: boolean
  buttonType?: string
  customTextStyle?: StyleProp<ViewStyle>
  radioStyle?: StyleProp<ViewStyle>
}

const CircleCheck: FC<CircleCheckProps> = ({
  title,
  onPressButton,
  identifier,
  containerStyle,
  isSelected,
  tintColor,
  selectedColor = Colors.PRIMARY_PINK,
  unckeck,
  buttonType,
  customTextStyle,
  radioStyle,
}) => {
  const renderCheckCircle = () => {
    return (
      <Block
        style={
          [
            styles.btnStyleContainer,
            isSelected
              ? buttonType == "RADIO"
                ? {
                    borderColor: Colors.PRIMARY_PINK,
                    borderWidth: 2,
                  }
                : {
                    backgroundColor: selectedColor,
                    borderWidth: 0,
                  }
              : { backgroundColor: Colors.WHITE },
            containerStyle,
          ] as ViewStyle
        }>
        {buttonType === "RADIO" && isSelected ? (
          <Block style={[styles.radioButton, radioStyle]} />
        ) : (
          <Image
            source={Images.icons.checkIcon as ImageSourcePropType}
            style={{ tintColor: tintColor }}
          />
        )}
      </Block>
    )
  }

  const TagView = unckeck ? Block : ButtonView // Update the type of TagView based on the condition

  return (
    <TagView
      disabledOpacity={1}
      debounceTime={0}
      onPress={() => onPressButton?.(identifier)}
      style={[styles.mainView] as ViewStyle}>
      {title && (
        <Text style={[styles.textStyle, customTextStyle] as TextStyle}>
          {title}
        </Text>
      )}
      {renderCheckCircle()}
    </TagView>
  )
}

export default CircleCheck
