/** @format */

import React, { useState } from "react"
import { AppButton, Block, Text } from "../../common"
import { Colors } from "../../theme"
import styles from "./styles"
import { NavigationService } from "../../utils"
import { Alert } from "react-native"

const DeleteAccount = () => {
  const renderHeader = () => {
    return (
      <Block style={styles.headerView}>
        <Text samiBold size={16} color={Colors.TITLE_TEXT}>
          We’re sad to see you go. Deleting your account cannot be undone
        </Text>
        <Text p size={14} color={Colors.TITLE_TEXT} marginTop={15}>
          If you delete your account your date can’t be recovered. All your
          personal data will be completely erased.
        </Text>
      </Block>
    )
  }

  const renderFooter = () => {
    return (
      <Block style={styles.footerStyle}>
        <AppButton
          title={"Delete Account"}
          onPress={() => {
            Alert.alert(
              "Are you sure you’d like to continue?",
              "Deleting your account cannot be undone. Are you sure you'd like to continue?",
              [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Confirm",
                  onPress: () =>
                    NavigationService.navigate("DeactivateAccount"),
                },
              ]
            )
          }}
        />
        <AppButton
          title={"Go Back"}
          onPress={() => {
            NavigationService.goBack()
          }}
          containerStyle={styles.gobackButton}
          textStyle={styles.gobackText}
        />
      </Block>
    )
  }

  return (
    <Block style={styles.container}>
      {renderHeader()}
      {renderFooter()}
    </Block>
  )
}

export default DeleteAccount
