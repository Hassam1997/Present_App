/** @format */

import React from "react";
import { View } from "react-native";
import { ButtonView } from "../../components";
import { Metrics } from "../../theme";
import { ImageView } from "../../components";
import styles from "./styles";

const FriendsIconHorizontal = ({ data, conatinerStyle, size_value = 200 }) => {
  const size = (Metrics.screenWidth - size_value) / 10;
  const overlap = 8;

  if (data?.length > 0) {
    return (
      <View
        style={[
          conatinerStyle,
          {
            flexDirection: "row",
            height: size + overlap,
          },
        ]}
      >
        {data?.slice(0, 9).map((item, index) => (
          <ButtonView
            key={index.toString()}
            style={{
              position: "absolute",
              left: index === 0 ? 0 : index * size - overlap / 2,
            }}
            onPress={() => {}}
          >
            <ImageView
              source={{ uri: item.image ?? item.member?.image ?? "" }}
              style={{ height: size + overlap, width: size + overlap }}
              placeholderStyle={{
                height: size + overlap,
                width: size + overlap,
                borderRadius: size + overlap / 2,
              }}
              borderRadius={size + overlap / 2}
            />
          </ButtonView>
        ))}
        {/* {data?.length > 2 && (
          <>
            <View
              style={{
                backgroundColor: Colors.purply,
                borderColor: Colors.BLACK,
                borderWidth: 1,
                position: "absolute",
                left: 9 * size - overlap,
                borderRadius: (size + overlap) / 2,
                // marginLeft: -8,
                alignItems: "center",
                justifyContent: "center",
                width: size + overlap,
                height: size + overlap,
              }}>
              <Text style={{ fontSize: 16, color: "black" }}>
                +{data?.length - 1}
              </Text>
            </View>
          </>
        )} */}
      </View>
    );
  } else {
    return <></>;
  }
};

export default FriendsIconHorizontal;
