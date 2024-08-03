/** @format */

import React, { useState } from "react";
import { AppButton, Block, Groups, Seperator, Text } from "../../common";
import styles from "./styles";
import { Images } from "../../theme";
import { NavigationService, Util } from "../../utils";
import { backButton, customHeader } from "../../utils/NavigatorHelper";
import { ValidationSchema, useHookForm } from "../../utils/ValidationUtil";
import { Loader, TextInputNative } from "../../components";
import { editContact } from "../../ducks/contacts";
import { useDispatch } from "react-redux";
import { ContactDataUtil } from "../../dataUtils";

const SaveURL = ({ navigation, route }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch();
  const contact_id = route?.params?.id ?? undefined;
  const contactInfo = route?.params?.data ?? undefined;
  const callBack = route.params?.callBack ?? undefined;
  const [formObj, urlProps] = useHookForm(
    ["url"],
    {
      url: ContactDataUtil.url(contactInfo)
        ? ContactDataUtil.url(contactInfo)
        : "",
    },
    ValidationSchema.url
  );

  const submit = formObj.handleSubmit((values) => {
    dispatch(
      editContact.request({
        payloadApi: {
          url: values.url,
        },
        payload_id: contact_id,
        cb: () => {
          Util.showCustomMessage(
            "The url has been saved successfully!",
            "success"
          );
          setTimeout(() => {
            NavigationService.goBack();
          }, 1000);
        },
      })
    );
  });

  React.useLayoutEffect(() => {
    renderHeaderComponent();
  }, [navigation]);

  const renderHeaderComponent = () => {
    navigation.setOptions({
      ...backButton(() => {
        NavigationService?.pop();
      }, Images.icons.cross),
      ...customHeader("Save URL"),
    });
  };

  return (
    <>
      <Block style={styles.containerSearch}>
        <Block paddingHorizontal={16}>
          <TextInputNative
            title={"URL"}
            customPlaceholder={"Enter URL"}
            multlineStyle={styles.etURLStyle}
            multiline={true}
            blurOnSubmit={true}
            maxLength={500}
            {...urlProps}
          />
        </Block>
        <Block style={[styles.bottomContainer]}>
          <AppButton
            title={"Save"}
            onPress={() => {
              submit();
            }}
          />
        </Block>
      </Block>
      {/* <Loader type={["EDIT_CONTACT"]} /> */}
    </>
  );
};

export default SaveURL;
