/** @format */

import configureStore from "./store"
import React, { useEffect, useState } from "react"
import { View, StatusBar } from "react-native"
import DataHandler from "./utils/DataHandler"
import NetworkInfo from "./utils/NetworkInfo"
import AppNavigator from "./navigator"
import { Provider } from "react-redux"
import SplashScreen from "react-native-splash-screen"
import { AlertModal, BottomSheet, DatePickerModal, FlashModal } from "./modal"
import { ConfigureApp, NotificationUtil, Util } from "./utils"
import ErrorBoundary from "react-native-error-boundary"
import { ErrorScreen } from "./screens"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { googleProfileRequestConfig } from "./config/SocialLogin"

ConfigureApp()
const App = () => {
  // set store state
  const [storeState, setStore] = useState(null)

  // when store is configured
  const onStoreConfigure = (store) => {
    //init things

    DataHandler.setStore(store)
    NetworkInfo.addNetInfoListener()

    GoogleSignin.configure({
      iosClientId: googleProfileRequestConfig.iosClientId,
    })

    setTimeout(() => {
      // hide splash
      setStore(store)
      NotificationUtil.configure()
      NotificationUtil.registerFCMListener()
    }, 1500)

    setTimeout(() => {
      SplashScreen.hide()
    }, 2500)
  }

  useEffect(() => {
    // configure store
    configureStore(onStoreConfigure)

    // unscribe to all things on unmount
    return () => {
      NetworkInfo.removeNetInfoListener()
    }
  }, [])

  if (storeState === null) {
    return null
  }
  const CustomFallback = (props) => (
    <ErrorScreen errorText={props?.error?.toString()} />
  )

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlashModal ref={(ref) => DataHandler.setFlashAlertModalRef(ref)} />
      <ErrorBoundary FallbackComponent={CustomFallback}>
        <Provider store={storeState}>
          <StatusBar
            barStyle={
              Util.isPlatformAndroid() ? "light-content" : "dark-content"
            }
          />
          <AlertModal ref={(ref) => DataHandler.setAlertModalRef(ref)} />
          <BottomSheet ref={(ref) => DataHandler.setBottomSheetModalRef(ref)} />
          <AppNavigator />
          <DatePickerModal
            ref={(ref) => DataHandler.setDatePickerModalRef(ref)}
          />
        </Provider>
      </ErrorBoundary>
    </View>
  )
}

export default App
