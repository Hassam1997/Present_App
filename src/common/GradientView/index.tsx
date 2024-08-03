/** @format */

import React, { ReactNode } from "react";
import LinearGradient from "react-native-linear-gradient";
import { Colors } from "../../theme";
import { StyleProp, ViewStyle } from "react-native";

interface GradientViewProps {
  children: ReactNode;
  horizontal?: boolean;
  type?: "primary" | "secondary" | "tertiary";
  style?: StyleProp<ViewStyle>;
}

const GradientView: React.FC<GradientViewProps> = (
  props: GradientViewProps
) => {
  const { children, horizontal, type = "primary", style } = props;
  let colors: string[] = [];
  if (type === "primary") {
    colors = [Colors.SKY_RED, Colors.PURPLE];
  } else if (type === "secondary") {
    colors = [Colors.GRADIENT_GREEN, Colors.GRADIENT_BLUE];
  } else if (type === "tertiary") {
    colors = [Colors.GRADIENT_PINK, Colors.PURPLE];
  }

  return (
    <LinearGradient
      style={[{ flex: 1 }, style] as ViewStyle}
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: horizontal ? 0 : 1, y: horizontal ? 1 : 0 }}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

export default React.memo(GradientView);
