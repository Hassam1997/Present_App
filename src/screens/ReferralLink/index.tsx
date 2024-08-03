/** @format */

import React, { useState } from "react";
import { Image, ScrollView } from "react-native";
import { AppButton, Block, GiftCard, Text } from "../../common";
import { ButtonView, TextInputNative } from "../../components";
import { DATE_FORMAT, DATE_PICKER_TYPE, MIN_AGE } from "../../config/Constants";
import { MyGiftsData } from "../../dummyData";
import { Colors, Images } from "../../theme";
import { DataHandler, ImagePicker, NavigationService, Util } from "../../utils";
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil";
import styles from "./styles";

const ReferralLink = ({ route }: IsRouteRequiredProps) => {
  const isEdit = route?.params?.isEdit ?? true;
  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear());

  const [formObj, referralLinkFieldkProp] = useHookForm(
    ["referralLinkField"],
    {
      // fullname: __DEV__ ? "my kid" : "",
      // dob: __DEV__ ? "12/03/2009" : "",
      referralLinkField: "www.google.com",
    },
    ValidationSchema.referralLink
  );

  const submit = formObj.handleSubmit((values) => {
    // NavigationService.navigate("AccountVerified", { isJunior: true });
  });

  return (
    <>
      <Block style={styles.container}>
        <Text size={14} color={Colors.TITLE_TEXT} medium>
          Discount Delight: Share your referral link and give your loved ones a
          special discount.
        </Text>
        <Block row bottom marginTop={10}>
          <Block flex={1}>
            <TextInputNative
              title={"Your Referral Link"}
              accessibilityLabel={"Your Referral Link Field"}
              maxLength={100}
              customPlaceholder={"Enter Your Referral Link"}
              editable={false}
              {...referralLinkFieldkProp}
            />
          </Block>
          <ButtonView
            style={styles.shareIconViewStyle}
            onPress={() => {
              Util.onShare("Share", "Share");
            }}
          >
            <Image
              source={Images.icons.uploadIcon}
              style={styles.shareIconStyle}
            />
          </ButtonView>
        </Block>
      </Block>
    </>
  );
};

export default ReferralLink;
