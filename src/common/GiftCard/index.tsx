/** @format */
import React from "react";
import { Image } from "react-native";

import { Text, Block, CircleCheck, Checkbox, FriendsIconHorizontal } from "..";
import { ButtonView, ImageView } from "../../components";
import { Colors, Images } from "../../theme";
import styles from "./styles";
import { MyRegistryUtil } from "../../dataUtils";
import { STARRED_STAR, URL_LINK } from "../../config/Constants";

const GiftCard: React.FC<GiftCardProps> = ({
  cardStyle,
  item,
  onPress,
  showPurchaseStatus,
  isGroupPurchase = false,
  onCheckPress,
  onPressPurchased,
  isCross,
  onCrossPress,
  isActive,
  isStar = true,
  showStatus,
  onStarPress,
  isPast,
  isSelected,
  category = true,
}) => {
  const StarButton = onStarPress ? ButtonView : Block;
  return (
    <ButtonView
      style={[styles.card, cardStyle]}
      onPress={() => {
        onPress?.(item), console.log(item);
      }}
    >
      <Block flex row middle>
        {isGroupPurchase && (
          <Checkbox
            isSelected={isSelected?.includes(MyRegistryUtil.model_id(item))}
            onPressButton={() => {
              onCheckPress?.(item);
            }}
            containerStyle={styles.checkBoxStyle}
          />
        )}
        {MyRegistryUtil.platform(item) == URL_LINK.LINK ? (
          <Block style={styles.imageSyle} backgroundColor={"#F2F2F2"}>
            <Image
              source={Images.icons.giftBoxIcon}
              style={styles.giftImageStyle}
            />
          </Block>
        ) : (
          <ImageView
            source={{
              uri: MyRegistryUtil.image(item) ?? MyRegistryUtil.image_url(item),
            }}
            style={styles.imageSyle}
            borderRadius={5}
            placeholderStyle={styles.imageSylePlaceholder}
          />
        )}
        <Block flex>
          {MyRegistryUtil.title(item) && (
            <Block row space={"between"}>
              <Text
                color={Colors.TITLE_TEXT}
                size={12}
                samiBold
                style={styles.titleTextStyle}
              >
                {MyRegistryUtil.title(item)}
              </Text>
              {isStar && (
                <StarButton
                  debounceTime={0}
                  onPress={() => onStarPress?.(item)}
                >
                  <Image
                    source={
                      MyRegistryUtil.isPrioritize(item)
                        ? Images.icons.blueStar
                        : Images.icons.starOutline
                    }
                    style={{
                      tintColor:
                        MyRegistryUtil.junior_starred(item) ==
                        STARRED_STAR.FIRST_PRIORITY
                          ? Colors.GOLDEN
                          : MyRegistryUtil.junior_starred(item) ==
                            STARRED_STAR.SECOND_PRIORITY
                          ? Colors.SILVER
                          : MyRegistryUtil.junior_starred(item) ==
                            STARRED_STAR.THIRD_PRIORITY
                          ? Colors.BRONZE
                          : undefined,
                    }}
                  />
                  {MyRegistryUtil.junior_starred(item) && (
                    <Text style={styles.ratingText}>
                      {MyRegistryUtil.junior_starred(item) ==
                      STARRED_STAR.FIRST_PRIORITY
                        ? 1
                        : MyRegistryUtil.junior_starred(item) ==
                          STARRED_STAR.SECOND_PRIORITY
                        ? 2
                        : MyRegistryUtil.junior_starred(item) ==
                          STARRED_STAR.THIRD_PRIORITY
                        ? 3
                        : undefined}
                    </Text>
                  )}
                </StarButton>
              )}
            </Block>
          )}
          {category == true && (
            <>
              {(MyRegistryUtil.products_contacts(item).length > 0 ||
                MyRegistryUtil.category(item) ||
                MyRegistryUtil.members(item)) && (
                <Block row space={"between"} middle paddingTop={12}>
                  {(MyRegistryUtil.products_contacts(item).length > 0 ||
                    MyRegistryUtil.members(item).length > 0) && (
                    <Block row flex>
                      <FriendsIconHorizontal
                        data={
                          MyRegistryUtil.products_contacts(item).length > 0
                            ? MyRegistryUtil.products_contacts(item)
                            : MyRegistryUtil.members(item)
                        }
                        conatinerStyle={{}}
                        size_value={280}
                      />
                    </Block>
                  )}
                  {MyRegistryUtil.category(item) && category == true && (
                    <Block row flex>
                      <Image
                        source={Images.icons.birthdayCalender}
                        style={styles.birthdaySyle}
                      />
                      <Text size={12} color={Colors.APP_TEXT}>
                        {MyRegistryUtil.category(item)}
                      </Text>
                    </Block>
                  )}
                </Block>
              )}
            </>
          )}
          {MyRegistryUtil.price(item) >= 0 && (
            <Block row space={"between"} middle paddingTop={10}>
              <Text size={14} samiBold>
                {`$ ${
                  MyRegistryUtil.price(item) ??
                  MyRegistryUtil.total_amount(item)
                }`}
              </Text>
              {showPurchaseStatus && (
                <ButtonView
                  onPress={() => onPressPurchased?.(item)}
                  style={styles.purchaseButton}
                >
                  <CircleCheck
                    isSelected={MyRegistryUtil.purchased(item)}
                    containerStyle={styles.circleCheckStyle}
                    selectedColor={Colors.GREEN}
                    onPressButton={() => onPressPurchased?.(item)}
                    unckeck={MyRegistryUtil.purchased(item)}
                  />
                  <Text size={12} color={Colors.APP_TEXT}>
                    {"Purchased"}
                  </Text>
                </ButtonView>
              )}
            </Block>
          )}
        </Block>
      </Block>
      {isCross && (
        <ButtonView
          debounceTime={0}
          style={styles.crossStyles}
          onPress={() => onCrossPress?.(item)}
        >
          <Image source={Images.icons.crossIcon} style={styles.imageStyle} />
        </ButtonView>
      )}
      {showStatus && (
        <Block
          style={[
            styles.activeStyles,
            {
              backgroundColor: isActive
                ? Colors.GREEN01
                : isPast
                ? Colors.GREEN_SHADAE01
                : Colors.RED01,
              borderColor: isActive
                ? Colors.MAINGREEN
                : isPast
                ? Colors.GREEN_SHADAE
                : Colors.MAINRED,
            },
          ]}
        >
          <Text
            size={10}
            color={
              isActive
                ? Colors.MAINGREEN
                : isPast
                ? Colors.GREEN_SHADAE
                : Colors.MAINRED
            }
          >
            {isActive ? "Active" : isPast ? "Past" : "Inactive"}
          </Text>
        </Block>
      )}
    </ButtonView>
  );
};

export default GiftCard;
