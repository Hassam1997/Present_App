/** @format */

import React from "react"
import { Image, TextInput, View } from "react-native"
import { ButtonView } from "../../components"
import { Colors, Images } from "../../theme"
import styles from "./styles"
import { Block, Text } from "../../common"
import { NavigationService } from "../../utils"

interface SearchInputProps {
  style?: any
  image?: any
  iconStyle?: object
  placeHolder?: string
  onPress?: () => void
  onCancel?: () => void
  onChangeText?: (text: string) => void
  value?: string
  setValue?: (value: any) => void
  onFilter?: () => void
  isFiltered?: boolean
  filterIcon?: any
  paddingHorizontal?: number
  disaled?: Boolean
  getSearch?: any
}

const SearchInput: React.FC<SearchInputProps> = ({
  style = styles.textInputStyle,
  image = Images.icons.search,
  filterIcon = Images.icons.filter,
  iconStyle,
  placeHolder = "Search",
  onPress,
  onCancel,
  onChangeText,
  value = "",
  setValue,
  onFilter,
  isFiltered,
  paddingHorizontal,
  disaled,
  getSearch,
}) => {
  const TagView = onPress ? ButtonView : Block
  return (
    <Block
      style={[
        styles.parent,
        {
          paddingHorizontal: paddingHorizontal,
        },
      ]}>
      <TagView style={styles.container} onPress={onPress}>
        <Image source={image} style={iconStyle} />
        {onPress ? (
          <Text
            p
            size={14}
            color={Colors.PRIMARY}
            style={styles.placeHolder}
            numberOfLines={1}>
            {placeHolder}
          </Text>
        ) : (
          <TextInput
            placeholder={placeHolder}
            placeholderTextColor={Colors.DARK_GREY}
            onChangeText={onChangeText}
            value={value}
            style={style}
            onSubmitEditing={() => {
              getSearch?.()
            }}
          />
        )}
        {value && (
          <ButtonView
            onPress={() => (disaled ? NavigationService.pop() : setValue?.(""))}
            style={styles.cancelButton}>
            <Image
              source={Images.icons.cross}
              style={styles.crossRadiusImage}
            />
          </ButtonView>
        )}
        {onFilter && value == "" && (
          <ButtonView onPress={onFilter} style={styles.searchFilterView}>
            {isFiltered && <Image source={filterIcon} />}
          </ButtonView>
        )}
      </TagView>

      {onCancel && (
        <ButtonView onPress={onCancel} style={styles.btnCancelStyle}>
          <Text medium size={13} color={Colors.PRIMARY}>
            Cancel
          </Text>
        </ButtonView>
      )}
    </Block>
  )
}

SearchInput.defaultProps = {
  style: {},
  image: Images.icons.search,
  iconStyle: {},
  placeHolder: "Search",
  onPress: undefined,
  onCancel: undefined,
  onChangeText: undefined,
  value: "",
  setValue: undefined,
  onFilter: undefined,
  isFiltered: false,
}

export default SearchInput
