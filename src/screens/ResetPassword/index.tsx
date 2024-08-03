/** @format */

import React from "react"
import { AppButton, Block, Text } from "../../common"
import TextInputNative from "../../components/TextInputNative"
import { NavigationService, Util } from "../../utils"
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil"
import styles from "./styles"
import { ScrollView } from "react-native"
import { Colors } from "../../theme"
import { useDispatch } from "react-redux"
import { authResetPassword } from "../../ducks/auth"
import { Loader } from "../../components"

const ResetPassword = ({ route }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch()
  const [formObj, new_passwordProps, confirm_new_passwordProps] = useHookForm(
    ["new_password", "confirm_new_password"],
    {
      new_password: __DEV__ ? "Admin@123" : "",
      confirm_new_password: __DEV__ ? "Admin@123" : "",
    },
    ValidationSchema.resetPass
  )
  const submit = formObj.handleSubmit((values: any) => {
    values.user_id = route?.params?.data?.user?.id
    dispatch(
      authResetPassword.request({
        payloadApi: values,
        cb: (data: any) => {
          setTimeout(() => {
            NavigationService.reset("Login")
            Util.showCustomMessage("Password Reset Successfully", "success")
          }, 2000)
        },
      })
    )
  })

  function renderResetContainer() {
    return (
      <ScrollView>
        <Text p size={14} color={Colors.TITLE_TEXT} style={styles.txtStyle}>
          Your new password must be different from the previously used
          passwords.
        </Text>
        <TextInputNative
          nextFocusRef={confirm_new_passwordProps.forwardRef}
          maxLength={100}
          title={"Password"}
          accessibilityLabel={"Password Field"}
          customPlaceholder={"Enter your new password"}
          containerStyle={styles.etPassStyle}
          secureTextEntry
          required
          {...new_passwordProps}
        />
        <TextInputNative
          maxLength={100}
          title={"Confirm Password"}
          accessibilityLabel={"Confirm Password Field"}
          customPlaceholder={"Re enter your new password"}
          secureTextEntry
          required
          returnKeyType={"done"}
          {...confirm_new_passwordProps}
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
      {renderResetContainer()}
      <Loader type={authResetPassword.type} />
    </Block>
  )
}
export default ResetPassword
