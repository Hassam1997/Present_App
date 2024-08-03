/** @format */

import React, { useState } from "react";
import { Image, ScrollView } from "react-native";
import { AppButton, Block, Text } from "../../common";
import { ButtonView, Loader, TextInputNative } from "../../components";
import { DATE_FORMAT, DATE_PICKER_TYPE, MIN_AGE } from "../../config/Constants";
import { Colors, Images } from "../../theme";
import { DataHandler, ImagePicker, NavigationService, Util } from "../../utils";
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil";
import styles from "./styles";
import { authSignUp } from "../../ducks/auth";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("+1");
  const [isImage, setImage] = useState<string>("");
  const [isImageFile, setImageFile] = useState<object>({});

  const [
    formObj,
    full_nameProps,
    emailProps,
    phone_numberProps,
    passwordProps,
    confirmPasswordProps,
  ] = useHookForm(
    ["full_name", "email", "phone_number", "password", "confirmpassword"],
    {
      full_name: __DEV__ ? "Hi" : "",
      email: __DEV__ ? "email@email.com" : "",
      phone_number: __DEV__ ? "1234567890" : "",
      password: __DEV__ ? "Admin@123" : "",
      confirmpassword: __DEV__ ? "Admin@123" : "",
    },
    ValidationSchema.signUp
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

  const submit = formObj.handleSubmit((values: any) => {
    values.country_code = code;
    values.device_type = Util.getPlatform().toUpperCase();
    values.latitude = null;
    values.longitude = null;
    dispatch(
      authSignUp.request({
        payloadApi: values,
        file: isImageFile,
        cb: (data: any) => {
          NavigationService.navigate("OTPVerification", { data: values });
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
      <Text
        accessibilityLabel={"Signup Img"}
        medium
        size={14}
        color={Colors.TITLE_TEXT}
        style={styles.textStyle}
      >
        Let’s setup your account
      </Text>
      <ButtonView
        style={styles.imageView}
        onPress={() => {
          imgaePicker();
        }}
      >
        <Image
          style={styles.imageStyle}
          source={
            isImage != "" ? { uri: isImage } : Images.images.imagePlaceholder
          }
        />
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
          accessibilityLabel={"Fullname Field"}
          maxLength={100}
          customPlaceholder={"Your full name"}
          required
          {...full_nameProps}
        />
        <TextInputNative
          nextFocusRef={phone_numberProps.forwardRef}
          title={"Email Address"}
          accessibilityLabel={"Email Field"}
          customPlaceholder={"Your email address"}
          keyboardType={"email-address"}
          maxLength={100}
          topSpaceLarge
          required
          {...emailProps}
        />
        <TextInputNative
          nextFocusRef={passwordProps.forwardRef}
          title={"Phone Number"}
          PhoneAccessibilityLabel={"Phone Number Field"}
          customPlaceholder={"XXX XXXXXXX"}
          maxLength={15}
          setCode={(e: any) => {
            setCode("+" + e.callingCode[0]);
          }}
          topSpaceLarge
          required
          isPhoneInput={true}
          {...phone_numberProps}
        />
        <TextInputNative
          nextFocusRef={confirmPasswordProps.forwardRef}
          title={"Password"}
          accessibilityLabel={"Password Field"}
          maxLength={100}
          customPlaceholder={"Your new password"}
          topSpaceLarge
          secureTextEntry
          required
          {...passwordProps}
        />
        <TextInputNative
          returnKeyType={"done"}
          title={"Confirm Password"}
          accessibilityLabel={"Confirm Password Field"}
          maxLength={100}
          customPlaceholder={"Re-enter your new password"}
          topSpaceLarge
          secureTextEntry
          required
          {...confirmPasswordProps}
        />
      </Block>
      <AppButton
        title="Sign Up"
        accessibilityLabel={"Signup btn"}
        containerStyle={styles.btnStyle}
        onPress={() => {
          submit();
        }}
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
      <Loader type={authSignUp.type} />
    </ScrollView>
  );
};

export default SignUp;
