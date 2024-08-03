/** @format */

import React, { useRef, useState } from "react";
import { Image, ImageBackground, ScrollView } from "react-native";
import { AppButton, Block, Text } from "../../common";
import { ButtonView, TextInputNative } from "../../components";
import { DATE_PICKER_TYPE, DATE_SERVER_FORMAT } from "../../config/Constants";
import { Colors, Images } from "../../theme";
import { DataHandler, ImagePicker, NavigationService, Util } from "../../utils";
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil";
import styles from "./styles";
import { GENDER } from "../../data";
import { InterestsModal } from "../../modal";
import { ContactDataUtil } from "../../dataUtils";
import { useDispatch } from "react-redux";
import { editContact, getRelations } from "../../ducks/contacts";

const EditContact = ({ navigation, route }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch();
  const contactInfo = route?.params?.contactInfo ?? undefined;
  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear());
  const [interests, setInterests] = useState(
    ContactDataUtil.interests(contactInfo)
  );
  const [interestsID, setInterestsID] = useState([]);
  const [isImage, setImage] = useState("");
  const interestsModalRef = useRef<any>();
  const [isImageFile, setImageFile] = useState<any>(null);
  const [genderData, setGender] = useState(
    ContactDataUtil.gender(contactInfo) == "Female" ? "F" : "M"
  );
  const [relationData, setRelations] = useState(
    ContactDataUtil.relation_id(contactInfo)
  );

  const [
    formObj,
    fullnameProps,
    dobProps,
    interestsProps,
    relationsProps,
    genderProps,
  ] = useHookForm(
    ["fullname", "dob", "interests", "relations", "gender"],
    {
      fullname: ContactDataUtil.name(contactInfo),
      dob: ContactDataUtil.date_of_birth(contactInfo),
      interests: "",
      relations: ContactDataUtil.relations(contactInfo),
      gender: ContactDataUtil.gender(contactInfo),
    },
    ValidationSchema.editContact
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
      interestsID: interestsID,
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

  const submit = formObj.handleSubmit((values) => {
    let interest: any = [];
    interests.map((item) => {
      return interest.push(item.id);
    });
    dispatch(
      editContact.request({
        payloadApi: {
          full_name: values.fullname,
          dob: values.dob,
          interests: interest,
          relation: relationData,
          gender: genderData,
        },
        file: isImageFile,
        payload_id: ContactDataUtil.id(contactInfo),
        cb: () => {
          Util.showCustomMessage(
            "The changes has been saved successfully!",
            "success"
          );
          setTimeout(() => {
            NavigationService.goBack();
          }, 1000);
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
          <ImageBackground
            source={
              isImage != ""
                ? { uri: isImage }
                : { uri: ContactDataUtil.image(contactInfo) }
            }
            style={styles.imageStyle}
          >
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
            nextFocusRef={dobProps.forwardRef}
            title={"Full Name"}
            maxLength={100}
            customPlaceholder={"Your full name"}
            required
            {...fullnameProps}
          />
          <TextInputNative
            title={"Date of Birth"}
            customPlaceholder={"Enter your date of birth"}
            rightIcon={Images.icons.calendar1}
            onPress={(onChange) => {
              showDatePicker(onChange);
            }}
            required
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
              {interests.map((item) => {
                return (
                  <Block style={styles.interestMetaBlock}>
                    <Text>{item.name ?? item}</Text>
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
      </Block>
      <Block style={[styles.bottomContainer]}>
        <AppButton
          title={"Save"}
          onPress={() => {
            submit();
          }}
        />
      </Block>
      <InterestsModal ref={interestsModalRef} />
    </ScrollView>
  );
};

export default EditContact;
