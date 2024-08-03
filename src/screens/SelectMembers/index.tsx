/** @format */

import React, { useState, useEffect } from "react"
import {
  ActivityTopTab,
  AppButton,
  Block,
  ContactsCard,
  Groups,
} from "../../common"
import styles from "./styles"
import { Images, Metrics } from "../../theme"
import { NavigationService, Util } from "../../utils"
import SearchInput from "../../common/SearchInput"
import {
  backButton,
  customHeader,
  headerRightButton,
} from "../../utils/NavigatorHelper"
import { MembersRoutes } from "../../data"
import { FlatList, Image } from "react-native"
import { ButtonView, ImageView, Loader } from "../../components"
import { useDispatch } from "react-redux"
import { ContactDataUtil, DashBoardUtil } from "../../dataUtils"
import { useDebounce } from "../../hooks"
import {
  homeProductSaveForContacts,
  homeProductSaveForEvents,
} from "../../ducks/home"

const SelectEvents = ({ navigation, route }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch()
  const callBack = route.params?.callBack ?? undefined
  const dateString = route.params?.date ?? undefined
  const isSave = route.params?.isSave ?? false
  const selected_member = route?.params?.selected_member ?? []
  const productData = route?.params?.data ?? undefined
  const filter_event = route?.params.filter_key ?? 0
  const arrayKey = route?.params?.arrayKey ?? ""

  const [isValue, setValue] = useState("")
  const [selectedIdentifier, setSelectedIdentifier] =
    useState<any[]>(selected_member)
  const debouncedSearchTerm = useDebounce(isValue, 500)

  const callApi = () => {
    const dispatchAction = isSave
      ? homeProductSaveForContacts
      : homeProductSaveForEvents
    let contacts: Array<number> = []
    let groups: Array<number> = []
    for (let i = 0; i < selectedIdentifier.length; i++) {
      if (selectedIdentifier[i]?.contacts) {
        groups.push(selectedIdentifier[i].id)
      } else {
        contacts.push(selectedIdentifier[i].id)
      }
    }
    let payload = {
      product_id: DashBoardUtil.id(productData),
      platform: DashBoardUtil.platform(productData),
      contacts: contacts,
      groups: groups,
      ...(!isSave ? { event_id: filter_event } : null),
    }
    dispatch(
      dispatchAction.request({
        payloadApi: payload,
        updateKey: arrayKey,
        cb: (data: any) => {
          if (arrayKey) {
            Util.showCustomMessage(
              "The gift has been saved successfully!",
              "success"
            )
          } else {
            Util.showCustomMessage(
              "The link has been saved successfully!",
              "success"
            )
          }
          setTimeout(() => {
            NavigationService.reset("HomeScreen")
          }, 500)
        },
      })
    )
  }

  const onChangeText = (text: isTypeString) => {
    setValue(text)
  }

  const getSearch = () => {
    if (isValue) {
      return debouncedSearchTerm
    }
    return ""
  }

  React.useLayoutEffect(() => {
    renderHeaderComponent()
  }, [navigation])

  // const HanldeSkiped = () => {
  //   Util.showCustomMessage("The gift has been saved successfully!")
  //   setTimeout(() => {
  //     NavigationService?.navigate("HomeScreen")
  //   }, 2000)
  // }
  const renderHeaderComponent = () => {
    navigation.setOptions({
      ...backButton(() => {
        NavigationService?.pop()
      }, Images.icons.cross),
      // ...headerRightButton("Skip", HanldeSkiped),
      ...customHeader("Select Members"),
    })
  }

  const renderItem = ({ item, index }: RenderItemProps) => {
    return (
      <Block style={styles.imageSliderView}>
        <ImageView
          source={{ uri: ContactDataUtil.image(item) }}
          style={styles.imageView}
          placeholderStyle={styles.imageView}
          borderRadius={50}
        />
        <ButtonView
          debounceTime={0}
          onPress={() => {
            if (selectedIdentifier.find((e) => e.id == item?.id)) {
              const dummy = selectedIdentifier.filter(
                (val) => val.id != item.id
              )
              setSelectedIdentifier([...dummy])
            }
          }}
          style={styles.crossIconStyle}>
          <Image source={Images.icons.crossIcon} />
        </ButtonView>
      </Block>
    )
  }

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "contacts":
        return (
          <ContactsCard
            getSearch={getSearch}
            onPress={(item: any) => {
              if (selectedIdentifier.find((e) => e.id == item?.id)) {
                const dummy = selectedIdentifier.filter(
                  (val) => val.id != item.id
                )
                setSelectedIdentifier([...dummy])
              } else {
                selectedIdentifier.push(item)
                setSelectedIdentifier([...selectedIdentifier])
              }
            }}
            selectedIdentifier={selectedIdentifier}
            filter_event={filter_event}
          />
        )

      case "groups":
        return (
          <Groups
            getSearch={getSearch}
            onPress={(item: any) => {
              if (selectedIdentifier.find((e) => e.id == item?.id)) {
                const dummy = selectedIdentifier.filter(
                  (val) => val.id != item.id
                )
                setSelectedIdentifier([...dummy])
              } else {
                selectedIdentifier.push(item)
                setSelectedIdentifier([...selectedIdentifier])
              }
            }}
            selectedIdentifier={selectedIdentifier}
            filter_event={filter_event}
          />
        )

      default:
        return null
    }
  }

  return (
    <Block style={styles.containerSearch}>
      <SearchInput
        paddingHorizontal={Metrics.ratio(16)}
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
      <Block flex>
        <ActivityTopTab
          renderScene={renderScene}
          tabData={MembersRoutes}
          customStyles={{
            indicatorStyle: styles.indicatorStyle,
            indicatorContainerStyle: styles.indicatorContainerStyle,
            tabbarStyle: styles.tabbarStyle,
            labelStyle: styles.labelStyle,
            tabStyle: styles.tabStyle,
          }}
        />
      </Block>
      <Block style={[styles.bottomContainer]}>
        <FlatList
          data={selectedIdentifier}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Block width={15} />}
        />
        <AppButton
          title={isSave ? "Save" : "Done"}
          disabled={selectedIdentifier.length > 0 ? false : true}
          onPress={() => {
            if (callBack) {
              callBack(selectedIdentifier, dateString)
              return
            } else {
              callApi()
            }
          }}
        />
      </Block>
      <Loader
        type={[homeProductSaveForEvents.type, homeProductSaveForContacts.type]}
      />
    </Block>
  )
}

export default SelectEvents
