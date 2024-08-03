/** @format */

import React from "react"
import { Block, Text } from "../../common"
import { ButtonView } from "../../components"
import styles from "./styles"
import { Images } from "../../theme"
import { Image } from "react-native"

const EventTextWithImage = ({
  text,
  onPress,
  image = Images.icons.arrowRight,
  secondText = false,
  style,
  dataLength = 8,
}: IPropsEventText) => {
  return (
    <Block style={[styles.eventTextWithImagecontainer, style]}>
      <Block>
        <Text body bold>
          {text}
        </Text>
        {secondText && (
          <Text style={styles.secondText}>Suggested Event Gifts</Text>
        )}
      </Block>
      {dataLength > 4 && (
        <ButtonView onPress={onPress}>
          <Image
            resizeMode="contain"
            style={styles.eventTextWithImagecontainerImage}
            source={image}
          />
        </ButtonView>
      )}
    </Block>
  )
}
export default EventTextWithImage
