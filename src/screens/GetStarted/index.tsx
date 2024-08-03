/** @format */

import React from "react";
import {
  AppButton,
  Block,
  Seperator,
  SocialLoginButton,
  Text,
} from "../../common";
import styles from "./styles";
import { Colors, Images } from "../../theme";
import { SOCIAL_BUTTON_TYPE } from "../../config/Constants";
import { ButtonView, Loader } from "../../components";
import { ScrollView } from "react-native";
import { NavigationService, SocialLoginUtil, Util } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { authSocialLogin, getUserData } from "../../ducks/auth";

const GetStarted = () => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);

  const callApi = (payload: any) => {
    setTimeout(() => {
      dispatch(
        authSocialLogin.request({
          payloadApi: payload,
          cb: (data: any) => {
            if (userData?.latitude) {
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

  return (
    <ScrollView style={styles.containerStyle} bounces={false}>
      <Text p color={Colors.TITLE_TEXT} size={14}>
        Let’s create your account with...
      </Text>
      <Block style={styles.buttonContainer}>
        <SocialLoginButton
          image={Images.icons.googleIcon}
          title="Continue with Google"
          type={SOCIAL_BUTTON_TYPE.GOOGLE}
          onPress={() => {
            SocialLoginUtil._handleGoogleLogin((response: any) => {
              let payload = {
                provider: "GO",
                email: response?.user?.email,
                full_name:
                  response?.user?.givenName + " " + response?.user?.familyName,
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
                  response?.user?.givenName + " " + response?.user?.familyName,
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
      <Seperator />
      <AppButton
        image={Images.icons.emailIcon}
        title="Continue with Email"
        onPress={() => NavigationService.navigate("SignUp")}
      />
      <Text p size={12} color={Colors.APP_TEXT} style={styles.policyText}>
        Already have an account{" "}
        <ButtonView
          accessibilityLabel={"Terms Conditions btn"}
          onPress={() => {
            NavigationService.navigate("Login");
          }}
        >
          <Text
            bold
            size={14}
            color={Colors.PRIMARY_PINK}
            style={styles.polictTextPrimary}
          >
            Sign in{" "}
          </Text>
        </ButtonView>{" "}
      </Text>
      <Text p size={12} color={Colors.APP_TEXT} style={styles.policyText}>
        By continuing you agree to our{" "}
        <ButtonView
          accessibilityLabel={"Terms Conditions btn"}
          onPress={() => {
            NavigationService.navigate("ContentPages", {
              heading: "Terms of Use",
            });
          }}
        >
          <Text
            bold
            size={14}
            color={Colors.PRIMARY_PINK}
            style={styles.polictTextPrimary}
          >
            Terms of Use{" "}
          </Text>
        </ButtonView>{" "}
        and{" "}
        <ButtonView
          accessibilityLabel={"Terms Conditions btn"}
          onPress={() => {
            NavigationService.navigate("ContentPages", {
              heading: "Privacy Policy",
            });
          }}
        >
          <Text
            bold
            size={14}
            color={Colors.PRIMARY_PINK}
            style={styles.polictTextPrimary}
          >
            Privacy Policy{" "}
          </Text>
        </ButtonView>{" "}
      </Text>
      <Loader type={authSocialLogin.type} />
    </ScrollView>
  );
};

export default GetStarted;
