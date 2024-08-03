/** @format */

import React, { useRef } from "react";
import {
  Block,
  DateTimer,
  FriendsIconHorizontal,
  ProductCardDetail,
  Seperator,
  Text,
} from "../../common";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../theme";
import { EVENTS_DATE_FORMAT, EVENT_TYPES } from "../../config/Constants";
import { ButtonView, Loader } from "../../components";
import { FlatList, Image } from "react-native";
import { DataHandler, NavigationService, Util } from "../../utils";
import { headerRightImage } from "../../utils/NavigatorHelper";
import { ADMIN_OPTIONS, EVENT_FUNCTIONS, REMINDER } from "../../data";
import { NotificationModal } from "../../modal";
import { getProfileData } from "../../ducks/auth";
import { useDispatch, useSelector } from "react-redux";
import ScrollViewApi from "../../components/ScrollViewApi";
import {
  eventDeleteEvent,
  eventDeleteProduct,
  eventGetSpecific,
  getSpecificEventDetail,
} from "../../ducks/events";
import { EventsDataUtil, MyRegistryUtil } from "../../dataUtils";
import { homeGiftRelevancy } from "../../ducks/home";

const EventDetail = ({ navigation, route }: IsRouteRequiredProps) => {
  const dispatch = useDispatch();
  const profileData = useSelector(getProfileData);
  const event_id = route?.params?.event_id ?? 0;
  const notificationModalRef = useRef();
  console.log(route?.params?.isGeneral, "route?.params?.isGeneral");

  React.useLayoutEffect(() => {
    {
      Util.isEmpty(profileData) &&
        navigation.setOptions({
          ...headerRightImage(() => {
            DataHandler.getBottomSheetModalRef().show({
              title: "Select Option",
              dataSet:
                route?.params?.isGeneral != EVENT_TYPES.ADMIN
                  ? EVENT_FUNCTIONS
                  : ADMIN_OPTIONS,
              callback: (e: any) => {
                switch (e.identifier) {
                  case "ADDREMINDER":
                    DataHandler.getBottomSheetModalRef().show({
                      title: "Select Option",
                      dataSet: REMINDER,
                      callback: (e: any) => {
                        Util.showCustomMessage(
                          "The reminder has been added successfully!",
                          "success"
                        );
                      },
                    });
                    break;
                  case "EDITEVENT":
                    NavigationService.navigate("CreateEvent", {
                      isEdit: true,
                      type: route?.params?.isGeneral,
                      event_id: event_id,
                    });
                    break;
                  case "DELETEEVENT":
                    DataHandler.getAlertModalRef().show({
                      title: "Delete Event",
                      description:
                        "Are you sure you want to delete this event?",
                      acceptTitle: "Delete",
                      callback: () => {
                        dispatch(
                          eventDeleteEvent.request({
                            payloadApi: {
                              id: event_id,
                            },
                            cb: () => {
                              Util.showCustomMessage(
                                "The event has been deleted successfully!",
                                "success"
                              );
                              setTimeout(() => {
                                NavigationService.goBack();
                              }, 500);
                            },
                          })
                        );
                      },
                    });
                    break;
                  case "relevant":
                    dispatch(
                      homeGiftRelevancy.request({
                        payloadApi: {
                          status: "Relevant",
                          event_id: event_id,
                        },
                      })
                    );
                    break;
                  case "irrelevant":
                    dispatch(
                      homeGiftRelevancy.request({
                        payloadApi: {
                          status: "Irrelevant",
                          event_id: event_id,
                        },
                        cb: (data: any) => {
                          NavigationService.goBack();
                        },
                      })
                    );
                    break;
                  default:
                }
              },
            });
          }, Images.icons.threeDotIcon),
        });
    }
  }, []);

  // useEffect(() => {
  //   notificationModalRef?.current?.show({})
  // }, [])

  const renderItem = ({ item, index }, data: RenderItemProps) => {
    const isShowDate = Util.showDateNotificationFromLast(
      index,
      EventsDataUtil.others(data)
    );
    return (
      <Block key={index?.toString()}>
        {EventsDataUtil.product_list(item).length > 0 ? (
          <>
            {isShowDate &&
            route?.params?.isGeneral == EVENT_TYPES.CUSTOMIZED ? (
              <Block row align marginBottom={15} space={"between"}>
                <Block row align>
                  <Image
                    source={Images.icons.calendar1}
                    style={styles.crossIcon}
                  />
                  <Text medium size={14} color={Colors.TITLE_TEXT} left={5}>
                    {Util.dateFromNow(item?.date)}
                  </Text>
                </Block>
                {new Date() < new Date(EventsDataUtil.date(data)) && (
                  <DateTimer
                    date={EventsDataUtil.date(data)}
                    containerStyle={styles.timeRemaining}
                    textStyle={styles.timeRemainingText}
                  />
                )}
              </Block>
            ) : null}
            {EventsDataUtil.product_list(item).map((res, index) => {
              return (
                <>
                  {Util.isEmpty(profileData) && (
                    <FriendsIconHorizontal
                      data={res.product_contacts}
                      conatinerStyle={{}}
                    />
                  )}
                  <FlatList
                    data={EventsDataUtil.product_list(res)}
                    renderItem={({ item, index }) => (
                      <ProductCardDetail
                        type={
                          route?.params?.isGeneral == EVENT_TYPES.GENERAL
                            ? "General"
                            : "Customized"
                        }
                        item={item}
                        onPress={(key: number) => {
                          if (Util.isEmpty(profileData)) {
                            DataHandler.getAlertModalRef().show({
                              title: "Remove Gift",
                              description:
                                "Are you sure you want to remove this gift?",
                              acceptTitle: "Remove",
                              callback: () => {
                                let model_id: any = [];
                                model_id.push(MyRegistryUtil.model_id(item));
                                dispatch(
                                  eventDeleteProduct.request({
                                    payloadApi: {
                                      model_id: model_id,
                                    },
                                    cb: () => {
                                      dispatch(
                                        eventGetSpecific.request({
                                          payloadApi: { id: event_id },
                                          identifier: event_id,
                                          cb: () => {
                                            Util.showCustomMessage(
                                              "The gift has been removed successfully!",
                                              "success"
                                            );
                                          },
                                        })
                                      );
                                    },
                                  })
                                );
                              },
                            });
                          }
                        }}
                      />
                    )}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </>
              );
            })}
            <Seperator single={true} containerStyle={styles.seperatorStyle} />
          </>
        ) : null}
      </Block>
    );
  };

  const renderHeader = (data: any) => {
    return (
      <>
        <Block>
          <Block style={styles.listViewContainer}>
            <Text style={styles.nameText}>Type:</Text>
            <Block
              style={
                route?.params?.isGeneral == EVENT_TYPES.GENERAL
                  ? styles.categoryContainerBlue
                  : styles.categoryContainerPink
              }
            >
              <Image
                resizeMode="contain"
                source={
                  route?.params?.isGeneral == EVENT_TYPES.GENERAL
                    ? Images.icons.calendar2
                    : Images.icons.calendarCustomized
                }
              />
              <Text p size={14} color={Colors.TITLE_TEXT}>
                {route?.params?.isGeneral == EVENT_TYPES.GENERAL
                  ? "General"
                  : route?.params?.isGeneral == EVENT_TYPES.CUSTOMIZED
                  ? "Customized"
                  : "Admin"}
              </Text>
            </Block>
          </Block>
          <Seperator single={true} />
          <Block style={styles.listViewContainer}>
            <Text style={styles.nameText}>Title:</Text>
            <Block>
              <Text
                p
                size={14}
                color={Colors.TITLE_TEXT}
                numberOfLines={2}
                width={Metrics.screenWidth * 0.6}
              >
                {EventsDataUtil.title(data)}
              </Text>
            </Block>
          </Block>
          <Seperator single={true} />
          {route?.params?.isGeneral == EVENT_TYPES.GENERAL && (
            <>
              <Block style={styles.listViewContainer}>
                <Text style={styles.nameText}>Date:</Text>
                <Block>
                  <Text p size={14} color={Colors.TITLE_TEXT}>
                    {Util.formatDate(
                      EventsDataUtil.date(data),
                      EVENTS_DATE_FORMAT
                    )}
                  </Text>
                  {new Date() <
                    Util.convertDateTime(EventsDataUtil.date(data)) && (
                    <DateTimer
                      date={EventsDataUtil.date(data)}
                      containerStyle={styles.timeRemaining}
                      textStyle={styles.timeRemainingText}
                    />
                  )}
                </Block>
              </Block>
              <Seperator single={true} />
            </>
          )}
        </Block>
        {EventsDataUtil.others(data)[0]?.products.length > 0 && (
          <Block row align space={"between"} marginBottom={20}>
            <Text size={14} samiBold color={Colors.TITLE_TEXT}>
              Product
            </Text>
            <ButtonView
              onPress={() => {
                NavigationService.navigate("BrowseProducts");
              }}
              style={styles.addButton}
            >
              <Image source={Images.icons.addIcon} style={styles.iconStyle} />
              <Text size={14} samiBold color={Colors.PRIMARY_PINK}>
                Add More
              </Text>
            </ButtonView>
          </Block>
        )}
      </>
    );
  };

  const emptyView = () => {
    return (
      <>
        {route?.params?.isGeneral != EVENT_TYPES.ADMIN && (
          <ButtonView
            style={styles.addBlock}
            onPress={() => {
              NavigationService.navigate("BrowseProducts");
            }}
          >
            <Block style={styles.addView}>
              <Image source={Images.icons.addIcon} />
            </Block>
            <Text size={14} samiBold color={Colors.PRIMARY_PINK} left={15}>
              Browse Product for Event
            </Text>
          </ButtonView>
        )}
      </>
    );
  };

  const renderContent = (data: any) => {
    let empty = EventsDataUtil.others(data)[0]?.products.length > 0;
    return (
      <>
        {renderHeader(data)}
        <FlatList
          ListEmptyComponent={emptyView}
          data={empty ? EventsDataUtil.others(data) : []}
          renderItem={(item) => renderItem(item, data)}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyExtractor={(item, index) => index.toString()}
        />
      </>
    );
  };

  return (
    <Block style={styles.containerStyle}>
      <ScrollViewApi
        payload={{ id: event_id }}
        actionType={eventGetSpecific.type}
        requestAction={eventGetSpecific.request}
        selectorData={getSpecificEventDetail}
        content={renderContent}
        showsVerticalScrollIndicator={false}
        identifier={`${event_id}`}
      />
      {Util.isEmpty(profileData) && (
        <NotificationModal ref={notificationModalRef} />
      )}
      <Loader type={[eventDeleteProduct.type, eventDeleteEvent.type]} />
    </Block>
  );
};

export default EventDetail;
