/** @format */

import React, { useRef, useState } from "react";
import { AppButton, Block, Text } from "../../common";
import TextInputNative from "../../components/TextInputNative";
import { DataHandler, NavigationService } from "../../utils";
import { useHookForm, ValidationSchema } from "../../utils/ValidationUtil";
import styles from "./styles";
import { ScrollView } from "react-native";
import { Images } from "../../theme";
import { GENDER, INTERESTS } from "../../data";
import { InterestsModal } from "../../modal";
import { useDispatch } from "react-redux";
import {
  getGiftRecommendationProducts,
  homeGiftRecommendation,
} from "../../ducks/home";
import { Loader } from "../../components";

const GiftRecommendation = () => {
  const dispatch = useDispatch();
  const interestsModalRef = useRef<any>();
  const [genderData, setGender] = useState(null);
  const [interests, setInterests] = useState([]);
  const [interestsID, setInterestsID] = useState([]);
  const [formObj, genderProps, ageProps, interestsProps] = useHookForm(
    ["gender", "age", "interests"],
    {},
    ValidationSchema.giftRecommendation
  );
  const submit = formObj.handleSubmit((values) => {
    const payloadApiObj = {
      gender: genderData,
      age: values.age ?? 1,
      interests: interestsID,
    };
    dispatch(
      homeGiftRecommendation.request({
        payloadApi: payloadApiObj,
        cb: () => {
          NavigationService.navigate("AllProducts", {
            headerTitle: "Gift Recommendation",
            dispatchType: homeGiftRecommendation,
            dispatchSelector: getGiftRecommendationProducts,
            payload: payloadApiObj,
          });
        },
      })
    );
  });

  const genderPicker = (onChange: (selectedEvent: any) => void) => {
    DataHandler.getBottomSheetModalRef().show({
      title: "Select Gender",
      dataSet: GENDER,
      callback: (selectedEvent: any) => {
        onChange(selectedEvent.title);
        setGender(selectedEvent.identifier);
      },
    });
  };

  function filterObjectsById(ids, objects) {
    return objects.filter((obj) => ids.includes(obj.id));
  }

  const interestsPicker = (onChange: (selectedEvent: any) => void) => {
    interestsModalRef?.current?.show({
      callback: (data, listdata) => {
        const newArray = filterObjectsById(data, listdata);
        setInterests(newArray);
        setInterestsID(data);
      },
    });
  };

  function renderSignInContainer() {
    return (
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
      >
        <TextInputNative
          nextFocusRef={ageProps.forwardRef}
          title={"Gender"}
          customPlaceholder={"Select gender"}
          rightIcon={Images.icons.arrowDownIcon}
          onPress={(onChange) => {
            genderPicker(onChange);
          }}
          arrowDown
          {...genderProps}
        />
        <TextInputNative
          nextFocusRef={interestsProps.forwardRef}
          title={"Age"}
          customPlaceholder={"Enter age"}
          keyboardType={"numeric"}
          maxLength={3}
          {...ageProps}
        />
        <TextInputNative
          title={"Interests"}
          customPlaceholder={"Select interests"}
          rightIcon={Images.icons.arrowDownIcon}
          onPress={(onChange) => {
            interestsPicker(onChange);
          }}
          required
          arrowDown
          {...interestsProps}
        />
        {interests.length > 0 && (
          <Block style={styles.interestBlock}>
            {interests.map((item: any) => {
              return (
                <Block style={styles.interestMetaBlock}>
                  <Text>{item.name}</Text>
                </Block>
              );
            })}
          </Block>
        )}
        <AppButton
          title="Submit"
          accessibilityLabel={"Signin btn"}
          containerStyle={styles.btnStyle}
          onPress={() => {
            submit();
          }}
        />
      </ScrollView>
    );
  }
  return (
    <Block flex style={styles.containerStyle}>
      {renderSignInContainer()}
      <InterestsModal ref={interestsModalRef} />
      <Loader type={homeGiftRecommendation.type} />
    </Block>
  );
};
export default GiftRecommendation;
