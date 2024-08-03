/** @format */

import React from "react";
import { FlatList, Image, ImageBackground, View } from "react-native";
import { ButtonView, FlatListApi, ImageView, Loader } from "../../components";
import { AppButton, Block, CircleCheck, Seperator, Text } from "..";
import { Colors, Images } from "../../theme";
import styles from "./styles";
import {
  contactsGetList,
  getContactList,
  saveContactsList,
} from "../../ducks/contacts";
import { ContactDataUtil } from "../../dataUtils";
import { CONTACT_TYPE_ENUM } from "../../config/Constants";
import { ContactsUtil, NavigationService, Util } from "../../utils";
import { useDispatch } from "react-redux";

const ContactsCard: React.FC<MembersProps> = ({
  getSearch,
  onPress,
  selectedIdentifier,
  isContact,
  filter_event,
  isSort,
}) => {
  const dispatch = useDispatch();
  const renderItems = ({ item, index }: RenderItemProps) => {
    const selected = selectedIdentifier?.find((e: any) => e?.id == item.id);
    return (
      <>
        {isContact ? (
          <ButtonView debounceTime={0} onPress={() => onPress?.(item)}>
            <View pointerEvents="none" style={styles.cardView}>
              <Block>
                {item.facebook && (
                  <Image
                    source={Images.icons.facebookIcon}
                    style={styles.fbIcon}
                  />
                )}
                <ImageView
                  source={{ uri: ContactDataUtil.image(item) }}
                  style={styles.avatarStyle}
                  placeholderStyle={styles.avatarStyle}
                  borderRadius={50}
                />
              </Block>
              <Text left={14} medium size={14} color={Colors.TITLE_TEXT}>
                {ContactDataUtil.name(item)}
              </Text>
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

  const callApi = (payload: Array<any>) => {
    dispatch(
      saveContactsList.request({
        payloadApi: payload,
        cb: (data: any) => {
          dispatch(
            contactsGetList.request({
              payloadApi: {
                page: 1,
                limit: 10,
              },
              reset: true,
              cb: (data: any) => {
                Util.showCustomMessage("Contact Sync Successfully!", "success");
              },
            })
          );
        },
      })
    );
  };

  const renderHeader = () => {
    return (
      <ImageBackground
        source={Images.images.banner}
        resizeMode="cover"
        style={styles.imageBackgroundStyle}
      >
        <Text size={18} samiBold color={Colors.WHITE}>
          Sync your contacts to all devices
        </Text>
        <Text size={12} p color={Colors.WHITE} marginVertical={12}>
          here your contacts and data available on all your devices instantly
        </Text>
        <AppButton
          title="Sync Contacts"
          containerStyle={styles.buttonStyle}
          textStyle={styles.textStyle}
          onPress={() => {
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
              callApi(contactsData);
            });
          }}
        />
      </ImageBackground>
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
          ...(isSort ? { ordering: "events" } : null),
        }}
        ListHeaderComponent={isContact ? renderHeader : undefined}
        actionType={contactsGetList.type}
        showsVerticalScrollIndicator={false}
        selectorData={getContactList}
        requestAction={contactsGetList.request}
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
      <Loader type={saveContactsList.type} />
    </Block>
  );
};

export default React.memo(ContactsCard);
