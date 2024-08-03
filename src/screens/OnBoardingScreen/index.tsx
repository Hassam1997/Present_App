/** @format */

import React, { useState } from "react"
import { AnimatedImage, AppButton, Block, Text } from "../../common"
import styles from "./styles"
import { Colors, Images } from "../../theme"
import { NavigationService } from "../../utils"
import { ButtonView } from "../../components"
import { authOnBoarding } from "../../ducks/general"
import { useDispatch } from "react-redux"

const OnBoardingScreen = () => {
  const dispatch = useDispatch()
  const imageSources = [Images.images.OnBoarding_1, Images.images.OnBoarding_2]
  return (
    <>
      <AnimatedImage imageSource={imageSources[0]} delay={0} />
      <AnimatedImage imageSource={imageSources[1]} delay={3000} />
      <Block style={styles.bottomContainer}>
        <Text bold size={24} color={Colors.WHITE}>
          Welcome to Present
        </Text>
        <Text p size={14} color={Colors.WHITE} style={styles.subText}>
          Aenean vulputate eleifend tellus. Aenean leo ligula porttitor eu.
        </Text>
        <Block style={styles.dots} />
        <Block style={styles.buttonView}>
          <AppButton
            title="Log In"
            containerStyle={styles.loginButton}
            onPress={() => {
              dispatch({
                type: authOnBoarding.type,
                payload: {
                  data: true,
                },
              })
              NavigationService.reset("Login")
            }}
          />
          <AppButton
            title="New User?"
            containerStyle={styles.newUserButton}
            onPress={() => {
              dispatch({
                type: authOnBoarding.type,
                payload: {
                  data: true,
                },
              })
              NavigationService.reset("GetStarted")
            }}
          />
        </Block>
        <Block style={styles.policyView}>
          <ButtonView
            onPress={() => {
              NavigationService.navigate("ContentPages", {
                heading: "Terms of Use",
              })
            }}>
            <Text p size={14} color={Colors.PRIVACY_TEXT}>
              Terms of Use
            </Text>
          </ButtonView>
          <Block style={styles.seperatorView} />
          <ButtonView
            onPress={() => {
              NavigationService.navigate("ContentPages", {
                heading: "Privacy Policy",
              })
            }}>
            <Text p size={14} color={Colors.PRIVACY_TEXT}>
              Privacy Policy
            </Text>
          </ButtonView>
        </Block>
      </Block>
    </>
  )
}

export default OnBoardingScreen
