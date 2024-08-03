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
import { GROUP_OPTIONS } from "../../data";
import { SELECT_CONTACTS } from "../../dummyData";
import { ContactDataUtil, EventsDataUtil } from "../../dataUtils";
import {
  deleteGroup,
  getSpecificGroupDetail,
  groupGetDetail,
} from "../../ducks/contacts";
import ScrollViewApi from "../../components/ScrollViewApi";
import { EVENTS_DAY_FORMAT, EVENT_TYPES } from "../../config/Constants";
import { useDispatch } from "react-redux";

const GroupDetail = ({ navigation, route }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch();
  const contactInfo = route?.params?.data ?? undefined;
  const [url, setURL] = useState<string>("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...headerRightImage(() => {
        DataHandler.getBottomSheetModalRef().show({
          title: "Select Option",
          dataSet: GROUP_OPTIONS,
          callback: (e: any) => {
            switch (e.identifier) {
              case "DELETE":
                DataHandler.getAlertModalRef().show({
                  title: "Delete Group",
                  description: "Are you sure you want to delete this group?",
                  acceptTitle: "Delete",
                  callback: () => {
                    dispatch(
                      deleteGroup.request({
                        payloadApi: {
                          id: ContactDataUtil.id(contactInfo),
                        },
                        cb: () => {
                          Util.showCustomMessage(
                            "The group has been deleted successfully!",
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
              default:
            }
          },
        });
      }, Images.icons.threeDotIcon),
    });
  }, []);

  const getSearch = () => {
    return SELECT_CONTACTS;
  };

  const callBack = (url: string) => {
    setURL(url);
    setTimeout(() => {
      NavigationService.goBack();
    }, 100);
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
                NavigationService.navigate("EditGroup", {
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
        <Text
          size={16}
          samiBold
          color={Colors.TITLE_TEXT}
          marginHorizontal={Metrics.ratio(16)}
          marginTop={Metrics.ratio(16)}
        >
          {ContactDataUtil.contacts(data).length} Members{" "}
        </Text>
        <Block style={styles.contactGroupStyle}>
          {ContactDataUtil.contacts(data).length > 0 ? (
            <>
              {ContactDataUtil.contacts(data).map((item, index) => {
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
              <Text>No Contacts Available</Text>
            </Block>
          )}
        </Block>
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
                                onStarPress={() => {}}
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
        actionType={groupGetDetail.type}
        requestAction={groupGetDetail.request}
        selectorData={getSpecificGroupDetail}
        content={renderContent}
        contentContainerStyle={styles.containerStyle}
        showsVerticalScrollIndicator={false}
      />
      <Loader type={deleteGroup.type} />
    </>
  );
};

export default GroupDetail;
