/** @format */

import React from "react"
import styles from "./styles"
import Block from "../Block"
import { ButtonView } from "../../components"
import { Text, GradientView } from ".."
import { ViewStyle } from "react-native"
import { Colors } from "../../theme"
import { DashBoardUtil } from "../../dataUtils"

interface TagsProps {
  data: object
  onPressButton: (identifier: string | number) => void
  identifier?: string | number
  isSelected?: string | boolean | undefined
}

const Tags: React.FC<TagsProps> = ({
  data,
  onPressButton,
  identifier,
  isSelected,
}: any) => {
  const TagView = onPressButton ? ButtonView : Block
  const BlockView = isSelected ? GradientView : Block
  return (
    <TagView
      style={styles.container}
      onPress={() => {
        onPressButton?.(identifier)
      }}>
      <BlockView style={styles.blockView}>
        <Text
          p
          size={14}
          color={isSelected ? Colors.WHITE : Colors.SLIDER_BACKGROUND_COLOR}>
          {DashBoardUtil.name(data)}
        </Text>
      </BlockView>
    </TagView>
  )
}

export default Tags
