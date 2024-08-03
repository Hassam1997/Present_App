/** @format */

import React, { useState } from "react";
import { Image, ScrollView } from "react-native";
import {
  AccountCard,
  AppButton,
  Block,
  GiftCard,
  Seperator,
  Text,
} from "../../common";
import { ButtonView, Loader, TextInputNative } from "../../components";
import { DATE_FORMAT, DATE_PICKER_TYPE } from "../../config/Constants";
import { GROUP_EDIT_MODAL_OPTIONS } from "../../data";
import { MyGiftsData } from "../../dummyData";
import { Colors, Fonts, Images, Metrics } from "../../theme";
import { DataHandler, NavigationService, Util } from "../../utils";
import { headerRightImage, title } from "../../utils/NavigatorHelper";
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil";
import styles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getSpecificGroup,
  registryCreateGroup,
  registryDeleteGroup,
  registryEditGroup,
  registryGiftingGroup,
  registryRemoveGroupProducts,
  registrySpecificGiftingGroup,
} from "../../ducks/myregistery";
import { DATE_SERVER_FORMAT } from "../../config/Constants";
import { MyRegistryUtil } from "../../dataUtils";

const GroupPurchase = ({ route, navigation }: IsRouteRequiredProps) => {
  const dispatch = useDispatch();
  const isEdit = route?.params?.isEdit ?? false;
  const isGiftSelected = route?.params?.isGiftSelected ?? false;
  const isActive = route?.params?.isActive ?? false;
  const isPast = route?.params?.isPast ?? false;
  const groupData = route?.params?.groupData ?? {};
  const editGroupData = useSelector(
    getSpecificGroup(`${MyRegistryUtil.id(groupData)}`)
  );
  const headerTitle = route?.params?.headerTitle ?? "";
  React.useLayoutEffect(() => {
    {
      isEdit &&
        navigation.setOptions({
          ...title(`Edit ${headerTitle}`, 17, Fonts.manrope.bold, true),
          ...headerRightImage(
            () => {
              DataHandler.getBottomSheetModalRef().show({
                title: "Select Option",
                dataSet: GROUP_EDIT_MODAL_OPTIONS,
                callback: (e: any) => {
                  switch (e.identifier) {
                    case "GROUPLINK":
                      Util.onShare("Share", "Share");
                      break;
                    case "DELETEGROUP":
                      DataHandler.getAlertModalRef().show({
                        title: "Delete Group",
                        description:
                          "Are you sure you want to delete this group?",
                        acceptTitle: "Delete",
                        callback: () => {
                          dispatch(
                            registryDeleteGroup.request({
                              payloadApi: {
                                id: MyRegistryUtil.id(groupData),
                              },
                              cb: () => {
                                NavigationService.reset("HomeScreen");
                              },
                            })
                          );
                        },
                      });
                      break;
                    default:
                  }
                },
              });
            },
            Images.icons.threeDotIcon,
            styles.iconImageStyleHeader
          ),
        });
    }
  }, [navigation]);

  const [selectedIdentifier, setSelectedIdentifier] = useState<
    { title: string; image: object; id: number; isAdmin?: boolean }[]
  >([
    {
      title: "Gretchen Siphron",
      image: Images.images.careprovider,
      id: 0,
      isAdmin: true,
    },
    {
      title: "Gretchen Siphron",
      image: Images.images.careprovider,
      id: 1,
      isAdmin: false,
    },
    {
      title: "Gretchen Siphron",
      image: Images.images.careprovider,
      id: 2,
      isAdmin: false,
    },
  ]);
  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear());

  const onGiftCrossPress = (item: any) => {
    DataHandler.getAlertModalRef().show({
      title: "Remove Gift",
      description: "Are you sure you want to remove this gift?",
      acceptTitle: "Delete",
      callback: () => {
        dispatch(
          registryRemoveGroupProducts.request({
            payloadApi: {
              product_id: item?.id,
              platform: item?.platform,
              group_id: MyRegistryUtil.id(groupData),
            },
            cb: () => {
              dispatch(
                registrySpecificGiftingGroup.request({
                  payloadApi: {
                    id: MyRegistryUtil.id(groupData),
                  },
                  identifier: MyRegistryUtil.id(groupData),
                })
              );
            },
          })
        );
      },
    });
  };

  const [
    formObj,
    titleProps,
    deadlineProps,
    total_amountProp,
    groupGiftLinkProp,
  ] = useHookForm(
    ["title", "deadline", "total_amount", "groupGiftLink"],
    isEdit
      ? {
          title: MyRegistryUtil.title(editGroupData),
          deadline: MyRegistryUtil.deadline(editGroupData),
          total_amount: `${MyRegistryUtil.total_amount(editGroupData)}`,
        }
      : {},
    ValidationSchema.createGroup
  );

  const showDatePicker = (onChange: any) => {
    DataHandler.getDatePickerModalRef().show({
      mode: DATE_PICKER_TYPE.DATE,
      // isMaximum: true,
      isMinimum: false,
      onSelected: (date: any) => {
        const formattedDate = Util.formatDate(date, DATE_SERVER_FORMAT);
        onChange(formattedDate);
      },
      extraProps: {
        minimumDate: new Date(),
        //maximumDate: maxDate,
      },
    });
  };

  const onCrossPress = () => {
    DataHandler.getAlertModalRef().show({
      title: "Remove Gift",
      description: "Are you sure you want to remove this gift?",
      acceptTitle: "Delete",
      callback: () => {
        NavigationService.popToTop();
      },
    });
  };

  const onGiftPress = (item: any) => {
    NavigationService.navigate("ProductDetail", { isCustomised: true });
  };

  const submit = formObj.handleSubmit((values) => {
    if (isEdit) {
      let member: any = [];
      MyRegistryUtil.members(editGroupData).map((item) => {
        member.push(item.id);
      });
      values.members = member;
      dispatch(
        registryEditGroup.request({
          payloadApi: values,
          id: MyRegistryUtil.id(groupData),
          cb: () => {
            dispatch(
              registrySpecificGiftingGroup.request({
                payloadApi: {
                  id: MyRegistryUtil.id(groupData),
                },
                identifier: MyRegistryUtil.id(groupData),
                cb: () => {
                  NavigationService.goBack();
                },
              })
            );
          },
        })
      );
    } else {
      values.products = [];
      dispatch(
        registryCreateGroup.request({
          payloadApi: values,
          cb: () => {
            dispatch(
              registryGiftingGroup.request({
                payloadApi: {},
                reset: true,
                cb: () => {
                  setTimeout(() => {
                    Util.showCustomMessage(
                      "Group created successfully!",
                      "success"
                    );
                  }, 300);
                  NavigationService.goBack();
                },
              })
            );
          },
        })
      );
    }
  });

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
        bounces={false}
      >
        {(isEdit || isGiftSelected) && (
          <>
            {MyRegistryUtil.products(editGroupData).length > 0 && (
              <>
                {MyRegistryUtil.products(editGroupData).map((item) => {
                  return (
                    <>
                      <Block paddingHorizontal={Metrics.ratio(16)}>
                        <GiftCard
                          onCrossPress={onGiftCrossPress}
                          item={item}
                          isCross={!isActive}
                          onPress={onGiftPress}
                          isStar={false}
                          showStatus
                          isActive={isActive}
                          isPast={isPast}
                        />
                      </Block>
                      <Seperator
                        single
                        containerStyle={styles.seperatorStyle}
                      />
                    </>
                  );
                })}
              </>
            )}
          </>
        )}
        <Block style={styles.textInputView}>
          <TextInputNative
            nextFocusRef={total_amountProp.forwardRef}
            title={"Title"}
            accessibilityLabel={"Title Field"}
            maxLength={100}
            customPlaceholder={"Enter title"}
            required
            {...titleProps}
          />
          <TextInputNative
            title={"Deadline"}
            accessibilityLabel={"date Field"}
            customPlaceholder={"Select date"}
            rightIcon={Images.icons.calendar1}
            onPress={(onChange) => {
              showDatePicker(onChange);
            }}
            required
            arrowDown
            {...deadlineProps}
          />
          <TextInputNative
            nextFocusRef={groupGiftLinkProp.forwardRef}
            title={"Total Amount"}
            accessibilityLabel={"Total amount Field"}
            maxLength={10}
            keyboardType={"number-pad"}
            customPlaceholder={"Enter total amount"}
            {...total_amountProp}
          />
          {/* {!isEdit && (
            <Block row bottom>
              <Block flex={1}>
                <TextInputNative
                  title={"Group Gift Link"}
                  accessibilityLabel={"Group Gift Link Field"}
                  maxLength={100}
                  customPlaceholder={"Enter Group Gift Link"}
                  required
                  editable={false}
                  {...groupGiftLinkProp}
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
          )} */}
        </Block>

        {isEdit && (
          <Block paddingTop={10}>
            <Text size={12} samiBold color={Colors.TITLE_TEXT}>
              {"Members"}
            </Text>
            <Block marginVertical={10}>
              {MyRegistryUtil.members(editGroupData).map((item, index) => {
                return (
                  <Block key={index.toString()}>
                    <AccountCard
                      rightIcon={Images.icons.crossIcon}
                      imageStyle={styles.profileImageStyle}
                      iconStyle={styles.rightIconStyle}
                      disabled={true}
                      showAdmin={MyRegistryUtil.is_admin(item)}
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
                      <Seperator
                        single
                        containerStyle={styles.seperatorStyle}
                      />
                    )}
                  </Block>
                );
              })}
            </Block>
          </Block>
        )}
      </ScrollView>
      <AppButton
        title={isEdit ? "Save" : "Create Group"}
        accessibilityLabel={"Group btn"}
        containerStyle={styles.btnStyle}
        onPress={submit}
      />
      <Loader
        type={[
          registryCreateGroup.type,
          registryGiftingGroup.type,
          registryEditGroup.type,
          registryDeleteGroup.type,
          registryRemoveGroupProducts.type,
        ]}
      />
    </>
  );
};

export default GroupPurchase;
