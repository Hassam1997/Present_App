/** @format */

import { Image } from "react-native"
import React from "react"
import PropTypes from "prop-types"
import { Colors } from "../../theme"
import { ButtonView } from "../../components"
import styles from "./styles"
import Block from "../Block"
import { Text } from ".."
import { NotificationUtil } from "../../dataUtils"

const NotificationCard = ({ onPress, data }) => {
  const TagView = onPress ? ButtonView : Block
  const { notificationMessage, profileImage, notificationImage, read, time } =
    data

  return (
    <>
      <TagView
        style={[
          styles.cardContainer,

          {
            backgroundColor: NotificationUtil?.is_read(data)
              ? Colors.SKY_BLUE
              : Colors.WHITE,
          },
        ]}
        onPress={onPress}>
        <Block style={styles.profileImage}>
          <Image
            source={profileImage}
            style={styles.imageView}
            placeholderStyle={styles.imageView}
            resizeMode="cover"
          />
        </Block>
        <Block style={styles.textContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {notificationMessage}
          </Text>

          <Text medium style={styles.timeContainer}>
            {time}
          </Text>
        </Block>
        {notificationImage && (
          <Block style={styles.notificationContainer}>
            <Image
              source={notificationImage}
              style={styles.notificationImage}
              placeholderStyle={styles.imageView}
              resizeMode="cover"
            />
          </Block>
        )}
      </TagView>
    </>
  )
}

NotificationCard.propTypes = {
  onPress: PropTypes.func,
  data: PropTypes.any,
  index: PropTypes.any,
  onMessagePress: PropTypes.func,
  type: PropTypes.string,
}

NotificationCard.defaultProps = {
  onPress: () => {},
  data: null,
  index: null,
  onMessagePress: () => {},
  type: "",
}

export default NotificationCard
