/** @format */

import React, { useImperativeHandle, useState } from "react"
import { Image } from "react-native"
import Modal from "react-native-modal"
import styles from "./styles"
import { Util } from "../../utils"
import { ButtonView } from "../../components"
import { Block, Text } from "../../common"
import { Colors, Images } from "../../theme"

const FlashModal = (props, forwardedRef) => {
  const [data, setData] = useState({
    description: undefined,
    isVisible: false,
    callback: () => {},
  })

  // hide modal function
  const hideModal = () => {
    setData({ ...data, isVisible: false })
  }

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    show: (options = data) => {
      setData({ ...options, isVisible: true })
    },
    hide: hideModal,
  }))

  const { title, duration, type, callback, isVisible } = data

  return (
    <Modal
      backdropTransitionOutTiming={0}
      style={styles.modal}
      isVisible={isVisible}
      useNativeDriver={Util.isPlatformAndroid()}
      backdropOpacity={0.6}
      hasBackdrop={true}
      coverScreen={true}
      animationIn={"fadeInDown"}
      animationOut={"fadeOutUp"}
      onSwipeComplete={() => hideModal()}
      swipeDirection="right">
      <Block style={styles.mainContainer}>
        <Image
          resizeMode="contain"
          source={
            Images.icons.saved
            // type == 'danger' ? Images.icons.errorIcon : Images.icons.flashIcon
          }
        />
        <Text style={styles.title}>{title}</Text>
        <ButtonView
          debounceTime={0}
          onPress={() => {
            hideModal()
          }}
          style={[styles.button]}>
          <Image source={Images.icons.cross} />
        </ButtonView>
      </Block>
    </Modal>
  )
}

export default React.forwardRef(FlashModal)
