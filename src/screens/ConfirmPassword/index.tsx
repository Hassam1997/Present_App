/** @format */

import React from "react";
import { AppButton, Block, Text } from "../../common";
import TextInputNative from "../../components/TextInputNative";
import { NavigationService } from "../../utils";
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil";
import styles from "./styles";
import { Colors } from "../../theme";
import { ScrollView } from "react-native";
import { authProfileData, authVerifyPassword } from "../../ducks/auth";
import { useDispatch } from "react-redux";
import { Loader } from "../../components";

const ConfirmPassword = ({ route }: IsRouteRequiredProps) => {
  const dispatch = useDispatch();
  const isSwitchProfile = route?.params?.isSwitchProfile ?? undefined;
  const isMaiUser = route?.params?.isMaiUser ?? false;
  const [formObj, passwordProps] = useHookForm(
    ["password"],
    {
      password: __DEV__ ? "Admin@123" : "",
    },
    ValidationSchema.confirmPass
  );
  const submit = formObj.handleSubmit((values: any) => {
    const apiPayload: { junior_id?: String } = { ...values };

    if (isSwitchProfile && !isMaiUser) {
      apiPayload.junior_id = isSwitchProfile?.id;
    }

    dispatch(
      authVerifyPassword.request({
        payloadApi: apiPayload,
        cb: () => {
          // setTimeout(() => {
          if (isSwitchProfile) {
            if (!isMaiUser) {
              dispatch({
                type: authProfileData.type,
                payload: {
                  data: isSwitchProfile,
                },
              });
            } else {
              dispatch({
                type: authProfileData.type,
                payload: {
                  data: {},
                },
              });
            }
          } else {
            if (isMaiUser) {
              dispatch({
                type: authProfileData.type,
                payload: {
                  data: {},
                },
              });
            }
          }
          // }, 300);
          NavigationService.reset("HomeScreen");
        },
      })
    );
  });

  function renderConfirmPasswordContainer() {
    return (
      <ScrollView>
        {route?.params?.yourProfile ? (
          <Text p size={14} color={Colors.TITLE_TEXT} style={styles.txtStyle}>
            To access your account, please enter your password
          </Text>
        ) : (
          <Text p size={14} color={Colors.TITLE_TEXT} style={styles.txtStyle}>
            To access your kid’s profile, please enter your password
          </Text>
        )}
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
            submit();
          }}
        />
      </ScrollView>
    );
  }
  return (
    <Block flex style={styles.containerStyle}>
      {renderConfirmPasswordContainer()}
      <Loader type={authVerifyPassword.type} />
    </Block>
  );
};
export default ConfirmPassword;
