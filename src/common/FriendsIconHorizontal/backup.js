/** @format */

import React, { useEffect, useState } from "react"
import { Text, View, ScrollView, FlatList, Image } from "react-native"
import { Images, Metrics } from "../../theme"

const FriendsIconHorizontal = () => {
  let a = "a"
  const img = [a, a, a, a, a, a, a, a, a, a, a, a]

  //const size = (Metrics.screenWidth - 40)/10

  return (
    <View
      style={{
        flexDirection: "row",
        marginHorizontal: 20,
        marginVertical: 15,
        height: (Metrics.screenWidth - 40) / 10 + 72 / 10,
      }}>
      {img.slice(0, 9).map((item, index) => (
        <Image
          source={Images.icons.editIcon}
          style={{
            position: "absolute",
            left: index === 0 ? 0 : index * 40,
            width: (Metrics.screenWidth - 40) / 10 + 72 / 10,
            height: (Metrics.screenWidth - 40) / 10 + 72 / 10,
          }}
        />
      ))}
      {img.length > 10 && (
        <>
          <View
            style={{
              backgroundColor: "red",
              position: "absolute",
              left: 9 * 40,
              borderRadius: 25,
              //marginLeft: -8,
              alignItems: "center",
              justifyContent: "center",
              width: (Metrics.screenWidth - 40) / 10 + 72 / 10,
              height: (Metrics.screenWidth - 40) / 10 + 72 / 10,
            }}>
            <Text style={{ fontSize: 18, color: "white" }}>
              +{img.length - 9}
            </Text>
          </View>
        </>
      )}
    </View>
  )
}

export default FriendsIconHorizontal
