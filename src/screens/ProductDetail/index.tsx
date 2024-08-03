/** @format */

import React from "react";
import {
  AppButton,
  Block,
  GradientView,
  Seperator,
  TableView,
  Text,
} from "../../common";
import styles from "./styles";
import { ImageSlider, Loader } from "../../components";
import { Animated, Image, Linking } from "react-native";
import {
  GROUP_PURCHASE_DATA,
  SAVE_DATA,
  specifications,
} from "../../dummyData";
import { Colors, Images } from "../../theme";
import { DataHandler, NavigationService, Util } from "../../utils";
import { getProfileData } from "../../ducks/auth";
import { useDispatch, useSelector } from "react-redux";
import { badgeButton, headerRightImage } from "../../utils/NavigatorHelper";
import ScrollViewApi from "../../components/ScrollViewApi";
import {
  getSpecificProductDetail,
  homeGetSpecificProduct,
  homeProductSaveForLater,
  homeSentProductToParent,
  homeSentProductToSanta,
} from "../../ducks/home";
import { DashBoardUtil } from "../../dataUtils";
import { PRODUCT_TYPES } from "../../config/Constants";
import { PRODUCT_DETAILS } from "../../data";
import {
  registryMyGifts,
  registryPurchaseGifts,
  registryStarredGifts,
} from "../../ducks/myregistery";
import { eventDeleteProduct } from "../../ducks/events";

const ProductDetail = ({ navigation, route }: IsNavigtionProps) => {
  const dispatch = useDispatch();
  const profileData = useSelector(getProfileData);
  const productData = route?.params?.data ?? {};
  const productDetailData = useSelector(
    getSpecificProductDetail(DashBoardUtil.id(productData))
  );
  const isCustomised = route?.params?.isCustomised ?? false;
  const isSaved = route?.params?.isSaved ?? false;
  const isThreeDot = route?.params?.isThreeDot ?? false;
  const addToGroup = route?.params?.addToGroup ?? false;
  // const dataArray = route?.params?.data ?? [];
  const isButtonHide = route?.params?.isButtonHide ?? false;
  const arrayKey = route?.params?.arrayKey ?? "allProducts";
  const yOffset = new Animated.Value(0);

  const PopToTop = () => {
    setTimeout(() => {
      NavigationService.popToTop();
    }, 500);
  };

  React.useLayoutEffect(() => {
    const headerOpacity = yOffset.interpolate({
      inputRange: [0, 50],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    navigation.setOptions({
      headerStyle: {
        opacity: headerOpacity,
      },
    });
    navigation.setOptions(
      isThreeDot
        ? {
            ...headerRightImage(
              () => {
                DataHandler.getBottomSheetModalRef().show({
                  title: "Select Option",
                  dataSet: PRODUCT_DETAILS,
                  callback: (e: any) => {
                    switch (e.identifier) {
                      case "PRIORITIZE":
                        dispatch(
                          registryStarredGifts.request({
                            payloadApi: {
                              saved_type: productData?.saved_type,
                              model_id: productData?.model_id,
                              product_id: productData?.id,
                            },
                            identifier: "mygifts",
                            cb: () => {
                              dispatch(
                                registryMyGifts.request({
                                  payloadApi: {
                                    page: 1,
                                    limit: 10,
                                  },
                                  cb: () => {},
                                })
                              );
                              Util.showCustomMessage(
                                "Your gift has been prioritized to top!",
                                "success"
                              );
                            },
                          })
                        );
                        break;
                      case "MARKASPURCHASE":
                        dispatch(
                          registryPurchaseGifts.request({
                            payloadApi: productData,
                            identifier: "mygifts",
                            cb: (data) => {
                              Util.showCustomMessage(
                                "Your gift has been marked as purchased!",
                                "success"
                              );
                              PopToTop();
                            },
                          })
                        );
                        break;
                      case "REMOVEGIFT":
                        DataHandler.getAlertModalRef().show({
                          title: "Remove Gift",
                          description:
                            "Are you sure you want to remove this gift?",
                          acceptTitle: "Delete",
                          callback: () => {
                            dispatch(
                              eventDeleteProduct.request({
                                payloadApi: {
                                  model_id: [productData.model_id],
                                },
                                cb: () => {
                                  dispatch(
                                    registryMyGifts.request({
                                      payloadApi: {
                                        page: 1,
                                        limit: 10,
                                      },
                                      reset: true,
                                      cb: () => {
                                        Util.showCustomMessage(
                                          "The gift has been deleted successfully!",
                                          "success"
                                        );
                                        PopToTop();
                                      },
                                    })
                                  );
                                },
                              })
                            );
                          },
                        });
                        break;
                      case "SHAREGIFT":
                        Util.onShare(
                          "Share Product",
                          `Present Link\n${DashBoardUtil.share_link(
                            productDetailData
                          )}`
                        );
                        break;
                      default:
                    }
                  },
                });
              },
              Images.icons.threeDotIcon,
              styles.iconImageStyleHeader
            ),
          }
        : {
            ...badgeButton(Images.icons.uploadIcon, () => {
              console.log(productDetailData);
              Util.onShare(
                "Share Product",
                `Present Link:\n${DashBoardUtil.share_link(productDetailData)}`
              );
            }),
          }
    );
  }, [navigation, productDetailData]);

  const showMessage = (productData) => {
    if (DashBoardUtil.SFL(productData) == false) {
      dispatch(
        homeProductSaveForLater.request({
          payloadApi: {
            product_id: DashBoardUtil.id(productData),
            platform: DashBoardUtil.platform(productData),
          },
          updateKey: arrayKey,
          cb: () => {
            Util.showCustomMessage("The gift has been saved for later!");
            setTimeout(() => {
              NavigationService.reset("HomeScreen");
            }, 2000);
          },
        })
      );
    } else {
      Util.showCustomMessage(
        "The gift has already been saved for later!",
        "success"
      );
    }
  };

  const handleSaveModal = () =>
    DataHandler.getBottomSheetModalRef().show({
      title: "Select Option",
      dataSet: SAVE_DATA,
      callback: (e: { identifier: string; title: string }) => {
        switch (e?.identifier) {
          case "Contact":
            NavigationService.navigate("SelectMembers", {
              isSave: true,
              data: productData,
              arrayKey: arrayKey,
            });
            break;
          case "Event":
            NavigationService.navigate("SaveEvents", {
              data: productData,
              arrayKey: arrayKey,
            });
            break;
          case "Later":
            showMessage(productData);
            break;
          case "Group":
            NavigationService.navigate("GroupPurchase");
            break;
          default:
        }
      },
    });

  const onnGroupPurchased = () => {
    DataHandler.getBottomSheetModalRef().show({
      title: "Select Option",
      dataSet: GROUP_PURCHASE_DATA,
      callback: (e: { identifier: string; title: string }) => {
        switch (e?.identifier) {
          case "Contact":
            NavigationService.navigate("SelectMembers", {
              isSave: true,
              data: productData,
              arrayKey: arrayKey,
            });
            break;
          case "Event":
            NavigationService.navigate("SaveEvents", {
              data: productData,
              arrayKey: arrayKey,
            });
            break;
          case "Later":
            showMessage(productData);
            break;
          case "Group":
            NavigationService.navigate("GroupPurchase");
            break;
          default:
        }
      },
    });
  };

  const renderContent = (data: any) => {
    return (
      <Block>
        <ImageSlider
          data={DashBoardUtil.product_image(data)}
          paginationRender={true}
        />
        <Block style={styles.bottomContainer}>
          <Block row space={"between"} align>
            {isSaved ? (
              <Block row align>
                <Text bold size={20}>
                  $ {DashBoardUtil.price(data)}.00
                </Text>
                <Text p size={15} color={Colors.APP_TEXT}>
                  (Inclusive of VAT)
                </Text>
              </Block>
            ) : (
              <Block style={styles.blackbox}>
                <Text bold size={10} color={Colors.WHITE}>
                  Present{" "}
                  <Text bold color={Colors.PRIMARY_PINK}>
                    Selected
                  </Text>
                </Text>
              </Block>
            )}
            {/* <Image source={Images.images.amazon} style={styles.amazonIcon} /> */}
            <Image
              resizeMode="contain"
              source={
                DashBoardUtil.platform(data) == PRODUCT_TYPES.AMAZON
                  ? Images.images.amazon
                  : DashBoardUtil.platform(data) == PRODUCT_TYPES.WALMART
                  ? Images.images.wallmart
                  : Images.images.target
              }
              style={styles.amazonIcon}
            />
          </Block>
          {!isSaved && (
            <Block row align style={styles.priceView}>
              <Text bold size={20}>
                $ {DashBoardUtil.discounted_price(data)}
              </Text>
              <Text p size={15} color={Colors.APP_TEXT}>
                (Inclusive of VAT)
              </Text>
            </Block>
          )}
          <Block row space={"between"} align>
            <Block row align>
              <Text
                p
                size={16}
                color={Colors.APP_TEXT}
                textDecorationLine={"line-through"}
              >
                $ {DashBoardUtil.price(data)}
              </Text>
              <Text samiBold color={Colors.PRIMARY_PINK} size={16}>
                {"   "}
                {DashBoardUtil.discount(data)}%
              </Text>
            </Block>
            {!isSaved && (
              <Block style={styles.pinkbox}>
                <Image source={Images.icons.bestPrice} />
                <Text medium size={10} color={Colors.DARK_PINK}>
                  Best Price
                </Text>
              </Block>
            )}
          </Block>
          <Seperator single={true} />
          {isCustomised && (
            <>
              <Block>
                <Block style={styles.categoryContainerPink}>
                  <Image
                    resizeMode="contain"
                    source={Images.icons.calendarCustomized}
                  />
                  <Text style={styles.categoryText}>{"Customized"}</Text>
                </Block>
                <Text color={Colors.TITLE_TEXT} size={16} bold>
                  Celebrating the New Year in Style
                </Text>
                <Block row space={"between"}>
                  <Block row middle marginTop={5}>
                    <Image
                      resizeMode="contain"
                      source={Images.icons.calendar1}
                      style={styles.iconStyles}
                    />
                    <Text style={styles.dateText}>{"Tue, June 21, 2023"}</Text>
                  </Block>
                  <Image
                    source={Images.images.profileImage}
                    style={styles.imageStyle1}
                  />
                </Block>
              </Block>
              <Seperator single={true} />
            </>
          )}
          <Block style={styles.graybox}>
            <Text p size={12} color={Colors.APP_TEXT}>
              {DashBoardUtil.category(data)}
            </Text>
          </Block>
          <Text samiBold size={18} color={Colors.TITLE_TEXT}>
            {DashBoardUtil.title(data)}
          </Text>
          <Text p size={14} color={Colors.APP_TEXT} marginTop={10}>
            {DashBoardUtil.description(data)}
          </Text>
          <GradientView style={styles.giftContainer}>
            <Image source={Images.icons.giftIcon} />
            <Block style={styles.giftTextView}>
              <Text style={styles.giftText}>Get Gift Card</Text>
              <Text p size={12} color={Colors.WHITE}>
                Buy this product and earn multiple rewards.
              </Text>
            </Block>
          </GradientView>
          <Text samiBold size={14} color={Colors.TITLE_TEXT} marginBottom={12}>
            Specifications
          </Text>
          {DashBoardUtil.specifications(data).map((item, index) => {
            return (
              <Block key={index.toString()}>
                <TableView data={item} />
                {specifications.length - 1 == index ? null : (
                  <Seperator single={true} />
                )}
              </Block>
            );
          })}
        </Block>
      </Block>
    );
  };

  return (
    <>
      <ScrollViewApi
        payload={{
          product_id: DashBoardUtil.id(productData),
          platform: DashBoardUtil.platform(productData),
          event: null,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: yOffset,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        identifier={DashBoardUtil.id(productData)}
        actionType={homeGetSpecificProduct.type}
        requestAction={homeGetSpecificProduct.request}
        selectorData={getSpecificProductDetail}
        content={renderContent}
        contentContainerStyle={styles.containerStyle}
        showsVerticalScrollIndicator={false}
        animated
      />
      {Util.isNotEmpty(productDetailData) && (
        <>
          {!Util.isEmpty(profileData) && !isButtonHide ? (
            <Block style={styles.buttonContiner}>
              <Block style={styles.buttonView}>
                <AppButton
                  title={"Send To Santa"}
                  containerStyle={styles.newUserButton}
                  textStyle={styles.saveButton}
                  onPress={() => {
                    dispatch(
                      homeSentProductToSanta.request({
                        payloadApi: {
                          product_id: DashBoardUtil.id(productDetailData),
                          platform: DashBoardUtil.platform(productDetailData),
                        },
                        cb: () => {
                          Util.showCustomMessage(
                            "The gift has been Sent to Santa successfully!",
                            "success"
                          );
                        },
                      })
                    );
                  }}
                />
                <AppButton
                  title="Send To Parent"
                  containerStyle={styles.loginButton}
                  onPress={() => {
                    NavigationService.navigate("SaveEvents", {
                      data: productDetailData,
                      isParent: true,
                      callback: (event) => {
                        console.log("event", event);
                        dispatch(
                          homeSentProductToParent.request({
                            payloadApi: {
                              product_id: DashBoardUtil.id(productDetailData),
                              platform:
                                DashBoardUtil.platform(productDetailData),
                              event: event,
                            },
                            cb: () => {
                              Util.showCustomMessage(
                                "The gift has been Sent to Parent successfully!",
                                "success"
                              );
                            },
                          })
                        );
                      },
                    });
                  }}
                />
              </Block>
            </Block>
          ) : (
            <></>
          )}
          {Util.isEmpty(profileData) && (
            <Block style={styles.buttonContiner}>
              {addToGroup ? (
                <AppButton
                  title="Add To Group Purchase"
                  containerStyle={styles.addtogroup}
                  textStyle={styles.saveButton}
                  onPress={() => {
                    NavigationService.goBack();
                  }}
                />
              ) : (
                <Block style={styles.buttonView}>
                  <AppButton
                    image={
                      isCustomised && !isSaved
                        ? null
                        : isThreeDot
                        ? null
                        : Images.icons.heart
                    }
                    imageStyle={[
                      styles.imageStyle,
                      {
                        tintColor: isSaved ? "red" : Colors.HEART_GREY,
                      },
                    ]}
                    title={
                      isCustomised
                        ? isCustomised && isSaved
                          ? !isThreeDot
                            ? "Save"
                            : "Group Purchase"
                          : "Group Purchase"
                        : "Save"
                    }
                    containerStyle={styles.newUserButton}
                    textStyle={styles.saveButton}
                    onPress={isCustomised ? onnGroupPurchased : handleSaveModal}
                  />
                  <AppButton
                    title="Buy Now"
                    containerStyle={styles.loginButton}
                    onPress={() => {
                      NavigationService.navigate("ContentPages", {
                        url: DashBoardUtil.buy_link(productDetailData),
                        heading: "Product Detail",
                      });
                      // Linking.openURL(
                      //   DashBoardUtil.buy_link(productDetailData)
                      // );
                    }}
                  />
                </Block>
              )}
            </Block>
          )}
        </>
      )}
      <Loader
        type={[
          homeSentProductToParent.type,
          homeSentProductToSanta.type,
          `${registryStarredGifts.type}_mygifts`,
          `${registryPurchaseGifts.type}_mygifts`,
          eventDeleteProduct.type,
        ]}
      />
    </>
  );
};

export default ProductDetail;
