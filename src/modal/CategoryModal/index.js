/** @format */

import React, { useImperativeHandle, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import Modal from "react-native-modal";
import {
  AppButton,
  Block,
  Checkbox,
  SearchInput,
  Seperator,
} from "../../common";
import { ButtonView, FlatListApi, Loader } from "../../components";
import { Images, Metrics } from "../../theme";
import styles from "./styles";
import { getCategories, homeCategories } from "../../ducks/home";
import { useDebounce } from "../../hooks";
import { useDispatch } from "react-redux";
import { registryMyGifts } from "../../ducks/myregistery";

const CategoryModal = (props, forwardedRef) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    data: [],
    isVisible: false,
    title: undefined,
    isReport: false,
    buttonDisabled: false,
    onPress: () => {},
    dispatchRef,
    id,
  });
  const [isValue, setValue] = useState("");
  const [isSelected, setSelected] = useState([]);
  const debouncedSearchTerm = useDebounce(isValue, 500);

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

  const onChangeText = (text) => {
    setValue(text);
  };

  const getSearch = () => {
    if (isValue) {
      return debouncedSearchTerm;
    }
    return "";
  };

  const onCheckPress = (category) => {
    if (isSelected.includes(category.id)) {
      setSelected(isSelected.filter((val) => val !== category.id));
    } else {
      isSelected.push(category.id);
      setSelected([...isSelected]);
    }
  };

  const { dispatchRef, id, identifierID, sent_to } = data;

  const callApi = () => {
    const my_string = isSelected.join(",");
    dispatch(
      dispatchRef.request({
        payloadApi: {
          page: 1,
          limit: 10,
          category: `${my_string}`,
          ...(id ? { id: id } : null),
        },
        identifier: identifierID,
        reset: true,
        cb: () => {
          hideModal();
        },
      })
    );
  };

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
              <Text style={styles.titleText}>{"Category"}</Text>
            </Block>
            <ButtonView
              onPress={() => {
                setSelected([]);
                dispatch(
                  dispatchRef.request({
                    payloadApi: {
                      page: 1,
                      limit: 10,
                      ...(sent_to ? { sent_to: sent_to } : null),
                      ...(id ? { id: id } : null),
                    },
                    identifier: identifierID,
                    reset: true,
                    cb: () => {
                      hideModal();
                    },
                  })
                );
              }}
            >
              <Text style={styles.cancelText}>{"Clear"}</Text>
            </ButtonView>
          </View>
          <Block>
            <SearchInput
              value={isValue}
              placeHolder={"Search category"}
              onChangeText={onChangeText}
              setValue={(e) => {
                setValue(e);
              }}
              style={styles.btnSearch}
              iconStyle={styles.searchIcon}
            />
          </Block>
          <Seperator
            single={true}
            containerStyle={{ marginVertical: 0, marginBottom: 20 }}
          />
          <FlatListApi
            payload={{
              page: 1,
              limit: 10,
              search: getSearch(),
            }}
            actionType={homeCategories.type}
            selectorData={getCategories}
            requestAction={homeCategories.request}
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
            title="Show Result"
            disabled={isSelected.length == 0}
            onPress={() => {
              callApi();
            }}
          />
        </View>
      </KeyboardAvoidingView>
      <Loader type={dispatchRef?.type} />
    </Modal>
  );
};

export default React.forwardRef(CategoryModal);
