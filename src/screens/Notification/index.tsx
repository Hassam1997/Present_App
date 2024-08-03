/** @format */

import React, { useCallback, useState } from "react"
import { Block, NotificationCard, Text } from "../../common"
import { NOTIFICATION_LIST } from "../../config/Constants"
import { Colors, Fonts, Images } from "../../theme"
import {
  backButton,
  headerRightButton,
  title,
} from "../../utils/NavigatorHelper"
import styles from "./styles"
import { FlatList, Image } from "react-native"
import { NotificationData } from "../../dummyData"
import { NavigationService, Util } from "../../utils"
import { FlatListApi } from "../../components"
import { getNotifications, notificationListing } from "../../ducks/notification"

const Notification = ({ navigation }: IsNavigationRequiredProps) => {
  const [notification, setNotification] = useState(NotificationData)
  const [isNotificationAvailable, setIsNotificationAvailale] = useState(
    NotificationData?.find((e) => e)?.is_read
  )

  React.useEffect(() => {
    renderHeaderComponent()
  }, [navigation, isNotificationAvailable])

  const renderHeaderComponent = () => {
    navigation.setOptions({
      ...title("Notifications", 18, Fonts.manrope.bold),
      ...backButton(),
      ...headerRightButton("Mark all as read", markAllRead),
    })
  }

  const markAllRead = () => {
    const value = notification.map((item) => {
      return { ...item, is_read: false }
    })

    setIsNotificationAvailale(false)
    setNotification(value)
  }

  const renderEmptyComponent = () => (
    <Block style={styles.emptyComponent}>
      <Block style={styles.notificationEmptyContainer}>
        <Image
          style={styles.notificationImage}
          source={Images.images.notificationBell}
        />
      </Block>
      <Text color={Colors.DARK_GREY} body>
        No Notification!
      </Text>
    </Block>
  )
  const renderItem = ({ item, index }: RenderItemProps) => {
    return (
      <NotificationCard
        type={NOTIFICATION_LIST.LATEST}
        data={item}
        index={index}
        onPress={() => {
          if (item.notificationImage) {
            NavigationService.navigate("ProductDetail")
          } else {
            NavigationService.navigate("More")
          }
        }}
      />
    )
  }

  const renderSeperator = () => {
    return <Block style={styles.itemSeperator} />
  }
  const notificationList = useCallback(() => {
    return (
      <Block flex backgroundColor={Colors.WHITE}>
        {/* <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          data={notification}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyComponent}
          ItemSeparatorComponent={renderSeperator}
        /> */}
        <FlatListApi
          payload={{
            page: 1,
            limit: 10,
          }}
          emptyView={() => renderEmptyComponent()}
          contentContainerStyle={styles.contentContainerStyle}
          actionType={notificationListing.type}
          selectorData={getNotifications}
          requestAction={notificationListing.request}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeperator}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => `${item.id}+${index}`}
        />
      </Block>
    )
  }, [notification])

  return notificationList()
}

export default Notification
