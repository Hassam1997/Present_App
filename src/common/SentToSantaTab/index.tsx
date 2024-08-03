/** @format */

import React, { useRef, useState } from "react";
import { Image, Linking } from "react-native";
import { AppButton, Block, Checkbox, GiftCard, GradientView, Text } from "../";
import { Colors, Images } from "../../theme";
import styles from "./styles";
import { ParentGiftsData, SentaGiftsData } from "../../dummyData";
import { ButtonView, FlatListApi, Loader } from "../../components";
import { DataHandler, NavigationService, Util } from "../../utils";
import { CategoryModal } from "../../modal";
import { getProfileData } from "../../ducks/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  getSpecificJuniorGift,
  registryProductsPriority,
  registryPurchaseGifts,
  registryRemoveGifts,
  registrySpecificJuniorGifts,
} from "../../ducks/myregistery";
import { DashBoardUtil, EventsDataUtil, MyRegistryUtil } from "../../dataUtils";
import { PRIORITY } from "../../data";
import { STARRED_STAR, URL_LINK } from "../../config/Constants";

const SentToSantaTab = ({
  isCategory = false,
  id,
  identifierID,
  sent_to,
  getSearch,
  juniorData,
}: any) => {
  const dispatch = useDispatch();
  const juniorDetailData = useSelector(
    getSpecificJuniorGift(`${identifierID}`)
  );
  const [selectedIdentifier, setSelectedIdentifier] = useState<string>("");
  const [isSelected, setSelected] = useState<any>([]);
  const [groupPurchase, setGroupPurchase] = useState(false);
  const switchProfile = useSelector(getProfileData);
  const [selectAllStatus, setSelectAllStatus] = useState(true);
  const [giftData, setGiftData] = useState(
    isCategory ? ParentGiftsData : SentaGiftsData
  );
  const categoryModalRef = useRef<any>();

  const priceSelection = () => {
    if (selectedIdentifier === "asc") {
      setSelectedIdentifier("desc");
    } else if (selectedIdentifier === "desc") {
      setSelectedIdentifier("");
    } else {
      setSelectedIdentifier("asc");
    }
  };

  const onCardPress = (item: ItemProps) => {
    if (EventsDataUtil.platform(item) == URL_LINK.LINK) {
      Linking.openURL(EventsDataUtil.buy_link(item));
    } else {
      NavigationService.navigate("ProductDetail", {
        isCustomised: true,
        isButtonHide: true,
        data: item,
      });
    }
  };
  const onCheckIconPress = (item: any) => {
    if (Util.isArray(item) && item.length != isSelected.length) {
      const ids = item.map((item) => MyRegistryUtil.model_id(item));
      setSelected(ids);
    } else if (Util.isArray(item) && isSelected.length > 0) {
      setSelected([]);
    } else {
      if (isSelected.includes(MyRegistryUtil.model_id(item))) {
        setSelected(
          isSelected.filter((val) => val !== MyRegistryUtil.model_id(item))
        );
      } else {
        isSelected.push(MyRegistryUtil.model_id(item));
        setSelected([...isSelected]);
      }
    }
  };

  const selectAll = (status: boolean) => {
    const selectAlldata = giftData.map((val) => {
      val.isSelected = status;
      return val;
    });
    setSelectAllStatus(status);
    setGiftData([...selectAlldata]);
  };

  const onPurchasedPress = (item: ItemProps) => {
    DataHandler.getAlertModalRef().show({
      title: "Purchased",
      description: "Are you sure you want to mark it as purchased?",
      acceptTitle: "Purchased",
      callback: () => {
        dispatch(
          registryPurchaseGifts.request({
            payloadApi: {
              model_id: item.model_id,
              saved_type: "JSP",
            },
            cb: () => {
              dispatch(
                registrySpecificJuniorGifts.request({
                  payloadApi: {
                    id: id,
                    sent_to: sent_to,
                    price: selectedIdentifier,
                    search: getSearch(),
                  },
                  reset: true,
                  identifier: identifierID,
                })
              );
            },
          })
        );
      },
    });
  };

  const headerComponennt = () => {
    const TagView = selectedIdentifier ? GradientView : Block;
    return (
      <>
        <Block row style={styles.checkBox}>
          <Block style={styles.gradientView} middle>
            <ButtonView
              onPress={() => {
                categoryModalRef?.current?.show({
                  dispatchRef: registrySpecificJuniorGifts,
                  id: id,
                  identifierID: identifierID,
                  sent_to: sent_to,
                });
              }}
            >
              <GradientView style={styles.catagoryButton}>
                <Text medium size={12} color={Colors.WHITE}>
                  Category
                </Text>
                <Image source={Images.icons.arrowDownIcon} />
              </GradientView>
            </ButtonView>
            <ButtonView
              onPress={() => {
                priceSelection();
              }}
            >
              <TagView
                style={[
                  styles.priceButton,
                  {
                    borderWidth: selectedIdentifier != "" ? 0 : 1,
                    borderColor: Colors.TAG_BORDER,
                  },
                ]}
              >
                <Text
                  medium
                  size={12}
                  color={
                    selectedIdentifier != "" ? Colors.WHITE : Colors.TAG_BORDER
                  }
                >
                  Price
                </Text>
                <Image
                  source={Images.icons.priceRangeIcon}
                  style={{
                    tintColor:
                      selectedIdentifier != ""
                        ? Colors.WHITE
                        : Colors.TAG_BORDER,
                  }}
                />
              </TagView>
            </ButtonView>
          </Block>
          {Util.isEmpty(switchProfile) && (
            <Block row middle>
              <ButtonView
                onPress={() => {
                  if (isSelected.length > 0) {
                    DataHandler.getAlertModalRef().show({
                      title: "Remove Gift",
                      description: "Are you sure you want to remove this gift?",
                      acceptTitle: "Remove",
                      callback: () => {
                        dispatch(
                          registryRemoveGifts.request({
                            payloadApi: {
                              model_ids: isSelected,
                              saved_type: "JSP",
                            },
                            identifier: identifierID,
                          })
                        );
                        setSelected([]);
                      },
                    });
                  } else {
                    setGroupPurchase(!groupPurchase);
                  }
                }}
              >
                <Text
                  color={Colors.APP_TEXT}
                  size={14}
                  samiBold
                  style={styles.textPadding}
                >
                  {groupPurchase ? "Remove All" : "Select"}
                </Text>
              </ButtonView>
            </Block>
          )}
        </Block>
      </>
    );
  };

  const priorityApiCall = (item: ItemProps, priorityCode) => {
    dispatch(
      registryProductsPriority.request({
        payloadApi: {
          model_id: item?.model_id,
          enum: priorityCode,
        },
        key: sent_to,
        id: item.id,
      })
    );
  };

  const onStarPress = (item: ItemProps) => {
    DataHandler.getBottomSheetModalRef().show({
      title: "Select Option",
      dataSet: PRIORITY,
      callback: (data: any) => {
        switch (data.identifier) {
          case 1:
            priorityApiCall(item, STARRED_STAR.FIRST_PRIORITY);
            break;
          case 2:
            priorityApiCall(item, STARRED_STAR.SECOND_PRIORITY);
            break;
          case 3:
            priorityApiCall(item, STARRED_STAR.THIRD_PRIORITY);
            break;
          default:
        }
      },
    });
  };

  const renderItem = ({ item, index }: RenderItemProps) => {
    return (
      <GiftCard
        item={item}
        isGroupPurchase={groupPurchase}
        showPurchaseStatus={Util.isEmpty(switchProfile)}
        onPress={onCardPress}
        onCheckPress={onCheckIconPress}
        onPressPurchased={onPurchasedPress}
        isSelected={isSelected}
        onStarPress={Util.isNotEmpty(switchProfile) ? onStarPress : undefined}
      />
    );
  };

  return (
    <Block flex>
      <FlatListApi
        payload={{
          id: id,
          sent_to: sent_to,
          price: selectedIdentifier,
          search: getSearch(),
        }}
        customEmptyViewStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listGiftContentContainer}
        style={
          juniorDetailData?.length > 0 ? null : styles.listGiftContentContainer
        }
        ItemSeparatorComponent={() => <Block height={1} />}
        actionType={registrySpecificJuniorGifts.type}
        identifier={identifierID}
        selectorData={getSpecificJuniorGift}
        requestAction={registrySpecificJuniorGifts.request}
        renderItem={renderItem}
        ListHeaderComponent={() =>
          juniorDetailData?.length > 0 ? headerComponennt() : headerComponennt()
        }
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
      {groupPurchase && (
        <Block style={styles.buttonView}>
          <Block>
            <ButtonView
              style={styles.allStyle}
              onPress={() => {
                selectAll?.(!selectAllStatus);
              }}
            >
              <Checkbox
                onPressButton={() => {
                  onCheckIconPress?.(juniorDetailData);
                }}
                isSelected={juniorDetailData.length == isSelected.length}
              />
              <Text color={Colors.APP_TEXT} size={12} marginLeft={8}>
                {"All"}
              </Text>
            </ButtonView>
          </Block>
          <Block row>
            <Block>
              <Block row marginRight={8}>
                <Text color={Colors.TITLE_TEXT} size={13} samiBold>
                  {"Total Items:"}
                </Text>
                <Text color={Colors.PRIMARY_PINK} size={13} marginLeft={2}>
                  {juniorDetailData.length}
                </Text>
              </Block>

              <Block row marginRight={8}>
                <Text color={Colors.APP_TEXT} size={13} samiBold>
                  {"Selected Items:"}
                </Text>
                <Text color={Colors.PRIMARY_PINK} size={13} marginLeft={2}>
                  {isSelected.length}
                </Text>
              </Block>
            </Block>
            <AppButton
              title="Share"
              containerStyle={styles.loginButton}
              onPress={() => {
                Util.onShare("Share", "Share");
              }}
            />
          </Block>
        </Block>
      )}
      <CategoryModal ref={categoryModalRef} />
      <Loader type={[registryRemoveGifts.type, registryPurchaseGifts.type]} />
    </Block>
  );
};

export default React.memo(SentToSantaTab);
