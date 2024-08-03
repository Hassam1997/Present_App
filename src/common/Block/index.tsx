/** @format */

import React, { ReactNode } from "react"
import { View, StyleSheet, SafeAreaView, ViewStyle } from "react-native"
import PropTypes from "prop-types"
import { Size as size, Colors } from "../../theme"

interface BlockProps {
	row?: boolean;
	flex?: boolean | number;
	center?: boolean;
	middle?: boolean;
	top?: boolean;
	bottom?: boolean;
	right?: boolean;
	left?: boolean;
	shadow?: boolean;
	space?: 'between' | 'around' | 'evenly' | null;
	fluid?: boolean;
	height?: number | null;
	shadowColor?: string | null;
	card?: boolean;
	width?: number | null;
	safe?: boolean;
	style?: StyleSheetProps;
	children?: ReactNode;
	[key: string]: any;
	align?: boolean;
}

function Block({
  row,
  flex,
  center,
  middle,
  top,
  bottom,
  right,
  left,
  shadow,
  space,
  fluid,
  height,
  shadowColor,
  card,
  width,
  safe,
  children,
  style,
  align,
  ...rest
}: BlockProps) {
  const styleBlock: any = [
    styles.block,
    row && styles.row,
    flex && { flex: flex === true ? 1 : flex },
    center && styles.center,
    middle && styles.middle,
    top && styles.top,
    bottom && styles.bottom,
    right && styles.right,
    left && styles.left,
    space && { justifyContent: `space-${space}` },
    align && styles.align,
    shadow && styles.shadow,
    fluid && styles.fluid,
    card && styles.card,
    height && { height },
    width && { width },
    shadowColor && { shadowColor },
    style,
  ]

  if (safe) {
    return (
      <SafeAreaView style={styleBlock} {...rest}>
        {children}
      </SafeAreaView>
    )
  }

  return (
    <View style={styleBlock} {...rest}>
      {children}
    </View>
  )
}

Block.defaultProps = {
  row: false,
  flex: false,
  center: false,
  middle: false,
  top: false,
  bottom: false,
  right: false,
  left: false,
  card: false,
  shadow: false,
  space: null,
  align: false,
  fluid: false,
  height: null,
  width: null,
  shadowColor: null,
  safe: false,
  styles: {},
}

Block.propTypes = {
  row: PropTypes.bool,
  flex: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  center: PropTypes.bool,
  middle: PropTypes.bool,
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  right: PropTypes.bool,
  card: PropTypes.bool,
  left: PropTypes.bool,
  shadow: PropTypes.bool,
  space: PropTypes.oneOf(["between", "around", "evenly"]),
  align: PropTypes.bool,
  fluid: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  shadowColor: PropTypes.string,
  safe: PropTypes.bool,
  styles: PropTypes.any,
  theme: PropTypes.any,
}

const styles: any = StyleSheet.create({
  block: {
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
  },
  middle: {
    alignItems: "center",
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    alignSelf: "center",
  },
  left: {
    alignItems: "flex-start",
  },
  right: {
    alignItems: "flex-end",
  },
  top: {
    alignItems: "flex-start",
    alignSelf: "flex-start",
  },
  bottom: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
  },
  align: {
    alignItems: "center",
  },
  card: {
    borderRadius: size.CARD_BORDER_RADIUS,
    borderWidth: size.CARD_BORDER_WIDTH,
    borderColor: Colors.BLACK,
  },
  shadow: {
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: size.BLOCK_SHADOW_OPACITY,
    shadowRadius: size.BLOCK_SHADOW_RADIUS,
    elevation: size.ANDROID_ELEVATION,
  },
  fluid: {
    width: "auto",
  },
})

export default Block
