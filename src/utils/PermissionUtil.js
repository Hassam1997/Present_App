/** @format */

import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  checkMultiple,
  requestMultiple,
} from "react-native-permissions"
import { Platform, Alert, Linking } from "react-native"

import { Util } from "./index"

class PermissionUtil {
  // types define

  types = {
    GALLERY: "gallery",
    CAMERA: "camera",
    MICROPHONE: "microphone",
    CONTACTS: "contacts",
  }

  // gallery permissions
  cameraPermission =
    Platform.OS === "android"
      ? PERMISSIONS.ANDROID.CAMERA
      : PERMISSIONS.IOS.CAMERA

  // gallery permissions
  galleryPermission =
    Platform.OS === "android"
      ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
      : PERMISSIONS.IOS.PHOTO_LIBRARY

  // microPhone permissions
  microphonePermission =
    Platform.OS === "android"
      ? [
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ]
      : [PERMISSIONS.IOS.MICROPHONE]

  // constacts permissions
  contactsPermission =
    Platform.OS === "android"
      ? [PERMISSIONS.ANDROID.READ_CONTACTS, PERMISSIONS.ANDROID.WRITE_CONTACTS]
      : [PERMISSIONS.IOS.CONTACTS]

  // check permissions gallery and camera
  checkPermission = (type, callback) => {
    const permission = this.getPermissionFromType(type)

    check(permission)
      .then((result) => {
        console.log("result", result)
        switch (result) {
          case RESULTS.UNAVAILABLE:
            this.showAlert(
              "This feature is not available (on this device / in this context)"
            )
            break
          case RESULTS.GRANTED:
            callback()
            break
          case RESULTS.DENIED:
            request(permission).then((resultPermissions) => {
              if (resultPermissions === RESULTS.GRANTED) {
                callback()
              }
            })
            break
          case RESULTS.LIMITED:
          case RESULTS.BLOCKED:
            this.openSettingModal(type)
            break
        }
      })
      .catch((error) => {
        console.log("error", error)
        this.showAlert(
          "This feature is not available (on this device / in this context)"
        )
      })
  }

  checkMultiplePermission = (type, callback) => {
    const permission = this.getPermissionFromType(type)

    checkMultiple(permission)
      .then((result) => {
        console.log(
          permission,
          "result",
          result,
          RESULTS.DENIED,
          RESULTS.UNAVAILABLE,
          result["ios.permission.CONTACTS"]
        )
        if (RESULTS.DENIED) {
          requestMultiple(permission).then((resultPermissions) => {
            console.log(resultPermissions, "resultPermissions")
            const grantedPermissions = Object.values(resultPermissions)
            if (
              grantedPermissions.every(
                (permission) => permission === RESULTS.GRANTED
              )
            ) {
              callback()
            }
          })
        } else if (RESULTS.UNAVAILABLE) {
          this.showAlert(
            "This feature is not available (on this device / in this context)"
          )
        } else if (RESULTS.GRANTED) {
          callback()
        } else if (RESULTS.BLOCKED) {
          this.openSettingModal(type)
        }
      })
      .catch((error) => {
        console.log("error", error)
        this.showAlert(
          "This feature is not available (on this device / in this context)"
        )
      })
  }

  // show alert message
  showAlert(message) {
    Util.showCustomMessage(message, "danger", 5000)
  }

  // ger permission from type
  getPermissionFromType = (type) => {
    if (type === this.types.GALLERY) {
      return this.galleryPermission
    }
    if (type === this.types.CAMERA) {
      return this.cameraPermission
    }
    if (type === this.types.MICROPHONE) {
      return this.microphonePermission
    }
    if (type === this.types.CONTACTS) {
      return this.contactsPermission
    }
    return this.galleryPermission
  }

  // ger permission title and description from type
  getPermissionTitleAndDescription = (type) => {
    // get os
    const os = Platform.OS
    // if type is gallery
    if (type === this.types.GALLERY) {
      return {
        title: Util.isPlatformIOS()
          ? "Photos Permission Required"
          : "Files And Media Permission Required",
        description: Util.isPlatformIOS()
          ? "Open Settings => Select Photos => Enable All Photos"
          : "Open Settings => Select Permissions => Select Files and media => Enable Allow access to media",
      }
    }
    // if type is camera
    if (type === this.types.CAMERA) {
      return {
        title: "Camera Permission Required",
        description: Util.isPlatformIOS()
          ? "Open Settings => Enable Camera"
          : "Open Settings => Select Permissions => Select Camera => Allow only while using app",
      }
    }

    // if type is audio
    if (type === this.types.MICROPHONE) {
      return {
        title: "Audio Permission Required",
        description: Util.isPlatformIOS()
          ? "Open Settings => Enable Audio"
          : "Open Settings => Select Permissions => Select Audio => Allow only while using app",
      }
    }

    // if type is contacts
    if (type === this.types.CONTACTS) {
      return {
        title: "Audio Permission Required",
        description: Util.isPlatformIOS()
          ? "Open Settings => Enable Contacts"
          : "Open Settings => Select Permissions => Select Contacts => Allow only while using app",
      }
    }
    return { title: "", description: "" }
  }

  // open settings modal
  openSettingModal = (type) => {
    // get title and desription from type
    const { title, description } = this.getPermissionTitleAndDescription(type)

    // show alert
    Alert.alert(
      title,
      description,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Open Settings",
          onPress: () => Linking.openSettings(),
        },
      ],
      { cancelable: false }
    )
  }
}

export default new PermissionUtil()
