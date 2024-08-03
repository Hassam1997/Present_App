/** @format */

import React, { useEffect, useState } from "react";
import {
  AppButton,
  Block,
  Seperator,
  SocialLoginButton,
  Text,
} from "../../common";
import { ButtonView, Loader } from "../../components";
import TextInputNative from "../../components/TextInputNative";
import { NavigationService, SocialLoginUtil, Util } from "../../utils";
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil";
import styles from "./styles";
import { ScrollView } from "react-native";
import { Colors, Images } from "../../theme";
import { SOCIAL_BUTTON_TYPE } from "../../config/Constants";
import { authSignIn, authSocialLogin, getUserData } from "../../ducks/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const [formObj, emailProps, passwordProps] = useHookForm(
    ["email", "password"],
    {
      email: __DEV__ ? "harry@yopmail.com" : "",
      password: __DEV__ ? "Admin@123" : "",
    },
    ValidationSchema.logIn
  );
  const submit = formObj.handleSubmit((values: any) => {
    values.device_type = Util.getPlatform().toUpperCase();
    values.device_token = "12345678";
    dispatch(
      authSignIn.request({
        payloadApi: values,
        cb: (data: any) => {
          if (data?.user?.is_verified == false) {
            NavigationService.navigate("OTPVerification", { data: data?.user });
          } else {
            NavigationService.reset("ChooseAccount");
          }
        },
      })
    );
  });

  const callApi = (payload: any) => {
    setTimeout(() => {
      dispatch(
        authSocialLogin.request({
          payloadApi: payload,
          cb: (data: any) => {
            console.log(
              Util.isEmpty(data?.user?.latitude),
              "userData?.latitude"
            );

            if (data?.user?.latitude) {
              NavigationService.reset("ChooseAccount");
            } else {
              NavigationService.reset("AccountVerified", {
                isSocialLogin: true,
              });
            }
          },
        })
      );
    }, 200);
  };

  function renderSignInContainer() {
    return (
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
      >
        <TextInputNative
          nextFocusRef={passwordProps.forwardRef}
          title={"Email Address"}
          accessibilityLabel={"Email Field"}
          customPlaceholder={"Your email address"}
          keyboardType={"email-address"}
          maxLength={100}
          required
          textContentType={"username"}
          {...emailProps}
        />
        <TextInputNative
          maxLength={100}
          title={"Password"}
          accessibilityLabel={"Password Field"}
          customPlaceholder={"Your password"}
          secureTextEntry
          required
          returnKeyType={"done"}
          textContentType={"password"}
          {...passwordProps}
        />
        <ButtonView
          style={styles.btnForgotPassStyle}
          accessibilityLabel={"Forgot Password? btn"}
          onPress={() => NavigationService.navigate("ForgotPassword")}
        >
          <Text samiBold size={13} color={Colors.PRIMARY_PINK}>
            Forgot Password?
          </Text>
        </ButtonView>
        <AppButton
          title="Sign In"
          accessibilityLabel={"Signin btn"}
          containerStyle={styles.btnStyle}
          onPress={() => {
            submit();
          }}
        />
        <Seperator />
        <Block>
          <SocialLoginButton
            image={Images.icons.googleIcon}
            title="Continue with Google"
            type={SOCIAL_BUTTON_TYPE.GOOGLE}
            containerStyle={styles.buttonView}
            onPress={() => {
              SocialLoginUtil._handleGoogleLogin((response: any) => {
                let payload = {
                  provider: "GO",
                  email: response?.user?.email,
                  full_name:
                    response?.user?.givenName +
                    " " +
                    response?.user?.familyName,
                  platform_token: response?.idToken,
                  image: response?.user?.photo,
                  device_type: Util.getPlatform().toUpperCase(),
                };
                callApi(payload);
              });
            }}
          />
          <SocialLoginButton
            image={Images.icons.facebookIcon}
            title="Continue with Facebook"
            type={SOCIAL_BUTTON_TYPE.FACEBOOK}
            onPress={() => {
              SocialLoginUtil._handleFbLogin((response: any) => {
                console.log("********* Facebook reponse *********");
                console.log(response);
                let payload = {
                  provider: "FB",
                  email: response?.user?.email,
                  full_name:
                    response?.user?.givenName +
                    " " +
                    response?.user?.familyName,
                  platform_token: response?.idToken,
                  image: response?.user?.photo,
                  device_type: Util.getPlatform().toUpperCase(),
                };
                callApi(payload);
              });
            }}
          />
          <SocialLoginButton
            image={Images.icons.instaIcon}
            title="Continue with Instagram"
            type={SOCIAL_BUTTON_TYPE.INSTA}
            onPress={(response: any) => {
              let payload = {
                provider: "IG",
                platform_token: response?.id,
                device_type: Util.getPlatform().toUpperCase(),
                full_name: response?.username,
              };
              callApi(payload);
            }}
          />
          <SocialLoginButton
            image={Images.icons.appleIcon}
            title="Continue with Apple"
            type={SOCIAL_BUTTON_TYPE.APPLE}
            onPress={() => {
              SocialLoginUtil._handleAppleLogin((response: any) => {
                console.log("********* Apple reponse *********");
                console.log(response);
                let payload = {
                  provider: "AP",
                  platform_token: response?.identityToken,
                  device_type: Util.getPlatform().toUpperCase(),
                };
                callApi(payload);
              });
            }}
          />
        </Block>
        <Text p size={12} color={Colors.APP_TEXT} style={styles.policyText}>
          Don’t have an account{" "}
          <ButtonView
            accessibilityLabel={"Terms Conditions btn"}
            onPress={() => {
              NavigationService.navigate("GetStarted");
            }}
          >
            <Text
              bold
              size={14}
              color={Colors.PRIMARY_PINK}
              style={styles.polictTextPrimary}
            >
              Sign Up{" "}
            </Text>
          </ButtonView>{" "}
        </Text>
      </ScrollView>
    );
  }
  return (
    <Block flex style={styles.containerStyle}>
      {renderSignInContainer()}
      <Loader type={[authSignIn.type, authSocialLogin.type]} />
    </Block>
  );
};
export default Login;
