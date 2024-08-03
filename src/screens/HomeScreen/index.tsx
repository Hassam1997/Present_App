/** @format */

import React, { useEffect, useRef, useState } from "react";
import {
  Block,
  Categories,
  Text,
  UpComingEvents,
  PresentSelected,
  TopProducts,
  GiftForSpecificDate,
  AllProducts,
  GradientView,
} from "../../common";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../theme";
import { Image, ImageBackground, ScrollView, TextInput } from "react-native";
import SearchInput from "../../common/SearchInput";
import { ButtonView, Calendar, Loader } from "../../components";
import {
  ContactsUtil,
  DataHandler,
  NavigationService,
  Util,
} from "../../utils";
import {
  WISHLIST_MODAL_DATA,
  WISHLIST_MODAL_DATA_JUNIOR,
} from "../../dummyData";
import { headerRightImage, homeHeader } from "../../utils/NavigatorHelper";
import { NotificationModal } from "../../modal";
import { getProfileData, getUserData } from "../../ducks/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  getGiftEvent,
  homeProductSaveForLater,
  homeSentProductToParent,
  homeSentProductToSanta,
} from "../../ducks/home";
import { ContactDataUtil, DashBoardUtil, UserUtil } from "../../dataUtils";
import { CONTACT_TYPE_ENUM, URL_LINK } from "../../config/Constants";
import { saveContactsList } from "../../ducks/contacts";

const HomeScreen = ({ navigation }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch();
  const profileData = useSelector(getProfileData);
  const userData = useSelector(getUserData);
  const giftDate = useSelector(getGiftEvent);
  const [url_value, setUrl] = useState<string>("");
  const notificationModalRef = useRef();

  useEffect(() => {
    navigation.setOptions({
      ...homeHeader(
        `Hey ${UserUtil.full_name(
          Util.isEmpty(profileData) ? userData : profileData
        )},`,
        "Let's find a perfect gifts",
        UserUtil.image(Util.isEmpty(profileData) ? userData : profileData)
      ),
      ...headerRightImage(() => {
        NavigationService.navigate("Notification");
      }),
    });
  }, [navigation]);

  const callApi = (payload: Array<any>, data: any) => {
    dispatch(
      saveContactsList.request({
        payloadApi: payload,
        cb: () => {
          NavigationService.navigate("SelectMembers", {
            isSave: true,
            data: data,
          });
        },
      })
    );
  };

  const searchInput = () => (
    <SearchInput
      image={Images.icons.search}
      placeHolder="Search event, products ... "
      onPress={() => NavigationService.navigate("SearchScreen")}
      paddingHorizontal={Metrics.ratio(Metrics.PaddingHorizontalValue)}
    />
  );

  const handlewishListModal = () => {
    DataHandler.getBottomSheetModalRef().show({
      title: "Select Option",
      dataSet: Util.isEmpty(profileData)
        ? WISHLIST_MODAL_DATA
        : WISHLIST_MODAL_DATA_JUNIOR,
      callback: (e: { identifier: string; title: string }) => {
        const data = {
          id: url_value,
          platform: URL_LINK.LINK,
        };
        switch (e?.identifier) {
          case "Contact":
            ContactsUtil._handleContacts((response: any) => {
              let contactsData: any = [];
              response.map((item: Record<any, string>) => {
                if (ContactDataUtil.phone_number(item) != "") {
                  contactsData.push({
                    full_name: ContactDataUtil.full_name(item),
                    dob: ContactDataUtil.dob(item),
                    image: ContactDataUtil.thumbnailPath(item),
                    contact_type: CONTACT_TYPE_ENUM.PHONE,
                    phone_number: ContactDataUtil.phone_number(item),
                  });
                }
              });
              callApi(contactsData, data);
            });
            break;
          case "Event":
            NavigationService.navigate("SaveEvents", {
              data: data,
            });
            break;
          case "Later":
            dispatch(
              homeProductSaveForLater.request({
                payloadApi: {
                  product_id: DashBoardUtil.id(data),
                  platform: DashBoardUtil.platform(data),
                },
                cb: () => {
                  setUrl("");
                  Util.showCustomMessage(
                    "The link has been saved for later!",
                    "success"
                  );
                },
              })
            );
            break;
          case "Santa":
            dispatch(
              homeSentProductToSanta.request({
                payloadApi: {
                  product_id: DashBoardUtil.id(data),
                  platform: DashBoardUtil.platform(data),
                },
                cb: () => {
                  setUrl("");
                  Util.showCustomMessage(
                    "The gift has been Sent to Santa successfully!",
                    "success"
                  );
                },
              })
            );
            break;
          case "Parent":
            NavigationService.navigate("SaveEvents", {
              data: data,
              isParent: true,
              callback: (event) => {
                console.log("event", event);
                dispatch(
                  homeSentProductToParent.request({
                    payloadApi: {
                      product_id: DashBoardUtil.id(data),
                      platform: DashBoardUtil.platform(data),
                      event: event,
                    },
                    cb: () => {
                      setUrl("");
                      Util.showCustomMessage(
                        "The gift has been Sent to Parent successfully!",
                        "success"
                      );
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
  };

  const renderUpComingEvents = () => <UpComingEvents />;

  const renderPresetSelected = () => (
    <PresentSelected arrayKey={"presentSelected"} />
  );

  const renderCategories = () => <Categories />;

  const renderTopProducts = () => <TopProducts arrayKey={"topProducts"} />;

  const renderGiftsForSpecificDate = () => (
    <GiftForSpecificDate arrayKey={"giftProducts"} />
  );

  const renderAllProducts = () => <AllProducts arrayKey={"allProducts"} />;

  const renderAddGiftsBanner = () => (
    <ImageBackground
      source={Images.images.gift}
      resizeMode="cover"
      style={styles.imageBackground}
    >
      <Block style={styles.content}>
        <Text style={styles.title} medium>
          Find the perfect gifts and save here
        </Text>
        <Block style={styles.banner}>
          <Image source={Images.icons.link} />
          <TextInput
            style={styles.textInputStyle}
            placeholder={"Paste URL..."}
            placeholderTextColor={Colors.APP_TEXT}
            onChangeText={(e) => {
              setUrl(e);
            }}
            value={url_value}
          />
          <ButtonView
            style={styles.button}
            onPress={url_value != "" ? handlewishListModal : () => {}}
            debounceTime={0}
          >
            <Image
              source={Images.icons.arrowRight}
              style={{ tintColor: Colors.WHITE }}
            />
          </ButtonView>
        </Block>
      </Block>
    </ImageBackground>
  );
  const renderSeperator = (height?: number) => (
    <Block style={[styles.seperatorContainer, { height: height }]}></Block>
  );

  return (
    <Block flex style={styles.containerStyle}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContainer}
      >
        {searchInput()}
        {renderAddGiftsBanner()}

        <Calendar
          OnCalendarPress={() => NavigationService.navigate("CalendarScreen")}
        />

        {renderUpComingEvents()}

        <GradientView style={styles.giftContainer}>
          <Block row center>
            <Image source={Images.icons.giftIcon} />
            <Block style={styles.giftTextView}>
              <Text style={styles.giftText}>
                Tailored Recommendation Gifts for Your Loved Ones
              </Text>
            </Block>
          </Block>
          <ButtonView
            onPress={() => {
              NavigationService.navigate("GiftRecommendation");
            }}
          >
            <Image
              resizeMode="contain"
              style={styles.eventTextWithImagecontainerImage}
              source={Images.icons.arrowRight}
            />
          </ButtonView>
        </GradientView>

        {renderPresetSelected()}

        {renderSeperator(Metrics.ratio(10))}

        {renderCategories()}

        {renderSeperator()}

        {renderTopProducts()}

        {renderSeperator(Metrics.HEIGHT_20)}

        {renderGiftsForSpecificDate()}

        {renderSeperator()}

        {renderAllProducts()}
      </ScrollView>
      <NotificationModal ref={notificationModalRef} />
      <Loader
        type={[
          saveContactsList.type,
          homeSentProductToParent.type,
          homeSentProductToSanta.type,
        ]}
      />
    </Block>
  );
};
export default HomeScreen;
