/** @format */

import React, { useState } from "react"
import { FlatList, Image } from "react-native"
import { AppButton, Block, FullCalender, Seperator, Text } from "../../common"
import { Colors, Images } from "../../theme"
import styles from "./styles"
import { ButtonView, ImageView, Loader } from "../../components"
import { ContactsUtil, DataHandler, NavigationService, Util } from "../../utils"
import {
  CONTACT_TYPE_ENUM,
  DATE_PICKER_TYPE,
  DATE_SERVER_FORMAT,
  MONTH_DATE_FORMATE_2,
} from "../../config/Constants"
import { ContactDataUtil } from "../../dataUtils"
import { saveContactsList } from "../../ducks/contacts"
import { useDispatch } from "react-redux"

const SelectEvents = ({ navigation, route }: IsNavigationRequiredProps) => {
  const dispatch = useDispatch()
  const callBackFunction = route.params?.callBack ?? undefined
  const selectedDatesData = route?.params?.selectedDates ?? []
  const selectedIdentifierData = route?.params?.selectedIdentifier ?? {}

  const [initialDate, setInitialDate] = useState<string>(
    Util.formatDate(new Date(), DATE_SERVER_FORMAT)
  )
  const [selectedIdentifier, setSelectedIdentifier] = useState<any>(
    selectedIdentifierData
  )
  const [selectedDates, setSelectedDates] = useState<any>(selectedDatesData)
  console.log(selectedDatesData)

  const callBack = (selectedData: [], date: any) => {
    const updatedSelectedIdentifier = { ...selectedIdentifier }
    const updatedSelectedDates = [...selectedDates]
    console.log(updatedSelectedDates.includes(date))

    if (updatedSelectedDates.includes(date)) {
      updatedSelectedIdentifier[date] = selectedData
      setSelectedIdentifier(updatedSelectedIdentifier)
    } else {
      updatedSelectedDates.push(date)
      updatedSelectedIdentifier[date] = selectedData
      setSelectedDates(updatedSelectedDates)
      setSelectedIdentifier(updatedSelectedIdentifier)
    }
    setTimeout(() => {
      NavigationService.goBack()
    }, 100)
  }

  const datePickerShow = (onChange?: (date: Date) => void) => {
    DataHandler.getDatePickerModalRef().show({
      mode: DATE_PICKER_TYPE.DATE,
      isMaximum: true,
      isMinimum: false,
      onSelected: (date: Date) => {
        const formattedServerDate = Util.formatDate(date, DATE_SERVER_FORMAT)
        setInitialDate(formattedServerDate)
      },
      date: initialDate,
      extraProps: {
        minimumDate: Util.stringToDateObject("1950-01-01"),
      },
      displayMode: "spinner",
    })
  }

  const callApi = (payload: Array<any>, dateString: string) => {
    dispatch(
      saveContactsList.request({
        payloadApi: payload,
        cb: (data: any) => {
          NavigationService.navigate("SelectMembers", {
            callBack: callBack,
            date: dateString,
            selected_member: selectedDates.find((e) => e == dateString)
              ? selectedIdentifier[dateString]
              : [],
          })
        },
      })
    )
  }

  const headerComponennt = () => {
    return (
      <Block>
        <ButtonView
          onPress={() => datePickerShow()}
          style={styles.calenderButton}>
          <Text samiBold size={15} color={Colors.TITLE_TEXT}>
            {Util.formatDate(initialDate, MONTH_DATE_FORMATE_2)}
          </Text>
          <Image
            style={styles.imageStyle}
            resizeMode={"contain"}
            source={Images.icons.arrowDownIcon}
          />
        </ButtonView>
        <FullCalender
          initialDate={initialDate}
          onPress={(dateString: any) => {
            ContactsUtil._handleContacts((response: any) => {
              let contactsData: any = []
              response.map((item: Record<any, string>) => {
                if (ContactDataUtil.phone_number(item) != "") {
                  contactsData.push({
                    full_name: ContactDataUtil.full_name(item),
                    dob: ContactDataUtil.dob(item),
                    image: ContactDataUtil.thumbnailPath(item),
                    contact_type: CONTACT_TYPE_ENUM.PHONE,
                    phone_number: ContactDataUtil.phone_number(item),
                  })
                }
              })
              callApi(contactsData, dateString)
            })
          }}
        />
        <Seperator single={true} />
        <Block>
          <Text samiBold size={15} color={Colors.TITLE_TEXT}>
            Contacts Added
          </Text>
          <Text p size={14} color={Colors.TITLE_TEXT} marginTop={10}>
            {selectedDates.length > 0
              ? "Click on date to add contacts"
              : "No contacts added yet, Click on date to add contacts"}
          </Text>
          <Seperator single={true} />
        </Block>
      </Block>
    )
  }

  const renderItemHorizontal = (item, date) => {
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
            const updatedArray = selectedIdentifier[date].filter(
              (element) => element.id !== item.id
            )
            if (updatedArray.length === 0) {
              const updatedIdentifier = { ...selectedIdentifier }
              delete updatedIdentifier[date]
              setSelectedIdentifier(updatedIdentifier)
              const updatedDatesArray = selectedDates.filter(
                (deleteDate) => deleteDate !== date
              )
              setSelectedDates(updatedDatesArray)
            } else {
              setSelectedIdentifier({
                ...selectedIdentifier,
                [date]: updatedArray,
              })
            }
          }}>
          <Image
            source={Images.icons.crossIcon}
            style={styles.crossIconStyle}
          />
        </ButtonView>
      </Block>
    )
  }

  const renderItems = ({ item, index }: RenderItemProps) => {
    const date = item
    return (
      <>
        <Block row align>
          <Image source={Images.icons.calendar1} style={styles.crossIcon} />
          <Text medium size={14} color={Colors.TITLE_TEXT} left={5}>
            {date}
          </Text>
        </Block>
        <FlatList
          data={selectedIdentifier[date]}
          renderItem={
            ({ item }) => renderItemHorizontal(item, date) // Pass both date and horizontalItem to renderItemHorizontal
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Block width={15} />}
        />
      </>
    )
  }

  return (
    <>
      <Block style={styles.containerStyle}>
        <FlatList
          data={selectedDates}
          showsVerticalScrollIndicator={false}
          renderItem={renderItems}
          ItemSeparatorComponent={() => (
            <Seperator
              single={true}
              containerStyle={{
                marginVertical: 10,
              }}
            />
          )}
          ListHeaderComponent={() => headerComponennt()}
          ListFooterComponent={() => <Block height={30} />}
        />
      </Block>
      {selectedDates.length > 0 && (
        <Block style={[styles.bottomContainer]}>
          <AppButton
            title="Done"
            onPress={() => {
              if (callBackFunction) {
                callBackFunction(selectedDates, selectedIdentifier)
                return
              }
            }}
          />
        </Block>
      )}
      <Loader type={saveContactsList.type} />
    </>
  )
}

export default SelectEvents
