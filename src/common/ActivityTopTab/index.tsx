/** @format */

import * as React from "react"
import { TextStyle, View } from "react-native"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import { Text } from ".."
import { Colors, Metrics } from "../../theme"
import styles from "./styles"

interface TabData {
  key: string
  title: string
}

interface CustomStyles {
  indicatorStyle?: any
  indicatorContainerStyle?: any
  tabStyle?: any
  tabbarStyle?: any
  labelStyle?: any
}

interface ActivityTopTabProps {
  tabData: TabData[]
  renderViews?: any // You may want to specify the correct type for renderViews
  scrollEnabled?: boolean
  customStyles?: CustomStyles
  setIndexVal?: (index: number, routes: TabData[]) => void
  renderScene?: (props: { route: TabData }) => React.ReactNode // Add this line
  count?: Array<any>
  // Add any other props you expect here
}

function ActivityTopTab({
  tabData,
  renderViews,
  scrollEnabled = false,
  customStyles = {},
  setIndexVal,
  count,
  ...rest
}: ActivityTopTabProps) {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState(tabData)
  const renderScene = SceneMap(renderViews)

  const renderTabBar = (props: any) => {
    return (
      <View>
        <TabBar
          {...props}
          indicatorStyle={customStyles?.indicatorStyle ?? styles.indicatorStyle}
          indicatorContainerStyle={
            customStyles?.indicatorContainerStyle ??
            styles.indicatorContainerStyle
          }
          tabStyle={customStyles?.tabStyle ?? styles.tabStyle}
          style={customStyles?.tabbarStyle ?? styles.tabbarStyle}
          labelStyle={customStyles?.labelStyle ?? styles.labelStyle}
          activeColor={Colors.DARK_PINK}
          pressColor={Colors.WHITE}
          scrollEnabled={scrollEnabled}
          renderLabel={({ route, focused, color, index }: any) => {
            let title = route?.title
            title = count ? `${count[route.index]}` : route?.title
            return (
              <Text
                samiBold
                style={
                  [
                    styles.labelStyle,
                    {
                      color: !focused ? Colors.DARK_GREY : Colors.DARK_PINK,
                    },
                  ] as TextStyle
                }>
                {title}
              </Text>
            )
          }}
        />
      </View>
    )
  }

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(e) => {
        setIndex(e)
        setIndexVal?.(e, routes)
      }}
      initialLayout={{ width: Metrics.screenWidth }}
      {...rest}
    />
  )
}

export default React.memo(ActivityTopTab)
