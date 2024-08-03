/** @format */

import React from "react";
import { FlatList, Image, View } from "react-native";
import { ButtonView, FlatListApi, ImageView } from "../../components";
import { Block, CircleCheck, Seperator, Text } from "../../common";
import styles from "./styles";
import { Colors, Metrics } from "../../theme";
import { getGroupList, groupsGetList } from "../../ducks/contacts";
import { ContactDataUtil } from "../../dataUtils";

const Groups: React.FC<MembersProps> = ({
  getSearch,
  onPress,
  selectedIdentifier,
  isContact,
  padding,
  filter_event,
}) => {
  const renderItems = ({ item, index }: RenderItemProps) => {
    const selected = selectedIdentifier?.find((e: any) => e?.id == item.id);
    return (
      <>
        {isContact ? (
          <ButtonView debounceTime={0} onPress={() => onPress?.(item)}>
            <View pointerEvents="none" style={styles.cardView}>
              <Block row align>
                <ImageView
                  source={{ uri: ContactDataUtil.image(item) }}
                  style={styles.avatarStyle}
                  placeholderStyle={styles.avatarStyle}
                  borderRadius={50}
                />
                <Block>
                  <Text left={14} medium size={14} color={Colors.TITLE_TEXT}>
                    {ContactDataUtil.name(item)}
                  </Text>
                  {item.type && (
                    <Text left={14} medium size={14} color={Colors.TITLE_TEXT}>
                      {item.type}
                    </Text>
                  )}
                </Block>
              </Block>
              {selectedIdentifier && (
                <CircleCheck
                  containerStyle={styles.checkBoxContainer}
                  identifier={item.id}
                  isSelected={selected}
                />
              )}
            </View>
          </ButtonView>
        ) : (
          <ButtonView debounceTime={0} onPress={() => onPress?.(item)}>
            <View pointerEvents="none" style={styles.cardView}>
              <ImageView
                source={{ uri: ContactDataUtil.image(item) }}
                style={styles.avatarStyle}
                placeholderStyle={styles.avatarStyle}
                borderRadius={50}
              />
              <Block style={styles.checkBoxView}>
                <CircleCheck
                  containerStyle={styles.checkBoxContainer}
                  customTextStyle={styles.titleTextStyle}
                  title={ContactDataUtil.name(item)}
                  identifier={ContactDataUtil.id(item)}
                  isSelected={selected}
                />
              </Block>
            </View>
          </ButtonView>
        )}
      </>
    );
  };

  return (
    <Block style={styles.subContainer}>
      <FlatListApi
        payload={{
          page: 1,
          limit: 10,
          search: getSearch(),
          filter_event: filter_event,
        }}
        actionType={groupsGetList.type}
        showsVerticalScrollIndicator={false}
        selectorData={getGroupList}
        requestAction={groupsGetList.request}
        renderItem={renderItems}
        ItemSeparatorComponent={() => (
          <Seperator
            single={true}
            containerStyle={{
              marginVertical: 10,
            }}
          />
        )}
        ListFooterComponent={() => <Block height={20} />}
        keyExtractor={(item, index) => `${item.id}+${index}`}
      />
    </Block>
  );
};

export default React.memo(Groups);
