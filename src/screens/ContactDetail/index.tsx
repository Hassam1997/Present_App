/** @format */

import React, { useState } from "react";
import {
  Block,
  GiftCard,
  Groups,
  SavedGifts,
  Seperator,
  Text,
} from "../../common";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../theme";
import { ButtonView, ImageView, Loader } from "../../components";
import { Image, ScrollView, View } from "react-native";
import { DataHandler, NavigationService, Util } from "../../utils";
import { headerRightImage } from "../../utils/NavigatorHelper";
import { CONTACTS_FUNCTIONS, CONTACTS_OPTIONS } from "../../data";
import { SELECT_GROUPS } from "../../dummyData";
import { ContactDataUtil, EventsDataUtil } from "../../dataUtils";
import {
  contactGetDetail,
  deleteContact,
  editContact,
  getSpecificContactDetail,
} from "../../ducks/contacts";
import ScrollViewApi from "../../components/ScrollViewApi";
import { EVENTS_DAY_FORMAT, EVENT_TYPES } from "../../config/Constants";
import { useDispatch } from "react-redux";
import { registryStarredGifts } from "../../ducks/myregistery";

const ContactDetail = ({ navigation, route }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch();
  const contactInfo = route?.params?.data ?? undefined;
  const [url, setURL] = useState<string>("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...headerRightImage(() => {
        DataHandler.getBottomSheetModalRef().show({
          title: "Select Option",
          dataSet: CONTACTS_FUNCTIONS,
          callback: (e: any) => {
            switch (e.identifier) {
              case "DELETE":
                DataHandler.getAlertModalRef().show({
                  title: "Delete Contact",
                  description: "Are you sure you want to delete this contact?",
                  acceptTitle: "Delete",
                  callback: () => {
                    dispatch(
                      deleteContact.request({
                        payloadApi: {
                          id: ContactDataUtil.id(contactInfo),
                        },
                        cb: () => {
                          Util.showCustomMessage(
                            "The contact has been deleted successfully!",
                            "success"
                          );
                          NavigationService.reset("HomeScreen", {
                            screen: "Contacts",
                          });
                        },
                      })
                    );
                  },
                });
                break;
              case "ADD":
                NavigationService.navigate("AddGroup", {
                  id: ContactDataUtil.id(contactInfo),
                });
                break;
              default:
            }
          },
        });
      }, Images.icons.threeDotIcon),
    });
  }, []);

  const getSearch = () => {
    return SELECT_GROUPS;
  };

  const callBack = (url: string) => {
    setURL(url);
    setTimeout(() => {
      NavigationService.goBack();
    }, 100);
  };

  const urlModal = (data) => {
    DataHandler.getBottomSheetModalRef().show({
      title: "Select Option",
      dataSet: CONTACTS_OPTIONS,
      callback: (e: any) => {
        switch (e.identifier) {
          case "DELETE":
            DataHandler.getAlertModalRef().show({
              title: "Delete URL",
              description: "Are you sure you want to delete this url?",
              acceptTitle: "Delete",
              callback: () => {
                dispatch(
                  editContact.request({
                    payloadApi: {
                      url: null,
                    },
                    payload_id: ContactDataUtil.id(contactInfo),
                    cb: () => {
                      Util.showCustomMessage(
                        "The url has been deleted successfully!",
                        "success"
                      );
                    },
                  })
                );
                NavigationService.goBack();
              },
            });
            break;
          case "EDIT":
            NavigationService.navigate("SaveURL", {
              callBack: callBack,
              id: ContactDataUtil.id(contactInfo),
              data: data,
            });
            break;
          default:
        }
      },
    });
  };

  const onStarPress = (item: ItemProps) => {
    dispatch(
      registryStarredGifts.request({
        payloadApi: {
          saved_type: item?.saved_type,
          model_id: item?.model_id,
          product_id: item?.id,
        },
        identifier: "mygifts",
        cb: () => {
          dispatch(
            contactGetDetail.request({
              payloadApi: {
                id: ContactDataUtil.id(contactInfo),
              },
              identifier: ContactDataUtil.id(contactInfo),
              cb: () => {},
            })
          );
        },
      })
    );
  };

  const renderContent = (data) => {
    return (
      <>
        <Block row align marginTop={16} paddingHorizontal={Metrics.ratio(16)}>
          <ImageView
            source={{ uri: ContactDataUtil.image(data) }}
            style={styles.imageView}
            placeholderStyle={styles.imageView}
            borderRadius={40}
          />
          <Block marginLeft={14}>
            <Text size={16} samiBold color={Colors.TITLE_TEXT}>
              {ContactDataUtil.name(data)}
            </Text>
            <ButtonView
              style={styles.editButtonView}
              onPress={() => {
                NavigationService.navigate("EditContact", {
                  contactInfo: data,
                });
              }}
            >
              <Image
                source={Images.icons.editIcon}
                style={styles.editIconStyle}
              />
              <Text size={13} medium color={Colors.PRIMARY_PINK} left={6}>
                Edit Info
              </Text>
            </ButtonView>
          </Block>
        </Block>
        {ContactDataUtil.url(data) != undefined ? (
          <>
            <Text
              size={14}
              samiBold
              color={Colors.TITLE_TEXT}
              marginHorizontal={Metrics.ratio(16)}
              marginTop={20}
            >
              URL
            </Text>
            <Block style={styles.giftCardButton}>
              <Block row align>
                <Block style={styles.giftBoxStyle}>
                  <Image source={Images.icons.giftBoxIcon} />
                </Block>
                <Text
                  samiBold
                  size={12}
                  color={Colors.TITLE_TEXT}
                  numberOfLines={3}
                  left={13}
                >
                  {ContactDataUtil.url(data)}
                </Text>
              </Block>
              <ButtonView
                onPress={() => {
                  urlModal(data);
                }}
                style={styles.threeDotStyle}
              >
                <Image source={Images.icons.threeDotIcon} />
              </ButtonView>
            </Block>
          </>
        ) : (
          <ButtonView
            onPress={() => {
              NavigationService.navigate("SaveURL", {
                callBack: callBack,
                id: ContactDataUtil.id(contactInfo),
                data: contactInfo,
              });
            }}
            style={styles.addButton}
          >
            <Text size={14} samiBold color={Colors.PRIMARY_PINK}>
              + Save URL
            </Text>
          </ButtonView>
        )}
        <Seperator single containerStyle={styles.seperatorStyle} />
        <Text
          size={14}
          samiBold
          color={Colors.TITLE_TEXT}
          marginHorizontal={Metrics.ratio(16)}
        >
          Groups
        </Text>
        <Block style={styles.contactGroupStyle}>
          {ContactDataUtil.groups(data).length > 0 ? (
            <>
              {ContactDataUtil.groups(data).map((item, index) => {
                return (
                  <>
                    <ButtonView debounceTime={0} onPress={() => {}}>
                      <View pointerEvents="none" style={styles.cardView}>
                        <Block row align>
                          <ImageView
                            source={{ uri: ContactDataUtil.image(item) }}
                            style={styles.avatarStyle}
                            placeholderStyle={styles.avatarStyle}
                            borderRadius={50}
                          />
                          <Block>
                            <Text
                              left={14}
                              medium
                              size={14}
                              color={Colors.TITLE_TEXT}
                            >
                              {ContactDataUtil.name(item)}
                            </Text>
                            {item.type && (
                              <Text
                                left={14}
                                medium
                                size={14}
                                color={Colors.TITLE_TEXT}
                              >
                                {item.type}
                              </Text>
                            )}
                          </Block>
                        </Block>
                      </View>
                    </ButtonView>
                    {ContactDataUtil.groups(data).length - 1 == index ? null : (
                      <Seperator single={true} />
                    )}
                  </>
                );
              })}
            </>
          ) : (
            <Block>
              <Text>No Group Available</Text>
            </Block>
          )}
        </Block>
        <Seperator single containerStyle={styles.seperatorStyle} />
        {ContactDataUtil.events(data).length > 0 && (
          <>
            <Text
              size={14}
              samiBold
              color={Colors.TITLE_TEXT}
              marginHorizontal={Metrics.ratio(16)}
            >
              Events
            </Text>
            {ContactDataUtil.events(data).map((item, index) => {
              const isGeneralType =
                EventsDataUtil.event_type(item) === EVENT_TYPES.GENERAL;
              return (
                <>
                  <Text
                    size={14}
                    samiBold
                    color={Colors.TITLE_TEXT}
                    marginHorizontal={Metrics.ratio(16)}
                    marginTop={10}
                  >
                    {Util.formatDate(
                      ContactDataUtil.date(item),
                      EVENTS_DAY_FORMAT
                    )}
                  </Text>
                  <Block
                    style={
                      isGeneralType
                        ? styles.categoryContainerBlue
                        : styles.categoryContainerPink
                    }
                  >
                    <Image
                      resizeMode="contain"
                      source={
                        isGeneralType
                          ? Images.icons.calendar2
                          : Images.icons.calendarCustomized
                      }
                    />
                    <Text style={styles.categoryText}>
                      {ContactDataUtil.title(item)}
                    </Text>
                  </Block>
                  <Block marginHorizontal={16}>
                    {ContactDataUtil.products(item).length > 0 && (
                      <>
                        {ContactDataUtil.products(item).map((item, index) => {
                          return (
                            <>
                              <GiftCard
                                item={item}
                                onPress={() => {}}
                                onStarPress={(e) => {
                                  onStarPress(e);
                                }}
                                category={false}
                              />
                            </>
                          );
                        })}
                      </>
                    )}
                  </Block>
                  {ContactDataUtil.events(data).length - 1 == index ? null : (
                    <Seperator single={true} />
                  )}
                </>
              );
            })}
          </>
        )}
        {ContactDataUtil.products(data).length > 0 && (
          <>
            <Text
              size={14}
              samiBold
              color={Colors.TITLE_TEXT}
              marginHorizontal={Metrics.ratio(16)}
              marginTop={10}
            >
              Other Products
            </Text>
            <Seperator single />
          </>
        )}
        <Block marginHorizontal={16}>
          {ContactDataUtil.products(data).length > 0 && (
            <>
              {ContactDataUtil.products(data).map((item, index) => {
                return (
                  <>
                    {/* <GiftCard
                      item={item}
                      onPress={() => {}}
                      onStarPress={(e) => {
                        console.log(e);

                        // onStarPress(e);
                      }}
                      isStar={true}
                      category={false}
                    /> */}
                    <GiftCard
                      item={item}
                      // isGroupPurchase={groupPurchase}
                      showPurchaseStatus
                      // onPress={onCardPress}
                      // onCheckPress={onCheckIconPress}
                      // onPressPurchased={onPurchasedPress}
                      onStarPress={onStarPress}
                      // isSelected={isSelected}
                    />
                  </>
                );
              })}
            </>
          )}
        </Block>
        {/* <Text
          size={15}
          bold
          color={Colors.TITLE_TEXT}
          marginHorizontal={Metrics.ratio(16)}
        >
          Celebrating the New Year in Style
        </Text> */}
        {/* <GiftCard item={item} onPress={onCardPress} onStarPress={onStarPress} /> */}
        {/* <SavedGifts /> */}
      </>
    );
  };

  return (
    <>
      <ScrollViewApi
        payload={{
          id: ContactDataUtil.id(contactInfo),
        }}
        identifier={ContactDataUtil.id(contactInfo)}
        actionType={contactGetDetail.type}
        requestAction={contactGetDetail.request}
        selectorData={getSpecificContactDetail}
        content={renderContent}
        contentContainerStyle={styles.containerStyle}
        showsVerticalScrollIndicator={false}
      />
      <Loader type={[editContact.type, deleteContact.type]} />
    </>
  );
};

export default ContactDetail;
