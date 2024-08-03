/** @format */

import React, { useState } from "react";
import {
  AppButton,
  Block,
  CircleCheck,
  Seperator,
  Tags,
  Text,
} from "../../common";
import styles from "./styles";
import { Colors, Images, Metrics } from "../../theme";
import { CIRCLE_CHECK_BUTTON_TYPE } from "../../config/Constants";
import { Image, ScrollView } from "react-native";
import { DATE, DISCOUNTS, EVENTS, PRICE } from "../../data";
import Slider from "../../components/Slider";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, homeAllProducts } from "../../ducks/home";
import { Loader } from "../../components";

const FilterScreen = ({ route }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch();
  const callBack = route?.params?.callBack ?? undefined;
  const dispatchType = route?.params?.dispatchType ?? homeAllProducts;
  const categoriesData = useSelector(getCategories);
  const isEventFilter = route?.params?.isEventFilter ?? false;
  const payload = route?.params?.payload ?? {};
  const selectedFilter = route?.params?.selectedFilter ?? {};
  const renderArray = isEventFilter ? EVENTS : PRICE;
  const queryParameter = route?.params?.queryParameter ?? undefined;
  const categoryId = route.params?.categoryId ?? undefined;
  const [selectedIdentifier, setSelectedIdentifier] = useState<string[]>(
    selectedFilter?.discount ?? []
  );
  const [sliderTowValue, setSliderTowValue] = useState<[number, number]>([
    selectedFilter?.price_range?.[0] ?? 99,
    selectedFilter?.price_range?.[1] ?? 999,
  ]);
  const [selectedRadio, setRadio] = useState<string>(
    isEventFilter ? "" : selectedFilter?.price_order ?? ""
  );
  const [selectedRadioDate, setRadioDate] = useState<string>("");

  const [selectedTags, setSelectedTags] = useState<string[]>(
    selectedFilter?.categories ?? categoryId ?? []
  );

  const sliderTwoValuesChange = (values: [number, number]) => {
    setSliderTowValue(values);
  };

  console.log("payload", selectedFilter);
  const renderSliderCircle = (value: number) => {
    return (
      <Block style={styles.circleView}>
        <Text style={styles.priceText}>${value}</Text>
        <Image source={Images.icons.sliderIcon} />
      </Block>
    );
  };
  return (
    <>
      <ScrollView
        style={styles.containerStyle}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <Text bold size={14} color={Colors.TITLE_TEXT} marginVertical={16}>
          Sort by
        </Text>
        <Text medium size={13} color={Colors.TITLE_TEXT} marginBottom={16}>
          {isEventFilter ? "Events" : "Price"}
        </Text>
        {renderArray.map((item, index) => {
          return (
            <Block key={index.toString()}>
              <CircleCheck
                buttonType={CIRCLE_CHECK_BUTTON_TYPE.RADIO}
                title={item.title}
                identifier={item.identifier}
                isSelected={
                  selectedRadio.includes(item.identifier) ? true : false
                }
                containerStyle={{
                  borderRadius: 20,
                }}
                onPressButton={(id: string) => {
                  setRadio(id);
                }}
              />
              <Seperator single containerStyle={styles.seperatorStyle} />
            </Block>
          );
        })}
        <Text medium size={13} color={Colors.TITLE_TEXT} marginVertical={16}>
          {isEventFilter ? "Date" : "Discounts"}
        </Text>
        {isEventFilter ? (
          <Block marginBottom={20}>
            {DATE.map((item, index) => {
              return (
                <Block key={index.toString()}>
                  <CircleCheck
                    buttonType={CIRCLE_CHECK_BUTTON_TYPE.RADIO}
                    title={item.title}
                    identifier={item.identifier}
                    isSelected={
                      selectedRadioDate.includes(item.identifier) ? true : false
                    }
                    containerStyle={{
                      borderRadius: 20,
                    }}
                    onPressButton={(id: string) => {
                      setRadioDate(id);
                    }}
                  />
                  {DATE.length - 1 != index && (
                    <Seperator single containerStyle={styles.seperatorStyle} />
                  )}
                </Block>
              );
            })}
          </Block>
        ) : (
          <>
            {DISCOUNTS.map((item, index) => {
              return (
                <Block key={index.toString()}>
                  <CircleCheck
                    title={item.title}
                    identifier={item.identifier}
                    isSelected={selectedIdentifier.find(
                      (e: any) => e == item.identifier
                    )}
                    containerStyle={{
                      borderRadius: 20,
                    }}
                    onPressButton={(id: string) => {
                      if (selectedIdentifier.find((e) => e == id)) {
                        const dummy = selectedIdentifier.filter(
                          (val) => val !== id
                        );
                        setSelectedIdentifier([...dummy]);
                      } else {
                        selectedIdentifier.push(id);
                        setSelectedIdentifier([...selectedIdentifier]);
                      }
                    }}
                  />
                  <Seperator single containerStyle={styles.seperatorStyle} />
                </Block>
              );
            })}
            <Text bold size={14} color={Colors.TITLE_TEXT} marginVertical={16}>
              Filter by
            </Text>
            <Text
              samiBold
              size={13}
              color={Colors.TITLE_TEXT}
              marginBottom={16}
            >
              Price Range
            </Text>
            <Block
              style={{
                right: Metrics.ratio(3),
              }}
            >
              <Slider
                values={sliderTowValue}
                sliderLength={Metrics.screenWidth * 0.81}
                onValuesChange={sliderTwoValuesChange}
                isMarkersSeparated={true}
                containerStyle={styles.sliderContainer}
                selectedStyle={styles.selected}
                unselectedStyle={styles.unselected}
                min={99}
                max={999}
                step={100}
                enabledTwo={true}
                customMarkerLeft={(e) => {
                  return renderSliderCircle(sliderTowValue[0]);
                }}
                customMarkerRight={(e) => {
                  return renderSliderCircle(sliderTowValue[1]);
                }}
                allowOverlap={false}
              />
            </Block>
            <Text
              samiBold
              size={13}
              color={Colors.TITLE_TEXT}
              marginVertical={16}
            >
              Category
            </Text>
            <Block style={styles.tagView}>
              {categoriesData.map((item, index) => {
                return (
                  <Block key={index.toString()}>
                    <Tags
                      data={item}
                      identifier={item.id}
                      isSelected={selectedTags.find(
                        (e: string | number) => e == item.id
                      )}
                      onPressButton={(id: any) => {
                        if (selectedTags.find((e) => e == id)) {
                          const dummy = selectedTags.filter(
                            (val) => val !== id
                          );
                          setSelectedTags([...dummy]);
                        } else {
                          selectedTags.push(id);
                          setSelectedTags([...selectedTags]);
                        }
                      }}
                    />
                  </Block>
                );
              })}
            </Block>
          </>
        )}
      </ScrollView>
      <Block style={styles.buttonContiner}>
        <Block style={styles.buttonView}>
          <AppButton
            title="Reset"
            containerStyle={[
              styles.newUserButton,
              {
                borderWidth:
                  selectedTags.length <= 0 &&
                  selectedIdentifier.length <= 0 &&
                  selectedRadio == "" &&
                  selectedRadioDate == "" &&
                  sliderTowValue[0] == 99
                    ? 0
                    : 1,
              },
            ]}
            textStyle={styles.saveButton}
            onPress={() => {
              setSelectedIdentifier([]);
              setSelectedTags([]);
              setRadio("");
              setRadioDate("");
              setSliderTowValue([99, 999]);
            }}
            disabled={
              selectedTags.length <= 0 &&
              selectedIdentifier.length <= 0 &&
              selectedRadio == "" &&
              selectedRadioDate == "" &&
              sliderTowValue[0] == 99
                ? true
                : false
            }
          />
          <AppButton
            title="Apply"
            containerStyle={styles.loginButton}
            onPress={() => {
              let values = {
                ...(sliderTowValue[0] > 99
                  ? { price_range: sliderTowValue }
                  : null),
                discount: selectedIdentifier,
                categories: selectedTags,
                price_order: selectedRadio,
                page: 1,
                limit: 10,
                ...payload,
                ...(queryParameter ? { query: queryParameter } : null),
              };
              dispatch(
                dispatchType.request({
                  payloadApi: values,
                  reset: true,
                  cb: (data) => {
                    callBack?.(values);
                  },
                })
              );
            }}
          />
        </Block>
      </Block>
      <Loader type={dispatchType.type} />
      {console.log(selectedIdentifier, "categoryId")}
    </>
  );
};

export default FilterScreen;
