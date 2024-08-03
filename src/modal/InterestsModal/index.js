/** @format */

import React, { useImperativeHandle, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { AppButton, Block, Checkbox, Seperator } from "../../common";
import { ButtonView, FlatListApi } from "../../components";
import { Images, Metrics } from "../../theme";
import styles from "./styles";
import { getInterests, getInterestsList } from "../../ducks/contacts";
import { useSelector } from "react-redux";

const InterestsModal = (props, forwardedRef) => {
  const interestList = useSelector(getInterestsList);
  const [data, setData] = useState({
    data: [],
    isVisible: false,
    title: undefined,
    isReport: false,
    buttonDisabled: false,
    callback: () => {},
  });

  const [isSelected, setSelected] = useState([]);

  const hideModal = () => {
    setData({ ...data, isVisible: false });
  };

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    show: (options = data) => {
      setData({ ...options, isVisible: true });
    },
    hide: hideModal,
  }));

  const onCheckPress = (category) => {
    if (isSelected.includes(category.id)) {
      setSelected(isSelected.filter((val) => val !== category.id));
    } else {
      isSelected.push(category.id);
      setSelected([...isSelected]);
    }
  };

  const { callback } = data;

  const Item = ({
    item,
    onCheckBoxPress,
    disabled = false,
    isSelected = false,
  }) => {
    return (
      <ButtonView
        style={[styles.itemContainer]}
        onPress={() => onCheckBoxPress?.(item)}
        debounceTime={0}
      >
        <Text
          style={[styles.textStyle, isSelected && styles.selectedTextStyle]}
        >
          {item?.name ?? ""}
        </Text>
        <Checkbox isSelected={isSelected} unckeck />
      </ButtonView>
    );
  };

  return (
    <Modal
      backdropTransitionOutTiming={0}
      onBackdropPress={hideModal}
      style={styles.modal}
      isVisible={data.isVisible}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0} // Experiment with different offsets
        style={{ flex: 1, marginTop: Metrics.screenHeight * 0.1 }}
      >
        <View style={[styles.mainContainer]}>
          <View style={styles.cancelWithTitleView}>
            <Block row>
              <ButtonView onPress={hideModal}>
                <Image
                  source={Images.icons.cross}
                  style={styles.headerBackView}
                />
              </ButtonView>
              <Text style={styles.titleText}>{"Interests"}</Text>
            </Block>
            <ButtonView
              onPress={() => {
                setSelected([]);
              }}
            >
              <Text style={styles.cancelText}>{"Clear"}</Text>
            </ButtonView>
          </View>
          <Seperator
            single={true}
            containerStyle={{ marginVertical: 0, marginBottom: 20 }}
          />
          {/* <FlatList
            data={INTERESTS}
            renderItem={({ item }) => (
              <Item
                item={item}
                isSelected={isSelected.includes(item.identifier)}
                onCheckBoxPress={onCheckPress}
              />
            )}
            contentContainerStyle={styles.horizontalContentContainer}
            ItemSeparatorComponent={() => <Block width={10} />}
            showsHorizontalScrollIndicator={false}
            bounces={false}
          /> */}
          <FlatListApi
            payload={{
              page: 1,
              limit: 20,
              per_page: 20,
            }}
            actionType={getInterests.type}
            selectorData={getInterestsList}
            requestAction={getInterests.request}
            renderItem={({ item }) => (
              <Item
                item={item}
                isSelected={isSelected.includes(item.id)}
                onCheckBoxPress={onCheckPress}
              />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.id}+${index}`}
            contentContainerStyle={styles.listContainer}
          />
          <AppButton
            title="Save"
            disabled={isSelected.length == 0}
            onPress={() => {
              callback?.(isSelected, interestList);
              setTimeout(() => {
                hideModal();
              }, 200);
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default React.forwardRef(InterestsModal);
