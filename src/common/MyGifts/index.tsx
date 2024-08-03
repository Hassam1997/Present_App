/** @format */

import React, { useRef, useState } from "react";
import { FlatList, Image } from "react-native";
import {
  AppButton,
  Block,
  Checkbox,
  GiftCard,
  GradientView,
  HorizontalSelectOptionsItem,
  Text,
} from "../";
import { Colors, Images } from "../../theme";
import styles from "./styles";
import { horizontalListGiftsOption } from "../../data";
import { MyGiftsData } from "../../dummyData";
import { ButtonView, FlatListApi, Loader } from "../../components";
import { DataHandler, NavigationService, Util } from "../../utils";
import { CategoryModal } from "../../modal";
import {
  getMyGifts,
  registryMyGifts,
  registryPurchaseGifts,
  registryStarredGifts,
} from "../../ducks/myregistery";
import { useDispatch, useSelector } from "react-redux";
import { DashBoardUtil, MyRegistryUtil } from "../../dataUtils";
import { eventDeleteProduct } from "../../ducks/events";

const MyGifts = ({
  showHeader = true,
  getSearch,
}: {
  showHeader?: boolean;
  getSearch?: any;
}) => {
  const dispatch = useDispatch();
  const getMyGiftsData = useSelector(getMyGifts);
  const [selectedIdentifier, setSelectedIdentifier] = useState<string>("");
  const [groupPurchase, setGroupPurchase] = useState(false);
  const [giftData, setGiftData] = useState(MyGiftsData);
  const [newIdentifier, setNewIdetifier] = useState("all");
  const [isSelected, setSelected] = useState<any>([]);
  const [isSelectedItem, setSelectedItem] = useState<any>([]);
  const [isPurchase, setPurchase] = useState(false);
  const categoryModalRef = useRef<any>();

  const onCardPress = (item: ItemProps) => {
    NavigationService.navigate("ProductDetail", {
      isCustomised: true,
      isThreeDot: true,
      data: item,
      isSaved: DashBoardUtil.is_saved(item),
    });
  };

  const onCheckIconPress = (item: ItemProps) => {
    if (isSelected.includes(MyRegistryUtil.model_id(item))) {
      setSelected(
        isSelected.filter((val) => val !== MyRegistryUtil.model_id(item))
      );
      setSelectedItem(
        isSelectedItem.filter(
          (val) => val.model_id !== MyRegistryUtil.model_id(item)
        )
      );
    } else {
      isSelected.push(MyRegistryUtil.model_id(item));
      isSelectedItem.push(item);
      setSelected([...isSelected]);
      setSelectedItem([...isSelectedItem]);
    }
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
            registryMyGifts.request({
              payloadApi: {
                page: 1,
                limit: 10,
              },
              reset: true,
              cb: () => {},
            })
          );
        },
      })
    );
  };

  const onPurchasedPress = (item: ItemProps) => {
    DataHandler.getAlertModalRef().show({
      title: "Purchased",
      description: "Are you sure you want to mark it as purchased?",
      acceptTitle: "Purchased",
      callback: () => {
        dispatch(
          registryPurchaseGifts.request({
            payloadApi: item,
            identifier: "mygifts",
          })
        );
      },
    });
  };

  const priceSelection = () => {
    if (selectedIdentifier === "asc") {
      setSelectedIdentifier("desc");
    } else if (selectedIdentifier === "desc") {
      setSelectedIdentifier("");
    } else {
      setSelectedIdentifier("asc");
    }
  };
  const headerComponennt = () => {
    const TagView = selectedIdentifier ? GradientView : Block;
    return (
      <>
        <Block>
          <FlatList
            horizontal
            data={horizontalListGiftsOption}
            renderItem={({ item }) => (
              <HorizontalSelectOptionsItem
                item={item}
                selectedState={newIdentifier}
                setSelectedState={(item) => {
                  if (item == "Purchased") {
                    setPurchase(true);
                  } else {
                    setPurchase(false);
                  }
                  setNewIdetifier(item);
                }}
              />
            )}
            contentContainerStyle={styles.horizontalContentContainer}
            ItemSeparatorComponent={() => <Block width={10} />}
            showsHorizontalScrollIndicator={false}
            bounces={false}
          />
        </Block>
        <Block row style={styles.checkBox}>
          <Block row middle>
            <Checkbox
              isSelected={groupPurchase}
              onPressButton={() => {
                setGroupPurchase(!groupPurchase);
              }}
            />
            {/* {groupPurchase && (
              <ButtonView
                onPress={() => {
                  // NavigationService.navigate("GroupPurchase", {
                  //   isGiftSelected: true,
                  // });
                }}
              >
                <Text
                  color={Colors.PRIMARY_PINK}
                  size={14}
                  samiBold
                  style={styles.textPadding}
                >
                  + Group Purchase
                </Text>
              </ButtonView>
            )} */}
          </Block>
          <Block style={styles.gradientView} middle>
            <ButtonView
              onPress={() => {
                categoryModalRef?.current?.show({
                  dispatchRef: registryMyGifts,
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
                    tintColor: selectedIdentifier
                      ? Colors.WHITE
                      : Colors.TAG_BORDER,
                  }}
                />
              </TagView>
            </ButtonView>
          </Block>
        </Block>
      </>
    );
  };

  const renderItems = ({ item, index }: RenderItemProps) => {
    return (
      <GiftCard
        item={item}
        isGroupPurchase={groupPurchase}
        showPurchaseStatus
        onPress={onCardPress}
        onCheckPress={onCheckIconPress}
        onPressPurchased={onPurchasedPress}
        onStarPress={onStarPress}
        isSelected={isSelected}
      />
    );
  };

  return (
    <Block flex>
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
          price: selectedIdentifier,
          search: getSearch(),
          ...(newIdentifier != "all" ? { purchased: isPurchase } : null),
        }}
        style={
          getMyGiftsData.length > 0 ? null : styles.listGiftContentContainer
        }
        customEmptyViewStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listGiftContentContainer}
        ItemSeparatorComponent={() => <Block height={10} />}
        actionType={registryMyGifts.type}
        selectorData={getMyGifts}
        requestAction={registryMyGifts.request}
        renderItem={renderItems}
        ListHeaderComponent={() => (showHeader ? headerComponennt() : <></>)}
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
      {groupPurchase && (
        <Block style={styles.buttonView}>
          <AppButton
            title={"Remove"}
            containerStyle={styles.newUserButton}
            textStyle={styles.saveButton}
            onPress={() => {
              if (isSelected.length > 0) {
                DataHandler.getAlertModalRef().show({
                  title: "Remove Gift",
                  description: "Are you sure you want to remove this gift?",
                  acceptTitle: "Remove",
                  callback: () => {
                    dispatch(
                      eventDeleteProduct.request({
                        payloadApi: {
                          model_id: isSelected,
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
                                setSelected([]);
                                setGroupPurchase(!groupPurchase);
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
          <AppButton
            title="Share"
            disabled={isSelectedItem.length > 1}
            containerStyle={styles.loginButton}
            onPress={() => {
              Util.onShare(
                "Share Product",
                `Present Link\n${DashBoardUtil.share_link(isSelectedItem[0])}`
              );
            }}
          />
        </Block>
      )}
      <CategoryModal ref={categoryModalRef} />
      <Loader
        type={[
          registryStarredGifts.type,
          registryPurchaseGifts.type,
          eventDeleteProduct.type,
        ]}
      />
    </Block>
  );
};

export default React.memo(MyGifts);
