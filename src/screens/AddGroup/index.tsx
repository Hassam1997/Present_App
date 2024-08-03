/** @format */

import React, { useState } from "react";
import { AppButton, Block, Groups, Seperator } from "../../common";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../theme";
import { NavigationService, Util } from "../../utils";
import SearchInput from "../../common/SearchInput";
import { backButton, customHeader } from "../../utils/NavigatorHelper";
import { SELECT_GROUPS } from "../../dummyData";
import { useDebounce } from "../../hooks";
import { contactAddToGroup } from "../../ducks/contacts";
import { useDispatch } from "react-redux";

const AddGroup = ({ navigation, route }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch();
  const contact_id = route?.params?.id ?? undefined;
  const callBack = route.params?.callBack ?? undefined;
  const dateString = route.params?.date ?? undefined;
  const isSave = route.params?.isSave ?? false;
  const [isValue, setValue] = useState("");
  const debouncedSearchTerm = useDebounce(isValue, 500);
  const [selectedIdentifier, setSelectedIdentifier] = useState<
    { title: string; image: object; id: number }[]
  >([]);
  const [searchData, setSearchData] = useState<
    { title: string; image: object; id: number }[]
  >([]);
  const [Index, setIndex] = useState(0);

  const onChangeText = (text: string) => {
    setValue(text);
    if (text.trim().length === 0) {
      setSearchData([]);
      return;
    }
    const searchContacts = SELECT_GROUPS.filter((c) =>
      c.title.toLowerCase().includes(text.toLowerCase())
    );
    setSearchData(searchContacts);
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
      ...backButton(() => {
        NavigationService?.pop();
      }, Images.icons.cross),
      ...customHeader("Groups"),
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
        placeHolder={"Search events"}
        image={Images.icons.search}
        setValue={(e) => {
          setValue(e);
          if (Util.isEmpty(e)) {
            setSearchData([]);
          }
        }}
      />
      <Block flex borderTopWidth={1} borderTopColor={Colors.LIGHT_GREY}>
        <Groups
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
          title={"Done"}
          onPress={() => {
            let groups: any = [];
            selectedIdentifier.map((item) => {
              return groups.push(item.id);
            });
            dispatch(
              contactAddToGroup.request({
                payloadApi: {
                  groups: groups,
                  contact_id: contact_id,
                },
                cb: () => {
                  Util.showCustomMessage(
                    "This contact has been added to the group successfully!",
                    "success"
                  );
                  setTimeout(() => {
                    NavigationService.goBack();
                  }, 500);
                },
              })
            );
          }}
        />
      </Block>
    </Block>
  );
};

export default AddGroup;
