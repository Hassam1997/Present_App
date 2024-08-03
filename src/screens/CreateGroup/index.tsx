/** @format */

import React, { useState } from "react";
import { FlatList, Image, ImageBackground, ScrollView } from "react-native";
import { AppButton, Block, Text } from "../../common";
import {
  ButtonView,
  ImageView,
  Loader,
  TextInputNative,
} from "../../components";
import { DATE_FORMAT, DATE_PICKER_TYPE, MIN_AGE } from "../../config/Constants";
import { Colors, Images } from "../../theme";
import { DataHandler, ImagePicker, NavigationService, Util } from "../../utils";
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil";
import styles from "./styles";
import { ContactDataUtil } from "../../dataUtils";
import { useDispatch } from "react-redux";
import { createGroup } from "../../ducks/contacts";

const CreateGroup = ({ navigation, route }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch();
  const contactInfo = route?.params?.contactInfo ?? undefined;
  const data = route?.params?.data ?? [];
  const [selectedIdentifier, setSelectedIdentifier] =
    useState<{ title: string; image: object; id: number }[]>(data);
  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear());
  const [code, setCode] = useState(null);
  const [isImage, setImage] = useState("");
  const [isImageFile, setImageFile] = useState<any>(null);

  const [formObj, groupNameProps] = useHookForm(
    ["groupname"],
    {
      groupname: __DEV__ ? contactInfo?.title : "",
    },
    ValidationSchema.createNewGroup
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
    let contacts: any = [];
    selectedIdentifier.map((item) => {
      return contacts.push(item.id);
    });
    dispatch(
      createGroup.request({
        payloadApi: {
          name: values.groupname,
          contacts: contacts,
        },
        file: isImageFile,
        cb: () => {
          Util.showCustomMessage(
            "The group has been saved successfully!",
            "success"
          );
          setTimeout(() => {
            NavigationService.popToTop();
          }, 500);
        },
      })
    );
  });

  const renderItem = ({ item, index }: RenderItemProps) => {
    return (
      <Block style={styles.imageSliderView}>
        {/* <Image source={item.image} style={styles.imageViewStyle} /> */}
        <ImageView
          source={{ uri: ContactDataUtil.image(item) }}
          style={styles.imageViewStyle}
          placeholderStyle={styles.imageViewStyle}
          borderRadius={50}
        />
        <ButtonView
          onPress={() => {
            if (selectedIdentifier.find((e) => e.id == item?.id)) {
              const dummy = selectedIdentifier.filter(
                (val) => val.id != item.id
              );
              setSelectedIdentifier([...dummy]);
            }
          }}
        >
          <Image
            source={Images.icons.crossIcon}
            style={styles.crossIconStyle}
          />
        </ButtonView>
        <Text p size={14} color={Colors.TITLE_TEXT}>
          {ContactDataUtil.edit_name(item)}
        </Text>
      </Block>
    );
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
            <Image
              style={styles.imageStyle}
              source={
                isImage != ""
                  ? { uri: isImage }
                  : Images.images.imagePlaceholder
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
              title={"Group Name"}
              maxLength={100}
              customPlaceholder={"Your group name"}
              required
              {...groupNameProps}
            />
          </Block>
          <Text samiBold size={12} color={Colors.TITLE_TEXT} marginTop={16}>
            Members
          </Text>
          <FlatList
            data={selectedIdentifier}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <Block width={15} />}
          />
          <ButtonView
            onPress={() => {
              NavigationService.goBack();
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
        </Block>
        <Block style={[styles.bottomContainer]}>
          <AppButton
            title={"Create"}
            onPress={() => {
              submit();
            }}
          />
        </Block>
      </ScrollView>
      <Loader type={createGroup.type} />
    </>
  );
};

export default CreateGroup;
