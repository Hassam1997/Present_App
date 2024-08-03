/** @format */

import React from "react";
import { Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import Block from "../Block";
import { Text } from "..";
import { Colors } from "../../theme";
import { ButtonView } from "../../components";

const InfoCard = ({ data, title, style }) => {
  return (
    <>
      {data?.length > 0 ? (
        <Block style={[styles.cardContainer, style]}>
          {title && (
            <Text samiBold size={14}>
              {title}
            </Text>
          )}
          {data.map((item, index) => (
            <Block
              key={index.toString()}
              style={[
                styles.subView,
                {
                  borderBottomWidth: data.length - 1 == index ? 0 : 1,
                },
              ]}
            >
              {item?.image ? (
                <ButtonView
                  style={styles.socailView}
                  onPress={() => {
                    item.onPress();
                  }}
                >
                  <Image source={item?.image} style={styles.imageStyle} />
                  <Text
                    p
                    size={12}
                    color={Colors.TEXT_GREY}
                    style={styles.textStyle}
                  >
                    {item?.title}
                  </Text>
                </ButtonView>
              ) : (
                <>
                  <Text p size={14} color={Colors.LIGHT_GREY}>
                    {item?.title}
                  </Text>
                  {item?.title != "Operation Hours" ? (
                    <Text
                      p
                      size={14}
                      color={Colors.TEXT_GREY}
                      style={styles.textStyle}
                    >
                      {item?.value}
                    </Text>
                  ) : (
                    item?.value.map((item, index) => (
                      <Text
                        p
                        size={14}
                        color={Colors.TEXT_GREY}
                        style={styles.textStyle}
                      >
                        {item?.starts_at ?? "12:00 PM"} to{" "}
                        {item?.ends_at ?? "12:00 AM"} - {item?.day_of_week}
                      </Text>
                    ))
                  )}
                </>
              )}
            </Block>
          ))}
        </Block>
      ) : null}
    </>
  );
};

InfoCard.propTypes = {
  data: PropTypes.any,
  title: PropTypes.string,
  styles: PropTypes.object,
};
InfoCard.defaultProps = {
  data: [],
  title: "",
  styles: {},
};

export default InfoCard;
