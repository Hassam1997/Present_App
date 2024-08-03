/** @format */

import React, { useState } from "react"
import {
  ActivityTopTab,
  AllEvents,
  Block,
  CustomizedEvents,
  GeneralEvents,
  SearchInput,
} from "../../common"
import styles from "./styles"
import { Fonts, Images, Metrics } from "../../theme"
import { CalendarRoutes } from "../../data"
import { Image } from "react-native"
import { ButtonView } from "../../components"
import { NavigationService, Util } from "../../utils"
import { title } from "../../utils/NavigatorHelper"
import { useSelector } from "react-redux"
import { getProfileData } from "../../ducks/auth"
import { useDebounce } from "../../hooks"

const CalendarScreen = ({ navigation, route }: IsNavigationRequiredProps) => {
  const profileData = useSelector(getProfileData)
  const headerTitle = route?.params?.title ?? "Calendar"

  const [isValue, setValue] = useState<string>("")
  const debouncedSearchTerm = useDebounce(isValue, 500)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...title(headerTitle, 17, Fonts.manrope.bold, true),
    })
  }, [])

  const onChangeText = (text: isTypeString) => {
    setValue(text)
  }

  const getSearch = () => {
    if (isValue) {
      return debouncedSearchTerm
    }
    return ""
  }

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "allevents":
        return (
          <AllEvents
            hideCalendar={headerTitle == "Upcoming Events"}
            getSearch={getSearch}
          />
        )
      case "generalevents":
        return (
          <GeneralEvents
            hideCalendar={headerTitle == "Upcoming Events"}
            getSearch={getSearch}
          />
        )
      case "customizedevents":
        return (
          <CustomizedEvents
            hideCalendar={headerTitle == "Upcoming Events"}
            getSearch={getSearch}
          />
        )
      default:
        return null
    }
  }

  return (
    <Block style={styles.containerStyle}>
      <Block style={styles.topTabContainer}>
        <SearchInput
          value={isValue}
          onChangeText={onChangeText}
          style={styles.btnSearch}
          iconStyle={styles.searchIcon}
          placeHolder={"Search events"}
          image={Images.icons.search}
          setValue={(e) => {
            setValue(e)
          }}
        />
      </Block>
      <ActivityTopTab renderScene={renderScene} tabData={CalendarRoutes} />
      {Util.isEmpty(profileData) && (
        <ButtonView
          style={styles.createButton}
          onPress={() => {
            NavigationService.navigate("CreateEvent")
          }}>
          <Image source={Images.icons.addIcon} style={styles.addImage} />
        </ButtonView>
      )}
    </Block>
  )
}

export default CalendarScreen
