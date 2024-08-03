/** @format */

import React from "react";
import { Block, Text } from "../../common";
import { Colors, Images } from "../../theme";
import { Image } from "react-native";
import { ButtonView, ImageView, Loader } from "..";
import styles from "./styles";
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
import { ContactDataUtil, DashBoardUtil } from "../../dataUtils";
import { CONTACT_TYPE_ENUM, PRODUCT_TYPES } from "../../config/Constants";
import { useDispatch, useSelector } from "react-redux";
import {
  homeProductSaveForLater,
  homeSentProductToParent,
  homeSentProductToSanta,
} from "../../ducks/home";
import { saveContactsList } from "../../ducks/contacts";
import { getIsGuestUser } from "../../ducks/auth";

const ProductCard = ({
  data,
  index,
  imageAbsoluteTop = false,
  onPress,
  customStyle,
  showAddButton = false,
  onPressAdd,
  isWishList = true,
  arrayKey,
}: IPropstopProducts) => {
  const dispatch = useDispatch();
  const isJunior = useSelector(getIsGuestUser);
  const LikeButton = DashBoardUtil.is_saved(data) ? ButtonView : ButtonView;

  const callApi = (payload: Array<any>, data) => {
    dispatch(
      saveContactsList.request({
        payloadApi: payload,
        cb: () => {
          NavigationService.navigate("SelectMembers", {
            isSave: true,
            data: data,
            arrayKey: arrayKey,
          });
        },
      })
    );
  };

  const renderAboluteTopImage = () => {
    if (data?.presentSelected)
      return (
        <Block style={styles.priceTypeContainerAbsoluteTop}>
          <Text bold style={styles.presentText}>
            Present
          </Text>
          <Text bold style={styles.selected}>
            {" "}
            Selected
          </Text>
        </Block>
      );
  };
  const handlewishListModal = (data: any) => {
    DataHandler.getBottomSheetModalRef().show({
      title: "Select Option",
      dataSet: isJunior ? WISHLIST_MODAL_DATA_JUNIOR : WISHLIST_MODAL_DATA,
      callback: (e: { identifier: string; title: string }) => {
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
              arrayKey: arrayKey,
            });
            break;
          case "Later":
            showMessage(data);
            break;
          case "Santa":
            dispatch(
              homeSentProductToSanta.request({
                payloadApi: {
                  product_id: DashBoardUtil.id(data),
                  platform: DashBoardUtil.platform(data),
                },
                cb: () => {
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
                setTimeout(() => {
                  dispatch(
                    homeSentProductToParent.request({
                      payloadApi: {
                        product_id: DashBoardUtil.id(data),
                        platform: DashBoardUtil.platform(data),
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
                }, 300);
              },
            });

            break;
          default:
        }
      },
    });
  };
  const showMessage = (data: any) => {
    if (DashBoardUtil.SFL(data) == false) {
      dispatch(
        homeProductSaveForLater.request({
          payloadApi: {
            product_id: DashBoardUtil.id(data),
            platform: DashBoardUtil.platform(data),
          },
          updateKey: arrayKey,
          cb: () => {
            Util.showCustomMessage(
              "The gift has been saved for later!",
              "success"
            );
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
  const renderBestPriceTextSection = () => {
    if (!data?.priceType)
      return imageAbsoluteTop ? (
        renderAboluteTopImage()
      ) : (
        <Block style={styles.priceTypeContainer}>
          <Image
            resizeMode="contain"
            source={Images.icons.bestPrice}
            style={styles.priceTypeImage}
          />
          <Text bold style={styles.priceType}>
            Best Price
          </Text>
        </Block>
      );
  };

  return (
    <ButtonView
      onPress={() =>
        NavigationService.navigate("ProductDetail", {
          data: data,
          isSaved: DashBoardUtil.is_saved(data),
          arrayKey: arrayKey,
        })
      }
      key={index}
      style={[styles.itemContainer, { ...customStyle }]}
    >
      <Block style={styles.imageContainer}>
        <ImageView
          source={{ uri: DashBoardUtil.image(data) }}
          style={styles.image}
        />
        {renderBestPriceTextSection()}
        {isWishList && (
          <LikeButton
            onPress={() => handlewishListModal(data)}
            style={styles.wishlistButton}
          >
            <Image
              source={Images.icons.heart}
              style={[
                styles.wishlistIcon,
                {
                  tintColor: DashBoardUtil.is_saved(data)
                    ? Colors.DARK_PINK
                    : Colors.GRAY,
                },
              ]}
            />
          </LikeButton>
        )}
        {showAddButton && (
          <ButtonView
            style={styles.createButton}
            onPress={() => onPressAdd?.(data)}
          >
            <Image source={Images.icons.addIcon} style={styles.addImage} />
          </ButtonView>
        )}
      </Block>
      <Image
        resizeMode="contain"
        source={
          DashBoardUtil.platform(data) == PRODUCT_TYPES.AMAZON
            ? Images.images.amazon
            : DashBoardUtil.platform(data) == PRODUCT_TYPES.WALMART
            ? Images.images.wallmart
            : Images.images.target
        }
        style={styles.brandIcon}
      />
      <Text numberOfLines={3} style={styles.productDescription}>
        {DashBoardUtil.title(data)}
      </Text>

      <Text style={styles.priceText} samiBold p>
        $ {DashBoardUtil.discounted_price(data)}
      </Text>

      {DashBoardUtil.discounted_price(data) > 0 && (
        <Text style={styles.salePrice} samiBold p>
          ${DashBoardUtil.price(data)}
        </Text>
      )}
      <Loader type={[homeProductSaveForLater.type, saveContactsList.type]} />
    </ButtonView>
  );
};

export default React.memo(ProductCard);
