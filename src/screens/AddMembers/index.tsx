/** @format */

import React, { useState } from "react";
import {
  AppButton,
  Block,
  ContactsCard,
  Groups,
  Seperator,
} from "../../common";
import styles from "./styles";
import { Colors, Fonts, Images, Metrics } from "../../theme";
import { NavigationService, Util } from "../../utils";
import SearchInput from "../../common/SearchInput";
import { backButton, customHeader, title } from "../../utils/NavigatorHelper";
import { SELECT_GROUPS } from "../../dummyData";
import { useDebounce } from "../../hooks";

const AddMembers = ({ navigation, route }: IsNavigationRequiredProps) => {
  const callBack = route.params?.callBack ?? undefined;
  const dateString = route.params?.date ?? undefined;
  const isSave = route.params?.isSave ?? false;
  const heading = route?.params?.heading ?? "New Group";
  const [isValue, setValue] = useState("");
  const debouncedSearchTerm = useDebounce(isValue, 500);
  const [selectedIdentifier, setSelectedIdentifier] = useState<
    { title: string; image: object; id: number }[]
  >([]);
  const [searchData, setSearchData] = useState<
    { title: string; image: object; id: number }[]
  >([]);
  const [Index, setIndex] = useState(0);

  const onChangeText = (text: isTypeString) => {
    setValue(text);
  };

  const getSearch = () => {
    if (isValue) {
      return debouncedSearchTerm;
    }
    return "";
  };

  React.useLayoutEffect(() => {
    renderHeaderComponent();
  }, [navigation]);

  const renderHeaderComponent = () => {
    navigation.setOptions({
      ...title(heading, 17, Fonts.manrope.bold, true),
    });
  };

  return (
    <Block style={styles.containerSearch}>
      <SearchInput
        paddingHorizontal={Metrics.ratio(16)}
        value={isValue}
        onChangeText={onChangeText}
        style={styles.btnSearch}
        iconStyle={styles.searchIcon}
        placeHolder={"Search members"}
        image={Images.icons.search}
        setValue={(e) => {
          setValue(e);
          if (Util.isEmpty(e)) {
            setSearchData([]);
          }
        }}
      />
      <Block flex>
        <ContactsCard
          getSearch={getSearch}
          onPress={(item: any) => {
            if (selectedIdentifier.find((e) => e.id == item?.id)) {
              const dummy = selectedIdentifier.filter(
                (val) => val.id != item.id
              );
              setSelectedIdentifier([...dummy]);
            } else {
              selectedIdentifier.push(item);
              setSelectedIdentifier([...selectedIdentifier]);
            }
          }}
          selectedIdentifier={selectedIdentifier}
          filter_event={0}
        />
      </Block>
      <Block style={[styles.bottomContainer]}>
        <AppButton
          disabled={selectedIdentifier.length == 0}
          title={"Add Members"}
          onPress={() => {
            if (callBack) {
              callBack(selectedIdentifier);
            } else {
              NavigationService.navigate("CreateGroup", {
                data: selectedIdentifier,
              });
            }
          }}
        />
      </Block>
    </Block>
  );
};

export default AddMembers;
