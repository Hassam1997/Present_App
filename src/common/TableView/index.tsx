/** @format */

import React from "react"
import styles from "./styles"
import Block from "../Block"
import { ButtonView } from "../../components"
import { Text } from ".."
import { Util } from "../../utils"
import { Metrics } from "../../theme"

interface TableViewProps {
  data: object
  onPress?: (identifier: string | number) => void
}

const TableView: React.FC<TableViewProps> = ({ data, onPress }: any) => {
  const TagView = onPress ? ButtonView : Block
  return (
    <TagView style={styles.container} onPress={onPress}>
      <Block row center style={styles.blockView}>
        <Text p size={14}>
          {data?.key.charAt(0).toUpperCase() + data?.key.slice(1)}
        </Text>
      </Block>
      <Text p size={14} numberOfLines={2} width={Metrics.screenWidth * 0.45}>
        {Util.isArray(data?.value) ? data?.value.join(", ") : data?.value}
      </Text>
    </TagView>
  )
}

export default TableView
