/** @format */

import React, { useState } from "react";
import { Image, ScrollView } from "react-native";
import { AppButton, Block, Text } from "../../common";
import { ButtonView, Loader, TextInputNative } from "../../components";
import {
  DATE_FORMAT,
  DATE_PICKER_TYPE,
  DATE_SERVER_FORMAT,
} from "../../config/Constants";
import { Colors, Fonts, Images } from "../../theme";
import { DataHandler, ImagePicker, NavigationService, Util } from "../../utils";
import { title } from "../../utils/NavigatorHelper";
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { authJuniorSignUp } from "../../ducks/auth";

const JuniorSignUp = ({ route, navigation }: IsRouteRequiredProps) => {
  const dispatch = useDispatch();
  const headerTitle = route?.params?.headerTitle ?? "Create a profile";
  const returnJunior = route?.params?.returnJunior ?? false;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...title(headerTitle, 17, Fonts.manrope.bold, true),
    });
  }, [navigation]);

  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear());
  const [isImage, setImage] = useState<string>("");
  const [isImageFile, setImageFile] = useState<object>({});

  const [formObj, full_nameProps, dobProps] = useHookForm(
    ["full_name", "dob"],
    {
      full_name: __DEV__ ? "my kid" : "",
      dob: __DEV__ ? "12/03/2009" : "",
    },
    ValidationSchema.juniorSignUp
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

  const showDatePicker = (onChange: any) => {
    console.log(
      Util.formatDate2(
        formObj.getValues()?.dob,
        DATE_SERVER_FORMAT,
        DATE_FORMAT
      )
    );
    DataHandler.getDatePickerModalRef().show({
      mode: DATE_PICKER_TYPE.DATE,
      isMaximum: true,
      isMinimum: false,
      onSelected: (date: any) => {
        const formattedDate = Util.formatDate(date, DATE_SERVER_FORMAT);
        onChange(formattedDate);
      },
      date: formObj.getValues()?.dob
        ? Util.formatDate2(
            formObj.getValues()?.dob,
            DATE_SERVER_FORMAT,
            DATE_FORMAT
          )
        : maxDate,
      extraProps: {
        minimumDate: Util.stringToDateObject("1900-01-01"),
        maximumDate: maxDate,
      },
    });
  };

  const submit = formObj.handleSubmit((values: any) => {
    dispatch(
      authJuniorSignUp.request({
        payloadApi: values,
        file: isImageFile,
        cb: (data: any) => {
          NavigationService.navigate("AccountVerified", {
            isJunior: true,
            returnJunior: returnJunior,
          });
        },
      })
    );
  });

  const [date, setDate] = useState("");

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={"handled"}
      bounces={false}
    >
      <Text p size={14} color={Colors.TITLE_TEXT} style={styles.textStyle}>
        We will try to customize the app for your child. Only you and your child
        can see this information.
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
          nextFocusRef={dobProps.forwardRef}
          title={"Kid’s Full Name"}
          accessibilityLabel={"Fullname Field"}
          maxLength={100}
          customPlaceholder={"Your full name"}
          required
          {...full_nameProps}
        />
        <TextInputNative
          title={"Date of Birth"}
          accessibilityLabel={"Age Field"}
          customPlaceholder={"YYYY-MM-DD"}
          rightIcon={Images.icons.calendar1}
          // onPress={(onChange) => {
          //   showDatePicker(onChange);
          // }}
          maxLength={10}
          required
          arrowDown
          {...dobProps}
        />
      </Block>
      <AppButton
        title="Create"
        accessibilityLabel={"Signup btn"}
        containerStyle={styles.btnStyle}
        onPress={() => {
          submit();
        }}
      />
      <Loader type={authJuniorSignUp.type} />
    </ScrollView>
  );
};

export default JuniorSignUp;
