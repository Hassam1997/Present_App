/** @format */

import PushNotificationIOS from "@react-native-community/push-notification-ios"
import messaging from "@react-native-firebase/messaging"
import PushNotification from "react-native-push-notification"
import { Util, NavigationService, DataHandler } from "."
import { getUserData } from "../ducks/auth"
// import { caregiverEndService, hideButton } from "../ducks/caregiver";
// import { isTrackAppointment } from "../ducks/general";
// import { getUserRole } from "../ducks/userRole";

// import { addNotificationCount, requestGetActivities } from "../ducks/activity";
// import DataHandler from "./DataHandler";

class NotificationUtil {
  unsubscribe

  getPermission = async () => {
    const authorizationStatus = await messaging().requestPermission()
    const enabled =
      authorizationStatus !== messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus !== messaging.AuthorizationStatus.PROVISIONAL

    return enabled
  }

  getTokenPromise = async () => {
    await messaging().registerDeviceForRemoteMessages()
    return new Promise((resolve, reject) => {
      messaging()
        .getToken()
        .then((token) => {
          console.log("token", token)
          resolve(token)
        })
        .catch((e) => {
          console.log(e, "error_fcm")
          resolve("")
        })
    })
  }

  createChannel = () => {
    PushNotification.channelExists("kinektPatient", (exists) => {
      if (!exists) {
        PushNotification.createChannel(
          {
            channelId: "kinektPatient", // (required)
            channelName: "default channel", // (required)
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
          },
          (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        )
      }
    })
  }

  setBadge(val = 0) {
    if (Util.isPlatformAndroid()) {
      PushNotification.setApplicationIconBadgeNumber(val)
    } else {
      PushNotificationIOS.setApplicationIconBadgeNumber(val)
    }
  }

  showLocalNotification = (title, message, userInfo) => {
    PushNotification.localNotification({
      channelId: "kinektPatient",
      title: title, // (optional)
      message: message,
      autoCancel: true,
      largeIcon: "",
      vibrate: true,
      vibration: 300,
      priority: "high",
      ignoreInForeground: false,
      onlyAlertOnce: false,
      playSound: true,
      soundName: "default",
      invokeApp: true,
      userInfo,
    })
  }

  getPayload = (payload, index) => {
    try {
      if (payload?.data || payload) {
        const payloadObject = payload?.data
        let Obj = [
          {
            array: [
              {
                site_id: payloadObject?.site_id,
                id: payloadObject?.sender_id,
                biz_name: payloadObject?.clinic_name,
                profile_pic_url: payloadObject?.sender_avatar,
              },
              {
                service_agent_id: payloadObject?.service_agent_id,
                site_id: payloadObject?.site_id,
                subscriber_id: payloadObject?.subscriber_id,
                appointmentId: payloadObject?.appointmentId,
                id: payloadObject?.id,
              },
            ],
          },
        ]
        let object = Object.assign(...Obj)
        return object.array[index]
      }
    } catch (error) {
      return ""
    }
  }

  handleLocalNotificationChat = (data, notification) => {
    try {
      this.showLocalNotification(notification.title, notification.body, data)
    } catch (error) {
      //return '';
    }
  }

  handleNotification = (remoteMessage) => {
    const userData = getUserData(DataHandler.getStore().getState())
    if (userData?.id) {
      if (remoteMessage?.data?.identifier == "CHAT_MESSAGE") {
        NavigationService.navigate("ChatScreen", {
          data: this.getPayload(remoteMessage, 0),
        })
      }
      if (remoteMessage?.data?.identifier == "FEEDBACK_PENDING") {
        NavigationService.navigate("ReqFeedback", {
          data: this.getPayload(remoteMessage, 1),
        })
      }
      if (remoteMessage?.data?.identifier == "FEEDBACK_COMPLETED") {
        NavigationService.navigate("ReqFeedback", {
          data: JSON.parse(remoteMessage.data?.revised),
        })
      }
      if (remoteMessage?.data?.identifier == "SOCIAL_PENDING") {
        NavigationService.reset("Social")
      }
      console.log("===============================")
      console.log(remoteMessage.data)
    }
  }

  registerFCMListener = () => {
    this.getPermission()

    this.createChannel()

    this.setBadge()

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      if (remoteMessage.notification) {
        console.log("Message handled in the background!", remoteMessage)
      }
    })

    messaging().onNotificationOpenedApp((remoteMessage) => {
      this.handleNotification(remoteMessage)
    })

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          this.handleNotification(remoteMessage)
        }
      })

    this.unsubscribe = messaging().onMessage(({ data, notification }) => {
      Util.notificationCount()
      if (notification) {
        if (NavigationService.getCurrentRouteName() != "ChatScreen") {
          this.showLocalNotification(
            notification.title,
            notification.body,
            data
          )
        }
      }
    })
  }

  configure = () =>
    PushNotification.configure({
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: this.handleNotification, //(...all) => console.log(...all, 'all'),
    })

  unRegisterFCMListener() {
    this.unsubscribe?.()
  }

  removeAllNotifications() {
    if (Util.isPlatformAndroid()) {
      PushNotification.removeAllDeliveredNotifications()
      PushNotification.setApplicationIconBadgeNumber(0)
    } else {
      PushNotificationIOS.removeAllDeliveredNotifications()
      PushNotificationIOS.setApplicationIconBadgeNumber(0)
    }
    this.setBadge()
  }
}
export default new NotificationUtil()
