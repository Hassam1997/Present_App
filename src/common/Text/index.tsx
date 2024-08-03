/** @format */

import React, { ReactNode } from "react"
import { LayoutChangeEvent, StyleSheet, Text, TextStyle } from "react-native"
import { Colors, FontClass as Fonts } from "../../theme"
import normalize from "../../helpers"

interface TypographyProps {
  style?: TextStyle | undefined
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  h6?: boolean
  p?: boolean
  body?: boolean
  small?: boolean
  muted?: boolean
  neutral?: boolean
  size?: number
  color?: string
  bold?: boolean
  samiBold?: boolean
  medium?: boolean
  black?: boolean
  extraBold?: boolean
  extraLight?: boolean
  light?: boolean
  thin?: boolean
  italic?: boolean
  children: ReactNode
  accessibilityLabel?: string
  onLayout?: (event: LayoutChangeEvent) => void
  flex?: number
  marginTop?: number
  marginBottom?: number
  marginVertical?: number
  marginHorizontal?: number
  numberOfLines?: number | undefined
  left?: number | undefined
  marginLeft?: number
  width?: number | string
  textDecorationLine?:
    | "line-through"
    | "underline line-through"
    | "none"
    | "underline"
    | undefined
}

const Typography: React.FC<TypographyProps> = ({
  style,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  body,
  small,
  muted,
  neutral,
  size,
  color,
  bold,
  samiBold,
  medium,
  black,
  extraBold,
  extraLight,
  light,
  thin,
  italic,
  children,
  marginTop,
  marginBottom,
  marginVertical,
  numberOfLines,
  left,
  width,
  textDecorationLine,
  ...rest
}: any) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles.txt,
        h1 && { fontSize: normalize(44) },
        h2 && { fontSize: normalize(38) },
        h3 && { fontSize: normalize(30) },
        h4 && { fontSize: normalize(24) },
        h5 && { fontSize: normalize(21) },
        h6 && { fontSize: normalize(18) },
        p && { fontSize: normalize(16) },
        body && { fontSize: normalize(14) },
        small && { fontSize: normalize(12) },
        muted && { color: Colors.MUTED },
        neutral && { color: Colors.NEUTRAL },
        size && { fontSize: size },
        marginTop && { marginTop: marginTop },
        marginBottom && { marginBottom: marginBottom },
        marginVertical && { marginVertical: marginVertical },
        width && { width: width },
        left && { left: left },
        textDecorationLine && { textDecorationLine: textDecorationLine },
        color && { color },
        italic && { fontStyle: "italic" },
        bold && { ...Fonts.BoldFont() },
        samiBold && { ...Fonts.SemiBoldFont() },
        medium && { ...Fonts.MediumFont() },
        black && { ...Fonts.BlackFont() },
        extraBold && { ...Fonts.ExtraBoldFont() },
        extraLight && { ...Fonts.ExtraLightFont() },
        light && { ...Fonts.LightFont() },
        thin && { ...Fonts.ThinFont() },
        style && style,
      ]}
      {...rest}>
      {children}
    </Text>
  )
}

Typography.defaultProps = {
  children: null,
  style: {},
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  p: false,
  body: false,
  small: false,
  size: 0,
  color: Colors.TITLE_TEXT,
  muted: false,
  bold: false,
  samiBold: false,
  medium: false,
  black: false,
  extraBold: false,
  extraLight: false,
  light: false,
  thin: false,
  italic: false,
  marginTop: 0,
  marginBottom: 0,
  marginVertical: 0,
  left: 0,
}
const styles = StyleSheet.create({
  txt: {
    color: Colors.TITLE_TEXT,
    ...Fonts.font(Fonts.FontFamily.default, Fonts.Type.Regular),
    // writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
})

export default Typography
