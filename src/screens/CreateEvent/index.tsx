/** @format */

import React, { useState } from "react";
import { FlatList, Image, ScrollView } from "react-native";
import {
  AppButton,
  Block,
  CircleCheck,
  DateTimer,
  FriendsIconHorizontal,
  ProductCardDetail,
  Seperator,
  Text,
} from "../../common";
import {
  ButtonView,
  ImageView,
  Loader,
  TextInputNative,
} from "../../components";
import {
  DATE_PICKER_TYPE,
  DATE_SERVER_FORMAT,
  EVENT_TYPES,
  REMINDER_ENUM,
} from "../../config/Constants";
import { Colors, Fonts, Images } from "../../theme";
import { DataHandler, NavigationService, Util } from "../../utils";
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil";
import styles from "./styles";
import { EVENT_TYPE, REMINDER } from "../../data";
import { PRODUCT_LIST, USER_DATA } from "../../dummyData";
import { title } from "../../utils/NavigatorHelper";
import {
  eventCreateEvents,
  eventDeleteProduct,
  eventEditDetail,
  eventGetSpecific,
  getSpecificEventDetail,
} from "../../ducks/events";
import { useDispatch, useSelector } from "react-redux";
import {
  ContactDataUtil,
  EventsDataUtil,
  MyRegistryUtil,
} from "../../dataUtils";
import { getProfileData } from "../../ducks/auth";

const CreateEvent = ({ navigation, route }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch();
  const profileData = useSelector(getProfileData);
  const isEdit = route?.params?.isEdit ?? false;
  const heading = isEdit ? "Edit Event" : "Create Event";
  const eventTypeData = route?.params?.type ?? "";
  const event_id = route?.params?.event_id ?? 0;
  const eventData = useSelector(getSpecificEventDetail(`${event_id}`));

  const [selectedIdentifierData, setSelectedIdentifierData] = useState<any>({});
  const [selectedDates, setSelectedDates] = useState<any>([]);
  const [productList, setProductList] = useState<object[]>(PRODUCT_LIST);
  const [selectedIdentifierProfile, setSelectedIdentifierProfile] =
    useState<string>(eventData.for_junior_profile ? "yes" : "");
  const [selectedIdentifierReminder, setSelectedIdentifierReminder] =
    useState<number>(isEdit ? EventsDataUtil.reminder(eventData) : 10);
  const [selectedIdentifier, setSelectedIdentifier] = useState<number>(
    isEdit ? eventTypeData : 0
  );

  const [formObj, titleProps, event_typeProps, dateProps] = useHookForm(
    ["title", "event_type", "date"],
    {
      title: isEdit ? EventsDataUtil.title(eventData) : "",
      event_type: isEdit
        ? eventTypeData == EVENT_TYPES.GENERAL
          ? " General Event"
          : eventTypeData == EVENT_TYPES.CUSTOMIZED
          ? "Customized Event"
          : eventTypeData == EVENT_TYPES.ADMIN
          ? "Admin Event"
          : ""
        : "",
      date: isEdit ? EventsDataUtil.date(eventData) : "",
    },
    selectedIdentifier == EVENT_TYPES.GENERAL
      ? ValidationSchema.createEvent
      : ValidationSchema.createCustomEvent
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...title(heading, 17, Fonts.manrope.bold, true),
    });
  }, [eventData]);

  const callBack = (selectedData: [], identifiers: any) => {
    setSelectedDates(selectedData);
    setSelectedIdentifierData({ ...selectedIdentifierData, ...identifiers });
    setTimeout(() => {
      NavigationService.goBack();
    }, 100);
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
        minimumDate: Util.stringToDateObject(new Date()),
      },
    });
  };

  const eventPicker = (onChange: (selectedEvent: any) => void) => {
    DataHandler.getBottomSheetModalRef().show({
      title: "Select Type",
      dataSet: EVENT_TYPE,
      callback: (selectedEvent: any) => {
        onChange(selectedEvent.title);
        setSelectedIdentifier(selectedEvent.identifier);
      },
    });
  };

  const reminderPicker = () => {
    DataHandler.getBottomSheetModalRef().show({
      title: "Add Reminder",
      dataSet: REMINDER,
      callback: (selected: object | any) => {
        setSelectedIdentifierReminder(selected?.identifier);
      },
    });
  };

  const submit = formObj.handleSubmit((values: any) => {
    if (isEdit) {
      values.reminder = selectedIdentifierReminder;
      values.for_junior_profile = selectedIdentifierProfile.includes("yes");
      values.event_type = selectedIdentifier;
      if (selectedIdentifier == EVENT_TYPES.CUSTOMIZED) {
        delete values["date"];
      }
      dispatch(
        eventEditDetail.request({
          payloadApi: {
            ...values,
            event_type: selectedIdentifier,
          },
          eventId: eventData.id,
          cb: (data: any) => {
            setTimeout(() => {
              NavigationService.goBack();
            }, 500);
            Util.showCustomMessage(
              "The changes has been saved successfully!",
              "success"
            );
          },
        })
      );
    } else {
      let contacts: any = [];
      let groups: any = [];
      let custom_event: any = [];
      if (selectedIdentifier == EVENT_TYPES.CUSTOMIZED) {
        for (let i = 0; i < selectedDates.length; i++) {
          const element = selectedDates[i];
          contacts = [];
          groups = [];
          selectedIdentifierData[element]?.map((val) => {
            if (val?.contacts) {
              groups.push(val.id);
            } else {
              contacts.push(val.id);
            }
          });
          custom_event.push({
            ...values,
            date: element,
            for_junior_profile: selectedIdentifierProfile.includes("yes"),
            reminder: selectedIdentifierReminder,
            event_type: selectedIdentifier,
            contacts: contacts,
            groups: groups,
          });
        }
      } else {
        values.for_junior_profile = selectedIdentifierProfile.includes("yes")
          ? true
          : false;
        values.reminder = selectedIdentifierReminder;
        values.contacts = [];
        values.groups = [];
        values.event_type = selectedIdentifier;
      }

      if (
        selectedIdentifier == EVENT_TYPES.CUSTOMIZED &&
        contacts.length == 0
      ) {
        Util.showCustomMessage("Please select atleast one contact");
        return;
      }
      dispatch(
        eventCreateEvents.request({
          payloadApi:
            selectedIdentifier == EVENT_TYPES.GENERAL
              ? { ...values, event_type: 15 }
              : custom_event,
          cb: (data: any) => {
            setTimeout(() => {
              NavigationService.goBack();
            }, 500);
            Util.showCustomMessage(
              isEdit
                ? "The changes has been saved successfully!"
                : "The event has been created successfully!",
              "success"
            );
          },
        })
      );
    }
  });

  const renderItemHorizontal = (item, date) => {
    return (
      <Block style={styles.imageSliderView}>
        <ImageView
          source={{ uri: ContactDataUtil.image(item) }}
          style={styles.imageView}
          placeholderStyle={styles.imageView}
          borderRadius={50}
        />
        <ButtonView
          debounceTime={0}
          onPress={() => {
            const updatedArray = selectedIdentifierData[date].filter(
              (element) => element.id !== item.id
            );
            if (updatedArray.length === 0) {
              const updatedIdentifier = { ...selectedIdentifierData };
              delete updatedIdentifier[date];
              setSelectedIdentifierData(updatedIdentifier);
              const updatedDatesArray = selectedDates.filter(
                (deleteDate) => deleteDate !== date
              );
              setSelectedDates(updatedDatesArray);
            } else {
              setSelectedIdentifierData({
                ...selectedIdentifierData,
                [date]: updatedArray,
              });
            }
          }}
        >
          <Image
            source={Images.icons.crossIcon}
            style={styles.crossIconStyle}
          />
        </ButtonView>
      </Block>
    );
  };

  const renderItems = ({ item, index }: RenderItemProps) => {
    const date = item;
    return (
      <>
        <Block row align>
          <Image source={Images.icons.calendar1} style={styles.crossIcon} />
          <Text medium size={14} color={Colors.TITLE_TEXT} left={5}>
            {item}
          </Text>
        </Block>
        <FlatList
          data={selectedIdentifierData[item]}
          renderItem={
            ({ item }) => renderItemHorizontal(item, date) // Pass both date and horizontalItem to renderItemHorizontal
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Block width={15} />}
        />
      </>
    );
  };

  const renderItemProduct = ({ item, index }, data: any) => {
    const isShowDate = Util.showDateNotificationFromLast(
      index,
      EventsDataUtil.others(data)
    );
    let indexValue = index;
    return (
      <Block key={index?.toString()} marginTop={10}>
        {EventsDataUtil.product_list(item).length > 0 ? (
          <>
            {isShowDate && route?.params?.type == EVENT_TYPES.CUSTOMIZED ? (
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
                    renderItem={({ item, index }: any) => (
                      <ProductCardDetail
                        type={
                          route?.params?.isGeneral == EVENT_TYPES.GENERAL
                            ? "General"
                            : "Customized"
                        }
                        item={item}
                        onPress={() => {
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
                                  arrayIndex: {
                                    rowIndex: indexValue,
                                    itemIndex: index,
                                  },
                                  cb: () => {
                                    dispatch(
                                      eventGetSpecific.request({
                                        payloadApi: { id: event_id },
                                        cb: () => {
                                          Util.showCustomMessage(
                                            "The event has been deleted successfully!",
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

  const reminderString = (id: number) => {
    switch (id) {
      case 10:
        return "Never";
      case 20:
        return "2 days before";
      case 30:
        return "1 week before";
      case 40:
        return "2 week before";
      default:
    }
  };

  const renderHeader = () => {
    return (
      <>
        {productList.length > 0 && (
          <Block row align space={"between"} marginBottom={20} marginTop={20}>
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

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps={"handled"}
      bounces={false}
    >
      <Block style={styles.textInputView}>
        <TextInputNative
          nextFocusRef={event_typeProps.forwardRef}
          title={"Event Title"}
          maxLength={100}
          customPlaceholder={"Type event title"}
          required
          {...titleProps}
        />
        <TextInputNative
          disablePress={isEdit}
          title={"Event Type"}
          customPlaceholder={"Select event type"}
          rightIcon={Images.icons.arrowDownIcon}
          onPress={(onChange) => {
            eventPicker(onChange);
          }}
          required
          arrowDown
          {...event_typeProps}
        />
        {selectedIdentifier == EVENT_TYPES.GENERAL && (
          <TextInputNative
            title={"Event Date"}
            customPlaceholder={"Select event date"}
            rightIcon={Images.icons.calendar1}
            onPress={(onChange) => {
              showDatePicker(onChange);
            }}
            required
            arrowDown
            {...dateProps}
          />
        )}
      </Block>
      {selectedIdentifier != 0 && (
        <>
          {selectedIdentifierReminder == REMINDER_ENUM.NEVER ? (
            <ButtonView
              style={styles.reminderButton}
              onPress={() => {
                reminderPicker();
              }}
            >
              <Block style={styles.createButton}>
                <Image source={Images.icons.addIcon} style={styles.addImage} />
              </Block>
              <Text style={styles.reminderTextStyle}>Add Reminder</Text>
            </ButtonView>
          ) : (
            <>
              <ButtonView
                onPress={() => {
                  reminderPicker();
                }}
              >
                <Text
                  size={12}
                  samiBold
                  color={Colors.TITLE_TEXT}
                  marginTop={23}
                >
                  Reminder
                </Text>
                <Text size={14} p color={Colors.PRIMARY_PINK} marginTop={10}>
                  {reminderString(selectedIdentifierReminder)}
                </Text>
              </ButtonView>
              {isEdit && (
                <FlatList
                  data={
                    EventsDataUtil.others(eventData)[0]?.products.length > 0
                      ? EventsDataUtil.others(eventData)
                      : []
                  }
                  renderItem={(item) => renderItemProduct(item, eventData)}
                  showsVerticalScrollIndicator={false}
                  bounces={false}
                  keyExtractor={(item, index) => index.toString()}
                />
              )}
            </>
          )}
        </>
      )}
      {selectedIdentifier == EVENT_TYPES.CUSTOMIZED && (
        <>
          {selectedDates.length > 0 ? (
            <>
              <Seperator single={true} />
              <Block style={styles.flatlistView}>
                <Text
                  samiBold
                  size={15}
                  color={Colors.TITLE_TEXT}
                  marginBottom={10}
                >
                  Contacts Added
                </Text>
                <FlatList
                  bounces={false}
                  data={selectedDates}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderItems}
                  ItemSeparatorComponent={() => (
                    <Seperator
                      single={true}
                      containerStyle={{
                        marginVertical: 10,
                      }}
                    />
                  )}
                />
                <ButtonView
                  style={styles.reminderButton}
                  onPress={() => {
                    NavigationService.navigate("SelectEvents", {
                      callBack: callBack,
                      selectedDates: selectedDates,
                      selectedIdentifier: selectedIdentifierData,
                    });
                  }}
                >
                  <Block style={styles.createButton}>
                    <Image
                      source={Images.icons.addIcon}
                      style={styles.addImage}
                    />
                  </Block>
                  <Text style={styles.reminderTextStyle}>Add More</Text>
                </ButtonView>
              </Block>
            </>
          ) : (
            <>
              {!isEdit && (
                <ButtonView
                  style={[
                    styles.reminderButton,
                    {
                      marginTop: isEdit ? 10 : 20,
                    },
                  ]}
                  onPress={() => {
                    NavigationService.navigate("SelectEvents", {
                      callBack: callBack,
                    });
                  }}
                >
                  <Block style={styles.createButton}>
                    <Image
                      source={Images.icons.addIcon}
                      style={styles.addImage}
                    />
                  </Block>
                  <Text style={styles.reminderTextStyle}>
                    {isEdit
                      ? "Add More Contacts"
                      : "Add Contacts and Event Date"}
                  </Text>
                </ButtonView>
              )}
              {/* {isEdit && <Seperator single={true} />} */}
            </>
          )}
        </>
      )}
      {isEdit ? null : <Seperator single={true} />}
      <Block style={styles.checkboxView}>
        <CircleCheck
          isSelected={selectedIdentifierProfile.includes("yes") ? true : false}
          onPressButton={() => {
            if (selectedIdentifierProfile.includes("yes")) {
              setSelectedIdentifierProfile("");
            } else {
              setSelectedIdentifierProfile("yes");
            }
          }}
        />
        <Text style={styles.textStyle}>For Junior Profiles</Text>
      </Block>
      <AppButton
        title={isEdit ? "Save" : "Create Event"}
        containerStyle={styles.btnStyle}
        onPress={() => {
          submit();
        }}
      />
      <Loader
        type={[
          eventCreateEvents.type,
          eventDeleteProduct.type,
          eventEditDetail.type,
        ]}
      />
    </ScrollView>
  );
};

export default CreateEvent;
