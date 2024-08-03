/** @format */

import React, { useState } from "react";
import { Image, ImageBackground, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppButton, Block, Text } from "../../common";
import { ButtonView, Loader, TextInputNative } from "../../components";
import { DATE_FORMAT, DATE_PICKER_TYPE, MIN_AGE } from "../../config/Constants";
import { UserUtil } from "../../dataUtils";
import { authUpdateProfile, getUserData } from "../../ducks/auth";
import { Colors, Images } from "../../theme";
import { DataHandler, ImagePicker, NavigationService, Util } from "../../utils";
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil";
import styles from "./styles";

const EditProfile = ({ navigation, route }: IsNavigationRequiredProps) => {
  const contactInfo = route?.params?.contactInfo ?? undefined;
  const userData = useSelector(getUserData);
  const dispatch = useDispatch();
  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear());
  const [code, setCode] = useState(UserUtil.phoneNumberCode(userData));
  const [isImage, setImage] = useState(UserUtil.image(userData));
  const [isImageFile, setImageFile] = useState<object>({});

  const [formObj, fullnameProps, emailProps, phoneNumberProps] = useHookForm(
    ["full_name", "email", "phone_number"],
    {
      full_name: UserUtil.full_name(userData),
      email: UserUtil.email(userData),
      phone_number: UserUtil.phoneNumberOnly(userData),
    },
    ValidationSchema.editProfile
  );

  const imgaePicker = () => {
    ImagePicker.showGalleryAndCameraOptions((val: any) => {
      ImagePicker.cropImage(val, {}, (cropImage: any) => {
        const { uri, fileName, type } = cropImage;
        const file = {
          uri: uri,
          name: fileName,
          type: type ?? "image/jpeg",
        };
        setImage(cropImage.uri);
        setImageFile(file);
      });
    });
  };

  const submit = formObj.handleSubmit((values) => {
    // Util.showCustomMessage(
    //   "The changes has been saved successfully!",
    //   "success"
    // );
    values.country_code = code;
    values.device_type = Util.getPlatform().toUpperCase();
    values.latitude = null;
    values.longitude = null;
    dispatch(
      authUpdateProfile.request({
        payloadApi: values,
        file: Util.isEmpty(isImageFile) ? undefined : isImageFile,
        cb: (data: any) => {
          NavigationService.goBack();
          Util.showCustomMessage(
            "The changes has been saved successfully!",
            "success"
          );
        },
      })
    );
  });

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={"handled"}
      bounces={false}
    >
      <Block paddingHorizontal={16}>
        <ButtonView
          style={styles.imageView}
          onPress={() => {
            imgaePicker();
          }}
        >
          <ImageBackground source={{ uri: isImage }} style={styles.imageStyle}>
            <Block style={styles.imageIcon}>
              <Image source={Images.icons.camIcon} />
            </Block>
          </ImageBackground>
          <Text
            medium
            size={14}
            color={Colors.APP_TEXT}
            style={styles.uploadText}
          >
            Upload Photo
          </Text>
        </ButtonView>
        <Block style={styles.textInputView}>
          <TextInputNative
            nextFocusRef={emailProps.forwardRef}
            title={"Full Name"}
            maxLength={100}
            customPlaceholder={"Your full name"}
            required
            {...fullnameProps}
          />
          <TextInputNative
            nextFocusRef={phoneNumberProps.forwardRef}
            title={"Email Address"}
            accessibilityLabel={"Email Field"}
            customPlaceholder={"Your email address"}
            keyboardType={"email-address"}
            maxLength={100}
            topSpaceLarge
            required
            backgroundColordefault={Colors.LIGHT_GREY}
            editable={false}
            {...emailProps}
          />
          <TextInputNative
            title={"Phone Number"}
            PhoneAccessibilityLabel={"Phone Number Field"}
            customPlaceholder={"XXX XXXXXXX"}
            maxLength={15}
            setCode={(e: any) => {
              setCode(`+${e.callingCode[0]}`);
            }}
            // code={code}
            topSpaceLarge
            required
            isPhoneInput={true}
            {...phoneNumberProps}
          />
        </Block>
      </Block>
      <Block style={[styles.bottomContainer]}>
        <AppButton
          title={"Update Profile"}
          onPress={() => {
            submit();
          }}
        />
      </Block>
      <Loader type={authUpdateProfile.type} />
    </ScrollView>
  );
};

export default EditProfile;
