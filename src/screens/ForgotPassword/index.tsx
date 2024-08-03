/** @format */

import React from "react"
import { AppButton, Block, Text } from "../../common"
import TextInputNative from "../../components/TextInputNative"
import { NavigationService } from "../../utils"
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil"
import styles from "./styles"
import { Colors } from "../../theme"
import { ScrollView } from "react-native"
import { useDispatch } from "react-redux"
import { authForgotPassword } from "../../ducks/auth"
import { Loader } from "../../components"

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const [formObj, emailProps] = useHookForm(
    ["email"],
    {
      email: __DEV__ ? "email@email.com" : "",
    },
    ValidationSchema.forgotPass
  )
  const submit = formObj.handleSubmit((values: any) => {
    dispatch(
      authForgotPassword.request({
        payloadApi: values,
        cb: (data: any) => {
          NavigationService.navigate("OTPVerification", {
            isForgot: true,
            data: values,
          })
        },
      })
    )
  })

  function renderForgotPasswordContainer() {
    return (
      <ScrollView>
        <Text
          p
          size={14}
          color={Colors.TITLE_TEXT}
          style={styles.txtStyle}
          accessibilityLabel={"Forgot Password Img"}>
          Enter the email associated with your account & we’ll send verification
          code to reset your password.
        </Text>
        <TextInputNative
          title={"Email Address"}
          accessibilityLabel={"Email Field"}
          customPlaceholder={"Your email address"}
          keyboardType={"email-address"}
          containerStyle={styles.etEmailStyle}
          maxLength={100}
          required
          {...emailProps}
        />
        <AppButton
          title="Submit"
          accessibilityLabel={"Submit btn"}
          containerStyle={styles.btnStyle}
          onPress={() => {
            submit()
          }}
        />
      </ScrollView>
    )
  }
  return (
    <Block flex style={styles.containerStyle}>
      {renderForgotPasswordContainer()}
      <Loader type={authForgotPassword.type} />
    </Block>
  )
}
export default ForgotPassword
