/** @format */

import React from "react"
import { Image, ScrollView } from "react-native"
import { useSelector } from "react-redux"
import { Block, InfoCard, Text } from "../../common"
import { ButtonView, ImageView } from "../../components"
import { infoData } from "../../data"
import { UserUtil } from "../../dataUtils"
import { getProfileData, getUserData } from "../../ducks/auth"
import { Colors, Images } from "../../theme"
import { NavigationService } from "../../utils"
import styles from "./styles"

const MyProfile = () => {
  const userData = useSelector(getProfileData)

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      bounces={false}>
      <Block style={styles.subContainer}>
        <Block style={styles.subView}>
          <ImageView
            source={{ uri: UserUtil.user_image(userData) }}
            style={styles.imageView}
            placeholderStyle={styles.imageView}
          />
          <Block>
            <Text
              samiBold
              size={16}
              color={Colors.TEXT_GREY}
              style={styles.titleStyle}>
              {UserUtil.full_name(userData)}
            </Text>
          </Block>
        </Block>
        <ButtonView
          onPress={() => {
            NavigationService.navigate("EditProfile")
          }}
          style={styles.editButton}>
          <Image source={Images.icons.editIcon} />
        </ButtonView>
      </Block>
      <InfoCard
        data={infoData.map((data) => {
          switch (data.title) {
            case "Email Address":
              return {
                ...data,
                value: UserUtil.email(userData),
              }
            case "Phone Number":
              return {
                ...data,
                value: `${UserUtil.contactNumber(userData)}`,
              }
            case "Date of Birth":
              return {
                ...data,
                value: UserUtil.dob(userData),
              }
            default:
              return data
          }
        })}
      />
    </ScrollView>
  )
}

export default MyProfile
