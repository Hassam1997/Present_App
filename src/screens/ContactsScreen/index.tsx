/** @format */

import React, { FC, useState } from "react";
import {
  ActivityTopTab,
  Block,
  ContactsCard,
  Groups,
  SearchInput,
} from "../../common";
import styles from "./styles";
import { headerRightImage } from "../../utils/NavigatorHelper";
import { DataHandler, NavigationService } from "../../utils";
import { Images } from "../../theme";
import { Image } from "react-native";
import { ButtonView } from "../../components";
import { ContactsRoute, SortContacs } from "../../data";
import { useDebounce } from "../../hooks";

const ContactsScreen: FC<IsNavigationRequiredProps> = ({ navigation }) => {
  const [index, setIndex] = useState<number>(0);
  const [isValue, setValue] = useState("");
  const [isSort, setSort] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(isValue, 500);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...headerRightImage(() => {
        NavigationService.navigate("Notification");
      }),
    });
  }, [navigation]);

  const onChangeText = (text: isTypeString) => {
    setValue(text);
  };

  const getSearch = () => {
    if (isValue) {
      return debouncedSearchTerm;
    }
    return "";
  };

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "contacts":
        return (
          <ContactsCard
            getSearch={getSearch}
            onPress={(item) => {
              NavigationService.navigate("ContactDetail", { data: item });
            }}
            isContact={true}
            filter_event={0}
            isSort={isSort}
          />
        );

      case "groups":
        return (
          <Groups
            getSearch={getSearch}
            onPress={(item) => {
              NavigationService.navigate("GroupDetail", { data: item });
            }}
            isContact={true}
            filter_event={0}
            isSort={isSort}
          />
        );

      default:
        return null;
    }
  };

  const sortModal = () => {
    DataHandler.getBottomSheetModalRef().show({
      title: "Select Option",
      dataSet: SortContacs,
      callback: (e: any) => {
        setSort(!isSort);
      },
    });
  };

  return (
    <Block flex style={styles.containerStyle}>
      <Block paddingHorizontal={16}>
        <SearchInput
          value={isValue}
          onChangeText={onChangeText}
          onFilter={() => {
            sortModal();
          }}
          isFiltered={true}
          style={styles.btnSearch}
          iconStyle={styles.searchIcon}
          placeHolder={"Search contacts or groups"}
          image={Images.icons.search}
          filterIcon={Images.icons.sortFilter}
          setValue={(e) => {
            setValue(e);
          }}
        />
      </Block>
      <ActivityTopTab
        setIndexVal={(item: number) => setIndex(item)}
        renderScene={renderScene}
        tabData={ContactsRoute}
        customStyles={{
          indicatorStyle: styles.indicatorStyle,
          indicatorContainerStyle: styles.indicatorContainerStyle,
          tabbarStyle: styles.tabbarStyle,
          labelStyle: styles.labelStyle,
          tabStyle: styles.tabStyle,
        }}
      />
      <ButtonView
        style={styles.createButton}
        onPress={() => {
          if (index == 0) {
            NavigationService.navigate("AddContact");
          } else {
            NavigationService.navigate("AddMembers");
          }
        }}
      >
        <Image source={Images.icons.addIcon} style={styles.addImage} />
      </ButtonView>
    </Block>
  );
};
export default ContactsScreen;
