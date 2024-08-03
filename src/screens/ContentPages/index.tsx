/** @format */

import React, { useState } from "react";
import WebView from "react-native-webview";
import { AppButton, Block, CircleCheck, Text } from "../../common";
import { Fonts } from "../../theme";
import { title } from "../../utils/NavigatorHelper";
import styles from "./styles";
import { NavigationService } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  authContentPages,
  authUpdateProfile,
  getContentPages,
} from "../../ducks/auth";
import { Loader } from "../../components";

const ContentPages = (props: IsNavigtionProps) => {
  const dispatch = useDispatch();
  const contentPages = useSelector(getContentPages);
  const [selectedIdentifier, setSelectedIdentifier] = useState<string>("");
  const { route, navigation } = props;
  const { heading, url } = route?.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...title(heading, 17, Fonts.manrope.bold, true),
    });
    switch (heading) {
      case "Privacy Policy":
        callApi("20");
        break;
      case "Junior Privacy Notice":
        callApi("30");
        break;
      case "Terms of Use":
        callApi("40");
        break;
      default:
        break;
    }
  }, [navigation]);

  const callApi = (value: string) => {
    dispatch(
      authContentPages.request({
        parameter: value,
      })
    );
  };

  const agreeTerms = (value: string) => {
    dispatch(
      authUpdateProfile.request({
        payloadApi: {
          get_recommendation_email: true,
        },
        cb: (data: any) => {
          NavigationService.navigate("JuniorSignUp");
        },
      })
    );
  };

  return (
    <Block flex style={styles.container}>
      <WebView
        style={styles.viewText}
        startInLoadingState={true}
        source={{
          ...(heading ==
          ("Privacy Policy" && "Junior Privacy Notice" && "Terms of Use")
            ? { html: contentPages?.content }
            : { uri: url }),
        }}
        contentMode={"mobile"}
      />
      {heading == "Junior Privacy Notice" && (
        <Block style={styles.buttonView}>
          <Block style={styles.checkboxView}>
            <CircleCheck
              isSelected={selectedIdentifier.includes("yes") ? true : false}
              onPressButton={() => {
                if (selectedIdentifier.includes("yes")) {
                  setSelectedIdentifier("");
                } else {
                  setSelectedIdentifier("yes");
                }
              }}
            />
            <Text style={styles.textStyle}>
              Get email with recommended content, tips and updaates
            </Text>
          </Block>
          <AppButton
            title="I, Agree"
            disabled={selectedIdentifier == "" ? true : false}
            onPress={() => {
              agreeTerms(selectedIdentifier);
            }}
          />
        </Block>
      )}
      <Loader type={authUpdateProfile.type} />
    </Block>
  );
};

export default ContentPages;
