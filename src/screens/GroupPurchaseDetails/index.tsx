/** @format */

import React, { useState, useEffect } from "react";
import { FlatList, Image } from "react-native";
import {
  ActivityTopTab,
  AppButton,
  Block,
  GiftCard,
  MemberDistributionCard,
  SectionHeader,
  Seperator,
  Text,
} from "../../common";
import { FlatListApi, Loader, ProductCard } from "../../components";
import {
  GROUP_MODAL_OPTIONS,
  MemberDistributionRoute,
  PRODUCT_DETAILS,
} from "../../data";
import { PRESENT_SELECTION_DATA, USER_DATA } from "../../dummyData";
import { Colors, Fonts, Images, Metrics } from "../../theme";
import { DataHandler, NavigationService, Util } from "../../utils";
import { headerRightImage, title } from "../../utils/NavigatorHelper";
import styles from "./styles";
import ScrollViewApi from "../../components/ScrollViewApi";
import {
  getSpecificGroup,
  getSuggestedGroupProducts,
  registryAddGroupProducts,
  registryDeleteGroup,
  registryFinalizeGroup,
  registryGiftingGroup,
  registryMarkPaid,
  registryRemoveGroupProducts,
  registrySaveGroupDraft,
  registrySpecificGiftingGroup,
  registrySuggestedGroupProducts,
} from "../../ducks/myregistery";
import { MyRegistryUtil } from "../../dataUtils";
import { useDispatch, useSelector } from "react-redux";
import dynamicLinks from "@react-native-firebase/dynamic-links";

const GroupPurchaseDetails = ({ route, navigation }: IsRouteRequiredProps) => {
  const dispatch = useDispatch();
  const groupStatus = route?.params?.isActive ?? false;
  const isPast = route?.params?.isPast ?? false;
  const headerTitle = route?.params?.headerTitle ?? "";
  const groupData = route?.params?.groupData ?? {};
  const editGroupData = useSelector(
    getSpecificGroup(`${MyRegistryUtil.id(groupData)}`)
  );
  const [isActive, setIsActive] = useState(groupStatus);
  const [userDistributionData, setUserDistributionData] = useState(USER_DATA);
  const [isDraft, setDraft] = useState([]);
  const [isEvenDraft, setEvenDraft] = useState([]);
  const [isMemberData, setMemberData] = useState([]);
  const [isIndex, setIndex] = useState(0);

  useEffect(() => {
    handleSizeChange();
  }, [isMemberData]);

  const generateLink = async () => {
    try {
      const groupId = MyRegistryUtil.link(groupData);
      const link = await dynamicLinks().buildShortLink(
        {
          link: `https://presentgiftapp.page.link/3Xou?groupId=${groupId}`,
          domainUriPrefix: "https://presentgiftapp.page.link",
          ios: {
            appStoreId: "123456789",
            bundleId: "com.app.presentApp",
          },
        },
        dynamicLinks.ShortLinkType.DEFAULT
      );
      console.log("link:", link);
      return link;
    } catch (error) {
      console.log("Generating Link Error:", error);
    }
  };

  const shareLink = async () => {
    const link = await generateLink();
    Util.onShare("Share", `Present Link\n\n${link}`);
  };

  React.useLayoutEffect(() => {
    !isActive
      ? navigation.setOptions({
          ...title(
            MyRegistryUtil.title(editGroupData),
            17,
            Fonts.manrope.bold,
            true
          ),
          ...headerRightImage(
            () => {
              DataHandler.getBottomSheetModalRef().show({
                title: "Select Option",
                dataSet: GROUP_MODAL_OPTIONS,
                callback: (e: any) => {
                  switch (e.identifier) {
                    case "GROUPLINK":
                      shareLink();
                      break;
                    case "EDITGROUP":
                      NavigationService.navigate("GroupPurchase", {
                        isEdit: true,
                        isActive: isActive,
                        headerTitle: MyRegistryUtil.title(editGroupData),
                        groupData: groupData,
                        isPast: isPast,
                      });
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
        })
      : navigation.setOptions({
          ...title(headerTitle, 17, Fonts.manrope.bold, true),
        });
  }, [navigation, isActive, editGroupData]);

  const onPaidPress = (item: any) => {
    console.log(item);
    DataHandler.getAlertModalRef().show({
      title: "Mark as Paid",
      description: "Are you sure you want to mark it as paid?",
      acceptTitle: "Mark as Paid",
      callback: () => {
        dispatch(
          registryMarkPaid.request({
            payloadApi: {
              id: MyRegistryUtil.id(item),
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

  const callback = (data, item, dataVal) => {
    let evenPerMemberPercentile: any =
      100 / MyRegistryUtil.members(dataVal).length;
    let evenPerMemberCost: any =
      (item * MyRegistryUtil.total_amount(dataVal)) / 100;
    let remaining = MyRegistryUtil.total_amount(dataVal) - evenPerMemberCost;

    //   let total =
    //   (MyRegistryUtil.members(dataVal).length *
    //     (item * 1) *
    //     MyRegistryUtil.total_amount(dataVal)) /
    //   100;
    // let remaining = MyRegistryUtil.total_amount(dataVal) - total;

    // const newArray: any = [];
    // newArray.push({
    //   id: data.id,
    //   amount_percentage: item * 1,
    //   amount: evenPerMemberCost,
    // });
    const index = isDraft.findIndex((item) => item.id == data.id);
    if (index !== -1) {
      isDraft[index].amount_percentage = item == "" ? 0 : item * 1;
      isDraft[index].amount = evenPerMemberCost;
    }
    console.log(isDraft, "isDraft");

    // setDraft(newArray);
  };

  const renderGiftsItems = ({ item, index }: RenderItemProps) => (
    <ProductCard
      customStyle={styles.containerStyle}
      data={item}
      index={index}
      onPress={() => {
        NavigationService.navigate("ProductDetail", {
          isCustomised: true,
          isThreeDot: true,
          isSaved: true,
          data: PRODUCT_DETAILS,
          addToGroup: true,
        });
      }}
      imageAbsoluteTop
      showAddButton
      onPressAdd={(item) => {
        dispatch(
          registryAddGroupProducts.request({
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
        Util.showCustomMessage(
          "The gift has been added to the group successfully!",
          "success"
        );
      }}
      isWishList={false}
    />
  );

  const onGiftPress = (item: any) => {
    if (item.id != "" && item.id != null) {
      NavigationService.navigate("ProductDetail", {
        isCustomised: true,
        isThreeDot: true,
        isSaved: true,
        data: item,
      });
    }
    // NavigationService.navigate("ProductDetail", {
    //   data: data,
    //   isSaved: DashBoardUtil.is_saved(data),
    //   arrayKey: arrayKey,
    // })
  };

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

  const renderItems = ({ item, index }, dataVal: RenderItemProps) => {
    return (
      <MemberDistributionCard
        item={item}
        onCheckPress={onPaidPress}
        isActive={isActive}
        data={dataVal}
      />
    );
  };

  const renderCustomItems = ({ item, index }, dataVal: RenderItemProps) => {
    return (
      <MemberDistributionCard
        item={item}
        onCheckPress={onPaidPress}
        isActive={isActive}
        isCustom={true}
        data={dataVal}
        callback={(data, item) => {
          callback(data, item, dataVal);
        }}
      />
    );
  };

  const renderListHeader = (isEven = false, member_data) => {
    let evenPerMemberPercentile: any =
      100 / MyRegistryUtil.members(member_data).length;
    let evenPerMemberCost: any =
      (evenPerMemberPercentile * MyRegistryUtil.total_amount(member_data)) /
      100;
    let remaining =
      MyRegistryUtil.total_amount(member_data) - evenPerMemberCost;

    return (
      <>
        <Block row marginTop={Metrics.ratio(10)} space={"between"} middle>
          <Text size={14} color={Colors.APP_TEXT}>
            {"Total Cost"}
          </Text>
          <Text size={14} color={Colors.APP_TEXT}>
            {`$ ${MyRegistryUtil.total_amount(member_data)}.00`}
          </Text>
        </Block>
        {isEven && (
          <Block row marginTop={Metrics.ratio(10)} space={"between"} middle>
            <Text size={14} color={Colors.ORANGE}>
              {"Remaining Amount"}
            </Text>
            <Text size={14} color={Colors.ORANGE}>
              {`$ ${remaining}.00`}
            </Text>
          </Block>
        )}
      </>
    );
  };

  const handleSizeChange = () => {
    const newArray: any = [];
    MyRegistryUtil.members(isMemberData)?.map((item, index: any) => {
      let evenPerMemberPercentile: any =
        100 / MyRegistryUtil.members(isMemberData).length;
      let evenPerMemberCost: any = (
        (evenPerMemberPercentile * MyRegistryUtil.total_amount(isMemberData)) /
        100
      ).toFixed(2);
      newArray.push({
        id: item.id,
        amount_percentage: evenPerMemberPercentile * 1,
        amount: evenPerMemberCost * 1,
      });
    });
    setEvenDraft(newArray);
    setDraft(newArray);
  };

  const renderScene = ({ route }, data: any) => {
    setMemberData(data);
    switch (route.key) {
      case "even":
        return (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={MyRegistryUtil.members(data)}
            renderItem={(item) => renderItems(item, data)}
            ListHeaderComponent={() => renderListHeader(false, data)}
            bounces={false}
          />
        );

      case "custom":
        return (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={MyRegistryUtil.members(data)}
            renderItem={(item) => renderCustomItems(item, data)}
            ListHeaderComponent={() => renderListHeader(true, data)}
            bounces={false}
          />
        );

      default:
        return null;
    }
  };

  const renderContent = (data) => {
    return (
      <>
        {MyRegistryUtil.products(data).length > 0 && (
          <>
            {MyRegistryUtil.products(data).map((item) => {
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
                  <Seperator single containerStyle={styles.seperatorStyle} />
                </>
              );
            })}
          </>
        )}
        <Block row paddingHorizontal={Metrics.ratio(16)} marginTop={10}>
          <Image
            source={Images.icons.calendar1}
            style={styles.iconImageStyle}
          />
          <Text size={13} color={Colors.TITLE_TEXT}>
            {MyRegistryUtil.deadline(data)}
          </Text>
        </Block>
        <Block
          row
          marginTop={Metrics.ratio(10)}
          paddingHorizontal={Metrics.ratio(16)}
        >
          <Image
            source={Images.icons.dollarIcon}
            style={styles.iconImageStyle}
          />
          <Text size={13} color={Colors.TITLE_TEXT}>
            {`$ ${MyRegistryUtil.total_amount(data)}.00`}
          </Text>
        </Block>
        <Block style={styles.distrubationStyle}>
          <Text size={16} color={Colors.TITLE_TEXT} samiBold>
            {isActive
              ? "Member’s  Distribution"
              : "How do you want to split the amount?"}
          </Text>
          {isActive ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={MyRegistryUtil.members(data)}
              renderItem={renderItems}
              bounces={false}
            />
          ) : (
            <Block height={320}>
              <ActivityTopTab
                renderScene={(route) => renderScene(route, data)}
                tabData={MemberDistributionRoute}
                setIndexVal={(e) => {
                  setIndex(e);
                }}
                customStyles={{
                  indicatorStyle: styles.indicatorStyle,
                  indicatorContainerStyle: styles.indicatorContainerStyle,
                  tabbarStyle: styles.tabbarStyle,
                  labelStyle: styles.labelStyle,
                  tabStyle: styles.tabStyle,
                }}
              />
            </Block>
          )}
        </Block>
        {isActive && (
          <Block
            paddingHorizontal={Metrics.ratio(16)}
            marginTop={Metrics.ratio(20)}
            row
            space={"between"}
            middle
          >
            <Text size={12} color={Colors.TITLE_TEXT} samiBold>
              {"Total Amount:"}
            </Text>
            <Text size={14} color={Colors.TITLE_TEXT} samiBold>
              {`$ ${MyRegistryUtil.total_amount(data)}.00`}
            </Text>
          </Block>
        )}

        {!isActive && (
          <>
            <SectionHeader
              style={styles.sectioHeaderStyle}
              text="Suggested Gifts"
              onPress={() => {
                NavigationService.navigate("AllProducts", {
                  headerTitle: "Suggested Gifts",
                  dispatchType: registrySuggestedGroupProducts,
                  dispatchSelector: getSuggestedGroupProducts,
                });
              }}
            />
            <FlatListApi
              payload={{
                id: MyRegistryUtil.id(groupData),
                page: 1,
                limit: 10,
              }}
              contentContainerStyle={styles.contentnContainerStyle}
              showsHorizontalScrollIndicator={false}
              actionType={registrySuggestedGroupProducts.type}
              isrefreshControl={true}
              selectorData={getSuggestedGroupProducts}
              requestAction={registrySuggestedGroupProducts.request}
              renderItem={renderGiftsItems}
              horizontal={true}
              ItemSeparatorComponent={() => <Block width={15} />}
              keyExtractor={(item, index) => `${item.id}+${index}`}
            />
          </>
        )}
        {!isActive && (
          <Block style={styles.buttonView}>
            <AppButton
              title={"Save as Draft"}
              containerStyle={styles.newUserButton}
              textStyle={styles.saveButton}
              onPress={() => {
                dispatch(
                  registrySaveGroupDraft.request({
                    payloadApi: isIndex == 0 ? isEvenDraft : isDraft,
                    id: MyRegistryUtil.id(groupData),
                    cb: () => {
                      dispatch(
                        registrySpecificGiftingGroup.request({
                          payloadApi: {
                            id: MyRegistryUtil.id(groupData),
                          },
                          identifier: MyRegistryUtil.id(groupData),
                          cb: () => {
                            Util.showCustomMessage(
                              "Changes has been saved as draft successfully!",
                              "success"
                            );
                          },
                        })
                      );
                    },
                  })
                );
              }}
            />
            <AppButton
              title="Finalize"
              containerStyle={styles.loginButton}
              onPress={() => {
                DataHandler.getAlertModalRef().show({
                  title: "Finalize",
                  description:
                    "Are you sure you want to finalize with these products?",
                  acceptTitle: "Finalize",
                  callback: () => {
                    dispatch(
                      registryFinalizeGroup.request({
                        payloadApi: {
                          id: MyRegistryUtil.id(groupData),
                        },
                        cb: () => {
                          dispatch(
                            registryGiftingGroup.request({
                              payloadApi: {
                                page: 1,
                                limit: 10,
                              },
                              reset: true,
                              cb: () => {
                                setTimeout(() => {
                                  Util.showCustomMessage(
                                    "Group finalized successfully!",
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
                  },
                });
              }}
            />
          </Block>
        )}
      </>
    );
  };

  return (
    <>
      <ScrollViewApi
        payload={{ id: MyRegistryUtil.id(groupData) }}
        actionType={registrySpecificGiftingGroup.type}
        requestAction={registrySpecificGiftingGroup.request}
        selectorData={getSpecificGroup}
        content={renderContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps={"handled"}
        identifier={MyRegistryUtil.id(groupData)}
      />
      <Loader
        type={[
          registryFinalizeGroup.type,
          registryAddGroupProducts.type,
          registrySaveGroupDraft.type,
          registryDeleteGroup.type,
          registryMarkPaid.type,
          registryRemoveGroupProducts.type,
        ]}
      />
    </>
  );
};

export default GroupPurchaseDetails;
