/** @format */

import React, { useRef, useState } from "react";
import { Image, ScrollView } from "react-native";
import { AppButton, Block, Text } from "../../common";
import { ButtonView, Loader, TextInputNative } from "../../components";
import { DATE_PICKER_TYPE, DATE_SERVER_FORMAT } from "../../config/Constants";
import { Colors, Images } from "../../theme";
import { DataHandler, ImagePicker, NavigationService, Util } from "../../utils";
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil";
import styles from "./styles";
import { GENDER } from "../../data";
import { InterestsModal } from "../../modal";
import { useDispatch } from "react-redux";
import { addContact, getRelations } from "../../ducks/contacts";

const AddContact = () => {
  const dispatch = useDispatch();
  const interestsModalRef = useRef<any>();
  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear());
  const [interests, setInterests] = useState([]);
  const [interestsID, setInterestsID] = useState([]);
  const [relationData, setRelations] = useState(null);
  const [genderData, setGender] = useState(null);
  const [isImage, setImage] = useState("");
  const [isImageFile, setImageFile] = useState<any>(null);

  const [
    formObj,
    fullnameProps,
    dobProps,
    interestsProps,
    relationsProps,
    genderProps,
  ] = useHookForm(
    ["fullname", "dob", "interests", "relations", "gender"],
    {},
    ValidationSchema.addContact
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
        setImageFile(file);
        setImage(cropImage.uri);
      });
    });
  };

  const showDatePicker = (onChange: any) => {
    DataHandler.getDatePickerModalRef().show({
      mode: DATE_PICKER_TYPE.DATE,
      isMaximum: true,
      isMinimum: false,
      onSelected: (date: any) => {
        const formattedDate = Util.formatDate(date, DATE_SERVER_FORMAT);
        onChange(formattedDate);
      },
      extraProps: {
        minimumDate: Util.stringToDateObject("1900-01-01"),
        maximumDate: maxDate,
      },
    });
  };

  const submit = formObj.handleSubmit((values) => {
    dispatch(
      addContact.request({
        payloadApi: {
          full_name: values.fullname,
          dob: values.dob,
          interests: interestsID,
          relation: relationData,
          gender: genderData,
        },
        file: isImageFile,
        cb: () => {
          Util.showCustomMessage(
            "The contact has been saved successfully!",
            "success"
          );
          setTimeout(() => {
            NavigationService.goBack();
          }, 1000);
        },
      })
    );
  });

  const genderPicker = (onChange: (selectedEvent: any) => void) => {
    DataHandler.getBottomSheetModalRef().show({
      title: "Select Gender",
      dataSet: GENDER,
      callback: (selectedEvent: any) => {
        onChange(selectedEvent.title);
        setGender(selectedEvent.identifier);
      },
    });
  };

  function filterObjectsById(ids, objects) {
    return objects.filter((obj) => ids.includes(obj.id));
  }

  const interestsPicker = (onChange: (selectedEvent: any) => void) => {
    interestsModalRef?.current?.show({
      callback: (data, listdata) => {
        const newArray = filterObjectsById(data, listdata);
        setInterests(newArray);
        setInterestsID(data);
      },
    });
  };

  const relationPicker = (onChange: (selectedEvent: any) => void, data) => {
    DataHandler.getBottomSheetModalRef().show({
      title: "Select Relation",
      dataSet: data,
      callback: (selectedEvent: any) => {
        onChange(selectedEvent.name);
        setRelations(selectedEvent.id);
      },
    });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={"handled"}
      bounces={false}
    >
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
          title={"Full Name"}
          maxLength={100}
          customPlaceholder={"Your full name"}
          required
          {...fullnameProps}
        />
        <TextInputNative
          nextFocusRef={interestsProps.forwardRef}
          title={"Date of Birth"}
          accessibilityLabel={"Age Field"}
          customPlaceholder={"Select date"}
          rightIcon={Images.icons.calendar1}
          onPress={(onChange) => {
            showDatePicker(onChange);
          }}
          arrowDown
          {...dobProps}
        />
        <TextInputNative
          title={"Interests"}
          customPlaceholder={"Select interests"}
          rightIcon={Images.icons.arrowDownIcon}
          onPress={(onChange) => {
            interestsPicker(onChange);
          }}
          arrowDown
          {...interestsProps}
        />
        {interests.length > 0 && (
          <Block style={styles.interestBlock}>
            {interests.map((item: any) => {
              return (
                <Block style={styles.interestMetaBlock}>
                  <Text>{item.name}</Text>
                </Block>
              );
            })}
          </Block>
        )}
        <TextInputNative
          title={"Relation"}
          customPlaceholder={"Select relation"}
          rightIcon={Images.icons.arrowDownIcon}
          onPress={(onChange) => {
            dispatch(
              getRelations.request({
                cb: (data) => {
                  setTimeout(() => {
                    relationPicker(onChange, data);
                  }, 200);
                },
              })
            );
          }}
          required
          arrowDown
          {...relationsProps}
        />
        <TextInputNative
          title={"Gender"}
          customPlaceholder={"Select gender"}
          rightIcon={Images.icons.arrowDownIcon}
          onPress={(onChange) => {
            genderPicker(onChange);
          }}
          arrowDown
          {...genderProps}
        />
      </Block>
      <AppButton
        title="Save"
        containerStyle={styles.btnStyle}
        onPress={() => {
          submit();
        }}
      />
      <InterestsModal ref={interestsModalRef} />
      <Loader type={[getRelations.type, addContact.type]} />
    </ScrollView>
  );
};

export default AddContact;
