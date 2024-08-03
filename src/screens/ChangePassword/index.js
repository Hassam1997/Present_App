/** @format */

import React from "react";
import { ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { AppButton, Block, Text } from "../../common";
import { Loader, TextInputNative } from "../../components";
import { authChangePassword } from "../../ducks/auth";
import { NavigationService, Util } from "../../utils";
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil";
import styles from "./styles";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [formObj, currentPasswordProp, newPasswordProp, confirmPasswordProps] =
    useHookForm(
      ["old_password", "new_password", "confirm_password"],
      {},
      ValidationSchema.changePassword
    );

  const submit = formObj.handleSubmit((values) => {
    if (values.confirm_password) {
      delete values.confirm_password;
    }
    dispatch(
      authChangePassword.request({
        payloadApi: values,
        cb: () => {
          Util.showCustomMessage("Your password has been updated!", "success");
          setTimeout(() => {
            NavigationService.goBack();
          }, 500);
        },
      })
    );
  });

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={"handled"}
      bounces={false}
    >
      <Block style={styles.textInputView}>
        <Text
          style={styles.txtChangePass}
          accessibilityLabel={"Changepassword Img"}
        >
          Make sure your new password is unique and not used for any other
          accounts.
        </Text>
        <TextInputNative
          nextFocusRef={newPasswordProp.forwardRef}
          title={"Current Password"}
          accessibilityLabel={"Current Password Field"}
          maxLength={100}
          customPlaceholder={"Enter your current password"}
          topSpaceLarge
          secureTextEntry
          required
          {...currentPasswordProp}
        />
        <TextInputNative
          nextFocusRef={confirmPasswordProps.forwardRef}
          title={"New Password"}
          accessibilityLabel={"New Password Field"}
          maxLength={100}
          customPlaceholder={"Enter your new password"}
          topSpaceLarge
          secureTextEntry
          required
          {...newPasswordProp}
        />
        <TextInputNative
          returnKeyType={"done"}
          title={"Confirm Password"}
          accessibilityLabel={"Confirm Password Field"}
          maxLength={100}
          customPlaceholder={"Re enter your new password"}
          topSpaceLarge
          secureTextEntry
          required
          {...confirmPasswordProps}
        />
      </Block>
      <AppButton
        title="Update"
        accessibilityLabel={"Changepassword btn"}
        containerStyle={styles.btnStyle}
        onPress={submit}
      />
      <Loader type={authChangePassword.type} />
    </ScrollView>
  );
};

export default ChangePassword;
