/** @format */

import React, { useState } from "react";
import { Image, ImageBackground, ScrollView } from "react-native";
import { AccountCard, AppButton, Block, Seperator, Text } from "../../common";
import { ButtonView, Loader, TextInputNative } from "../../components";
import { Colors, Images, Metrics } from "../../theme";
import { DataHandler, ImagePicker, NavigationService, Util } from "../../utils";
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil";
import styles from "./styles";
import { chooseAccount } from "../../dummyData";
import { ContactDataUtil } from "../../dataUtils";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../ducks/auth";
import { editGroupDetail } from "../../ducks/contacts";

const EditGroup = ({ navigation, route }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch();
  const contactInfo = route?.params?.contactInfo ?? undefined;
  const userData = useSelector(getUserData);
  const [isImage, setImage] = useState("");
  const [event_id, setEventId] = useState(
    ContactDataUtil.events_for_edit(contactInfo)[0]?.id
  );
  const [isImageFile, setImageFile] = useState<any>(null);
  const [selectedIdentifier, setSelectedIdentifier] = useState<any>(
    ContactDataUtil.contacts(contactInfo).length > 0
      ? ContactDataUtil.contacts(contactInfo)
      : []
  );

  const [formObj, fullnameProps, eventTypeProps] = useHookForm(
    ["fullname", "eventType"],
    {
      fullname: ContactDataUtil.name(contactInfo),
      eventType: ContactDataUtil.events_for_edit(contactInfo)[0]?.title,
    },
    ValidationSchema.editGroup
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
    let contacts: any = [userData.id];
    let events: any = [];
    selectedIdentifier.map((item) => {
      return contacts.push(item.id);
    });
    if (event_id) {
      events.push(event_id);
    }
    console.log(userData);

    // dispatch(
    //   editGroupDetail.request({
    //     payloadApi: {
    //       name: values.fullname,
    //       events: events,
    //       contacts: contacts,
    //     },
    //     file: isImageFile,
    //     payload_id: ContactDataUtil.id(contactInfo),
    //     cb: () => {
    //       Util.showCustomMessage(
    //         "The changes has been saved successfully!",
    //         "success"
    //       );
    //       setTimeout(() => {
    //         NavigationService.goBack();
    //       }, 1000);
    //     },
    //   })
    // );
  });

  const callBack = (data: []) => {
    const newData = data.filter((newObj: any) => {
      return !selectedIdentifier.some(
        (existingObj) => existingObj.id === newObj.id
      );
    });
    setSelectedIdentifier([...selectedIdentifier, ...newData]);
    NavigationService.goBack();
  };

  const callback = (selected_id) => {
    setEventId(selected_id);
  };

  return (
    <>
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
                isImage != "" ? { uri: isImage } : { uri: contactInfo?.image }
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
              nextFocusRef={eventTypeProps.forwardRef}
              title={"Full Name"}
              maxLength={100}
              customPlaceholder={"Your group name"}
              requiredhange
              {...fullnameProps}
            />
            <TextInputNative
              title={"Event"}
              customPlaceholder={"Select Event"}
              onPress={(onChange) => {
                NavigationService.navigate("SaveEvents", {
                  isEditContact: true,
                  onChange: onChange,
                  callback: callback,
                });
              }}
              arrowDown
              {...eventTypeProps}
            />
          </Block>
          <Seperator single />
          <Text size={16} samiBold color={Colors.TITLE_TEXT}>
            {selectedIdentifier.length > 0
              ? `${selectedIdentifier.length} Members`
              : "0 Member"}
          </Text>
          <ButtonView
            onPress={() => {
              NavigationService.navigate("AddMembers", {
                heading: "Add Members",
                callBack: callBack,
              });
            }}
            style={styles.addButton}
          >
            <Block style={styles.addMemberButton}>
              <Image source={Images.icons.addIcon} style={styles.iconStyle} />
            </Block>
            <Text size={14} samiBold color={Colors.PRIMARY_PINK} left={10}>
              Add Member
            </Text>
          </ButtonView>
          <Block marginVertical={10}>
            <AccountCard
              rightIcon={Images.icons.crossIcon}
              imageStyle={styles.profileImageStyle}
              iconStyle={styles.rightIconStyle}
              disabled={true}
              showAdmin
              data={userData}
            />
            <Seperator single containerStyle={styles.seperatorStyle} />
            {selectedIdentifier.map((item, index) => {
              return (
                <Block key={index.toString()}>
                  <AccountCard
                    rightIcon={Images.icons.crossIcon}
                    imageStyle={styles.profileImageStyle}
                    iconStyle={styles.rightIconStyle}
                    disabled={true}
                    data={item}
                    onPress={() => {
                      DataHandler.getAlertModalRef().show({
                        title: "Remove Member",
                        description:
                          "Are you sure you want to remove this member?",
                        acceptTitle: "Remove",
                        callback: () => {
                          if (
                            selectedIdentifier.find((e) => e.id == item?.id)
                          ) {
                            const dummy = selectedIdentifier.filter(
                              (val) => val.id != item.id
                            );
                            setSelectedIdentifier([...dummy]);
                          }
                        },
                      });
                    }}
                  />
                  {selectedIdentifier.length - 1 != index && (
                    <Seperator single containerStyle={styles.seperatorStyle} />
                  )}
                </Block>
              );
            })}
          </Block>
        </Block>
      </ScrollView>
      <Block style={[styles.bottomContainer]}>
        <AppButton
          title={"Save"}
          onPress={() => {
            submit();
          }}
        />
      </Block>
      <Loader type={editGroupDetail.type} />
    </>
  );
};

export default EditGroup;
