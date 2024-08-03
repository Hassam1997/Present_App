/** @format */

import React from "react"
import { AppButton, Block, Text } from "../../common"
import { Colors } from "../../theme"
import { NavigationService } from "../../utils"
import styles from "./styles"
import { headerRightButton } from "../../utils/NavigatorHelper"
import { Loader, TextInputNative } from "../../components"
import { ValidationSchema, useHookForm } from "../../utils/ValidationUtil"
import { useDispatch } from "react-redux"
import {
  authJuniorPasswordConsent,
  authSkipJuniorProfile,
} from "../../ducks/auth"

const AddJuniorProfile = ({ navigation }: IsNavigtionProps) => {
  const dispatch = useDispatch()
  const [formObj, passwordProps] = useHookForm(
    ["password"],
    {
      password: __DEV__ ? "Admin@123" : "",
    },
    ValidationSchema.juniorPass
  )

  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...headerRightButton(
        "Skip",
        () => {
          dispatch({
            type: authSkipJuniorProfile.type,
            payload: {
              data: true,
            },
          })
          NavigationService.reset("HomeScreen")
        },
        17,
        Colors.PRIMARY_PINK
      ),
    })
  }, [navigation])

  const submit = formObj.handleSubmit((values: any) => {
    dispatch(
      authJuniorPasswordConsent.request({
        payloadApi: values,
        cb: (data: any) => {
          NavigationService.navigate("ContentPages", {
            heading: "Junior Privacy Notice",
          })
        },
      })
    )
  })

  return (
    <Block style={styles.container}>
      <Text p size={14} color={Colors.TITLE_TEXT} style={styles.txtStyle}>
        By entering your password, you consent to the data practices described
        in the Present Junior Privacy Notice.
      </Text>
      <TextInputNative
        maxLength={100}
        title={"Password"}
        accessibilityLabel={"Password Field"}
        customPlaceholder={"Your password"}
        secureTextEntry
        required
        returnKeyType={"done"}
        containerStyle={styles.inputStyle}
        {...passwordProps}
      />
      <AppButton
        title="Submit"
        accessibilityLabel={"Submit btn"}
        containerStyle={styles.btnStyle}
        onPress={() => {
          submit()
        }}
      />
      <Loader type={authJuniorPasswordConsent.type} />
    </Block>
  )
}

export default AddJuniorProfile
