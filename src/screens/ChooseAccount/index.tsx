/** @format */

import React, { useState } from "react";
import {
  AccountCard,
  AppButton,
  Block,
  SearchInput,
  Seperator,
  Text,
} from "../../common";
import styles from "./styles";
import { Colors, Images } from "../../theme";
import { chooseAccount } from "../../dummyData";
import { Image } from "react-native";
import { NavigationService, Util } from "../../utils";
import { backButton, customHeader } from "../../utils/NavigatorHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  authGetJuniors,
  authProfileData,
  authVerifyPassword,
  getJuniorProfile,
  getProfileData,
  getUserData,
} from "../../ducks/auth";
import { FlatListApi, Loader } from "../../components";
import { useDebounce } from "../../hooks";

const ChooseAccount = ({ navigation, route }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const juniorProfile = route?.params?.juniorProfile ?? false;
  const profileData = useSelector(getProfileData);
  const [isValue, setValue] = useState("");
  const debouncedSearchTerm = useDebounce(isValue, 500);

  const [searchData, setSearchData] = useState<
    { title: string; image: object; isAdmin?: boolean }[]
  >([]);

  React.useEffect(() => {
    if (profileData && juniorProfile) {
      renderHeaderComponent();
    }
  }, []);

  const renderHeaderComponent = () => {
    navigation.setOptions({
      presentation: "modal",
      ...backButton(() => {
        NavigationService?.pop();
      }, Images.icons.cross),
      ...customHeader("Switch Account"),
    });
  };

  const renderItem = ({ item }: RenderItemProps) => {
    return (
      <AccountCard
        data={item}
        onPress={() => {
          console.log(item);
          dispatch(
            authVerifyPassword.request({
              payloadApi: { junior_id: item.id },
              cb: () => {
                dispatch({
                  type: authProfileData.type,
                  payload: {
                    data: item,
                  },
                });
                NavigationService.reset("HomeScreen");
              },
            })
          );
        }}
      />
    );
  };
  const renderSeperator = () => {
    return <Seperator single={true} />;
  };

  const emptyView = () => {
    return (
      <Block style={styles.emptyView}>
        <Image source={Images.images.juniorProfile} style={styles.image} />
        <Text medium size={18} color={Colors.DARK_GREY}>
          No Junior Profiles!
        </Text>
        {Util.isEmpty(profileData) && (
          <AppButton
            title="Add Junior Profile"
            containerStyle={styles.emptyButton}
            onPress={() =>
              NavigationService.navigate("JuniorSignUp", { returnJunior: true })
            }
          />
        )}
      </Block>
    );
  };

  const onChangeText = (text: isTypeString) => {
    setValue(text);
  };

  const getSearch = () => {
    if (isValue) {
      return debouncedSearchTerm;
    }
    return "";
  };

  const renderHeader = () => {
    return (
      <>
        {Util.isEmpty(profileData) ? (
          <Text p color={Colors.TITLE_TEXT} size={14}>
            Please select the account which you want to use
          </Text>
        ) : (
          <></>
        )}
        <Block>
          <Text
            bold
            color={Colors.TITLE_TEXT}
            size={14}
            style={styles.titleText}
          >
            Parent
          </Text>
          <AccountCard
            data={userData}
            onPress={() => {
              if (Util.isEmpty(profileData)) {
                NavigationService.reset("HomeScreen", {
                  yourProfile: true,
                });
              } else {
                NavigationService.navigate("ConfirmPassword", {
                  yourProfile: true,
                  isMaiUser: true,
                });
              }
            }}
          />
          <Seperator single={true} />
          <Text
            bold
            color={Colors.TITLE_TEXT}
            size={14}
            style={styles.titleTextKid}
          >
            My Kids
          </Text>
        </Block>
      </>
    );
  };

  return (
    <Block style={styles.containerStyle}>
      {!Util.isEmpty(profileData) && (
        <Block borderBottomWidth={1} borderColor={Colors.BORDER_GREY}>
          <Block paddingHorizontal={16}>
            <SearchInput
              value={isValue}
              placeHolder={"Search junior profile"}
              onChangeText={onChangeText}
              setValue={(e) => {
                setValue(e);
              }}
              style={styles.btnSearch}
              iconStyle={styles.searchIcon}
            />
          </Block>
        </Block>
      )}
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
          search: getSearch(),
        }}
        emptyView={() => emptyView()}
        ListHeaderComponent={renderHeader}
        customEmptyViewStyle={{
          flexGrow: 1,
        }}
        contentContainerStyle={styles.flatlistView}
        style={styles.flatlistViewStyle}
        actionType={authGetJuniors.type}
        selectorData={getJuniorProfile}
        requestAction={authGetJuniors.request}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeperator}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <Block style={styles.footerView} />}
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
      <Loader type={authVerifyPassword.type} />
    </Block>
  );
};

export default ChooseAccount;
