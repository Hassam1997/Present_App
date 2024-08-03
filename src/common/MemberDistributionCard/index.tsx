/** @format */
import React, { useState } from "react";
import { TextInput } from "react-native";

import { Text, Block, CircleCheck } from "..";
import { ButtonView, ImageView } from "../../components";
import { Colors, Metrics } from "../../theme";
import styles from "./styles";
import { MyRegistryUtil } from "../../dataUtils";

const MemberDistributionCard: React.FC<MemberDistributionProps> = ({
  item,
  onPress,
  onCheckPress,
  isActive,
  isCustom,
  data,
  callback,
}) => {
  let evenPerMemberPercentile: any = 100 / MyRegistryUtil.members(data).length;
  const [percentile, setPercentile] = useState<any>(
    (MyRegistryUtil.amount(item) / MyRegistryUtil.total_amount(data)) * 100
  );
  let evenPerMemberCost: any = (
    ((isCustom ? percentile : evenPerMemberPercentile) *
      MyRegistryUtil.total_amount(data)) /
    100
  ).toFixed(2);

  let remaining = MyRegistryUtil.total_amount(data) - evenPerMemberCost;
  const [textValue, setTextValue] = useState<any>("");
  const [enableTextInput, setEnableTextInput] = useState<boolean>(false);

  const formatText = (e: string) => {
    setTextValue(e.replace(/[^0-9]/g, ""));
  };

  return (
    <Block style={styles.card}>
      <Block flex row middle>
        <ImageView
          source={{ uri: MyRegistryUtil.member_image(item) }}
          style={styles.imageSyle}
          placeholderStyle={styles.imagePlaceholderSyle}
          borderRadius={Metrics.ratio(25)}
        />
        <Block flex>
          <Block row>
            <Text
              color={Colors.TITLE_TEXT}
              size={14}
              samiBold
              style={styles.titleTextStyle}
            >
              {MyRegistryUtil.member_full_name(item)}
            </Text>
            {MyRegistryUtil.is_admin(item) && !isCustom && (
              <Text color={Colors.APP_TEXT} size={12} samiBold marginLeft={5}>
                {"(Admin)"}
              </Text>
            )}
          </Block>
          {evenPerMemberCost > 0 ? (
            <Text
              color={Colors.TITLE_TEXT}
              size={12}
              samiBold
              style={styles.titleTextStyle}
            >
              {`$ ${evenPerMemberCost ?? MyRegistryUtil.amount(item)}`}
            </Text>
          ) : (
            <Text
              color={Colors.TITLE_TEXT}
              size={12}
              samiBold
              style={styles.titleTextStyle}
            >
              {`$ ${MyRegistryUtil.amount(item)}`}
            </Text>
          )}
        </Block>
        <Block flex right>
          {isCustom ? (
            <Block flex row middle>
              {MyRegistryUtil.is_admin(item) || enableTextInput ? (
                <Block>
                  <TextInput
                    style={styles.textInputStyle}
                    textAlign={"center"}
                    maxLength={3}
                    value={
                      MyRegistryUtil.is_admin(item)
                        ? `${evenPerMemberPercentile.toFixed(2)} %`
                        : textValue
                    }
                    keyboardType="number-pad"
                    editable={MyRegistryUtil.is_admin(item) ? false : true}
                    onBlur={() => {
                      if (textValue === "") {
                        setEnableTextInput(false);
                      }
                      if (!textValue.includes("%")) {
                        setTextValue(textValue + "%");
                        setPercentile(textValue * 1);
                        callback(item, textValue, remaining);
                      }
                    }}
                    onChangeText={formatText}
                  />
                </Block>
              ) : (
                <ButtonView onPress={() => setEnableTextInput(true)}>
                  <Text color={Colors.PRIMARY_PINK} size={14} samiBold>
                    {"+ Add Amount"}
                  </Text>
                </ButtonView>
              )}
            </Block>
          ) : (
            <>
              {isActive ? (
                <Text color={Colors.TITLE_TEXT} size={14} samiBold>
                  {`${MyRegistryUtil.amount_percentage(item)} %`}
                </Text>
              ) : (
                <Text color={Colors.TITLE_TEXT} size={14} samiBold>
                  {`${evenPerMemberPercentile.toFixed(2)} %`}
                </Text>
              )}
            </>
          )}

          {isActive && (
            <Block row middle>
              <CircleCheck
                isSelected={
                  MyRegistryUtil.is_paid(item) == "Paid" ? true : false
                }
                containerStyle={styles.circleCheckStyle}
                selectedColor={Colors.GREEN}
                onPressButton={() => onCheckPress?.(item)}
              />
              <Text size={12} color={Colors.APP_TEXT}>
                {MyRegistryUtil.is_paid(item) == "Paid" ? "Paid" : "UnPaid"}
              </Text>
            </Block>
          )}
        </Block>
      </Block>
    </Block>
  );
};

export default MemberDistributionCard;
