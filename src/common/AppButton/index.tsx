/** @format */

import React from "react"
import {
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
} from "react-native"
import styles from "./styles"
import { ButtonView } from "../../components"
import { Colors } from "../../theme"

interface AppButtonProps {
  title: string
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  onPress?: () => void
  disabled?: boolean
  accessibilityLabel?: string
  image?: any
  imageStyle?: StyleProp<ImageStyle>
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  containerStyle,
  textStyle,
  onPress,
  accessibilityLabel,
  image,
  disabled,
  imageStyle,
}: any) => {
  const dynamicStyle = disabled
    ? { backgroundColor: Colors.DISABLE_BUTTON }
    : containerStyle
  const dynamicStyleText = disabled ? { color: Colors.DARK_GREY } : textStyle
  return (
    <ButtonView
      style={[styles.buttonStyle, containerStyle, dynamicStyle]}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      disabled={disabled}>
      <Image
        source={image}
        style={image ? [styles.imageStyle, imageStyle] : {}}
      />
      <Text style={[styles.buttonTextStyle, textStyle, dynamicStyleText]}>
        {title}
      </Text>
    </ButtonView>
  )
}

AppButton.defaultProps = {
  containerStyle: {},
  textStyle: {},
  onPress: () => {},
  accessibilityLabel: "",
  image: null,
  disabled: false,
  imageStyle: {},
}

export default AppButton
