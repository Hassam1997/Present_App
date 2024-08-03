/** @format */

import React, { useState } from "react";
import { Block, GradientView, Text } from "../../common";
import styles from "./styles";
import { ButtonView, FlatListApi, ProductCard } from "../../components";
import { Image } from "react-native";
import SearchInput from "../../common/SearchInput";
import { Colors, Fonts, Images } from "../../theme";
import { NavigationService } from "../../utils";
import { title } from "../../utils/NavigatorHelper";
import { getAllProducts, homeAllProducts } from "../../ducks/home";
import { useDebounce } from "../../hooks";

const AllProducts = ({ route, navigation }: IsNavigtionProps) => {
  const allProducts: boolean = route.params?.allProducts ?? false;
  const identifier: string = route.params?.identifier ?? "ALL_PRODUCT";
  const headerTitle: boolean = route.params?.headerTitle ?? "All Product";
  const dispatchType = route?.params?.dispatchType ?? homeAllProducts;
  const dispatchSelector = route?.params?.dispatchSelector ?? getAllProducts;
  const categoryId = route?.params?.categoryId ?? undefined;
  const payload = route?.params?.payload ?? {};
  const [inputText, setInputText] = useState<string>("");
  const [selectedIdentifier, setSelectedIdentifier] = useState<boolean>(false);
  const [isApiObject, setApiObject] = useState<any>({});
  const debouncedSearchTerm = useDebounce(inputText, 500);

  const callBack = (data: any) => {
    NavigationService.goBack();
    setApiObject(data);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...title(headerTitle, 17, Fonts.manrope.bold, true),
    });
  }, [navigation]);

  const onChangeText = (text: isTypeString) => {
    setInputText(text);
  };

  const getSearch = () => {
    if (inputText) {
      return debouncedSearchTerm;
    }
    return "";
  };

  const renderItems = ({ item, index }: RenderItemProps) => {
    return (
      <ProductCard
        customStyle={styles.customCardContainer}
        data={item}
        index={index}
        onPress={() => {
          NavigationService.navigate("ProductDetail");
        }}
      />
    );
  };

  const renderHeader = ({ item, index }: RenderItemProps) => {
    const TagView = selectedIdentifier ? Block : GradientView;
    return (
      <Block style={styles.containerStyleHeader}>
        {allProducts && (
          <Block style={styles.gradientView}>
            <ButtonView>
              <GradientView style={styles.catagoryButton}>
                <Text medium size={12} color={Colors.WHITE}>
                  Catagory
                </Text>
                <Image source={Images.icons.arrowDownIcon} />
              </GradientView>
            </ButtonView>
            <ButtonView
              onPress={() => {
                setSelectedIdentifier(!selectedIdentifier);
              }}
            >
              <TagView
                style={[
                  styles.priceButton,
                  {
                    borderWidth: selectedIdentifier ? 1 : 0,
                    borderColor: Colors.TAG_BORDER,
                  },
                ]}
              >
                <Text
                  medium
                  size={12}
                  color={selectedIdentifier ? Colors.TAG_BORDER : Colors.WHITE}
                >
                  Price
                </Text>
                <Image
                  source={Images.icons.priceRangeIcon}
                  style={{
                    tintColor: selectedIdentifier
                      ? Colors.TAG_BORDER
                      : Colors.WHITE,
                  }}
                />
              </TagView>
            </ButtonView>
          </Block>
        )}
      </Block>
    );
  };

  return (
    <Block style={styles.containerStyle}>
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
          query: getSearch(),
          ...(categoryId != undefined ? { categories: categoryId } : null),
          ...isApiObject,
          ...payload,
        }}
        actionType={dispatchType.type}
        requestAction={dispatchType.request}
        numColumns={2}
        selectorData={dispatchSelector}
        renderItem={renderItems}
        keyExtractor={(item, index) => `${item.id}+${index}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <SearchInput
            onFilter={() => {
              NavigationService.navigate("FilterScreen", {
                callBack: callBack,
                dispatchType: dispatchType,
                dispatchSelector: dispatchSelector,
                payload: payload,
                selectedFilter: isApiObject,
                categoryId: categoryId,
              });
            }}
            isFiltered={true}
            style={styles.btnSearch}
            iconStyle={styles.searchIcon}
            placeHolder={"Search"}
            image={Images.icons.search}
            value={inputText}
            onChangeText={onChangeText}
            setValue={(e) => {
              setInputText(e);
            }}
          />
        }
      />
    </Block>
  );
};

export default AllProducts;
