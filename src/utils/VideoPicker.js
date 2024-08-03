import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { ActionSheetIOS, Platform, Alert } from "react-native";
import { DataHandler, PermissionUtil, Util } from "../utils";
import { MediaPickerData } from "../data";
import { createThumbnail } from "react-native-create-thumbnail";

class VideoPicker {
  // default image quality
  defaultVideoQuality = "high";
  // is platform android
  isPlatFromAndroid = Platform.OS === "android";
  // is platform ios
  isPlatFromIOS = Platform.OS === "ios";
  // default options gallery
  defaultGalleryOptions = {
    mediaType: "video",
    includeExtra: false,
    selectionLimit: 1,
    trimming: false,
    askPermissionAndroid: false,
  };
  // default options camera
  defaultCameraOptions = {
    mediaType: "video",
    videoQuality: this.defaultVideoQuality,
    saveToPhotos: false,
    trimming: false,
    cameraType: "back",
  };
  /**
   * Pick Video from gallery
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *  1 ) selectionLimit
   *    a) 1 [default value] (can select single)
   *    b) 0 (can select multiple)
   *    c) any integer IOS ONLY (max files user can select)
   *  2 ) includeExtra [default false] (Boolean true /false) (need extra gallery permission , we will have exif data of image )
   *  3 ) askPermissionAndroid [FOR ANDROID] [default false] if you need permission explicitly
   *  4 ) trimming [default false] (Boolean true /false)
   *  5 ) durationLimit [in seconds] (max duration you want)
   *
   * @return  single image object(selectionLimit=1) or array of images(selectionLimit=0)
   */
  pickVideoFromGallery = async (callback, options = {}) => {
    // set gallery options
    const galleryOptions = {
      ...this.defaultGalleryOptions,
      ...options,
    };
    // check if we need permission or not
    const enableDefault =
      (this.isPlatFromIOS && galleryOptions.includeExtra === false) ||
      (this.isPlatFromAndroid && galleryOptions.askPermissionAndroid === false);
    PermissionUtil.checkPermission(
      PermissionUtil.types.GALLERY,
      async () => {
        // open image library
        const result = await launchImageLibrary(galleryOptions);
        // videos selected
        const videosSelected = result?.assets ?? [];
        // result is ok and video are selected
        if (Util.isNotEmpty(videosSelected)) {
          // if it is single selection
          if (galleryOptions.selectionLimit === 1) {
            callback?.(videosSelected[0]);
          } else {
            callback?.(videosSelected);
          }
        }
      },
      enableDefault
    );
  };
  /**
   * record video from camera
   *
   * @param {*} callback function which handle the response
   * @param {*} options  customize attributes
   *  1 ) cameraType [default back] 'back' or 'front'. May not be supported in few android devices
   *  2 ) videoQuality [default high] ('low', 'medium', or 'high' on iOS, 'low' or 'high' on Android)
   *  3 ) askPermissionCameraAndroid [FOR ANDROID] [default false] (if you do not need permission do not add in manifest) if you need permission explicitly (must add <uses-permission android:name="android.permission.CAMERA"/> in manifest)
   *  4 ) askPermissionMicrophoneAndroid [FOR ANDROID] [default false] (if you do not need permission do not add in manifest) if you need permission explicitly (must add <uses-permission android:name="android.permission.RECORD_AUDIO" /> in manifest)
   *  5 ) trimming [default false] (Boolean true /false)
   *  6 ) durationLimit [in seconds] (max duration you want)
   *  7 ) saveToPhotos [default false] [if you need to save in camera roll for ios required permission for android WRITE_EXTERNAL_STORAGE permission on Android 28 and below]
   *
   * @return  single image object(selectionLimit=1) or array of images(selectionLimit=0)
   */
  recordVideoCamera = async (callback, options) => {
    // set camera options
    const cameraOptions = {
      ...this.defaultCameraOptions,
      ...options,
    };
    // set permission array
    const permissionArray = [];
    // check if  we need camera  permission permission (add in mainfest if you require in android)
    if (this.isPlatFromIOS || cameraOptions.askPermissionCameraAndroid) {
      permissionArray.push(PermissionUtil.types.CAMERA);
    }
    // check if  we need   microphone permission (add in mainfes if you require in android)
    if (this.isPlatFromIOS || cameraOptions.askPermissionMicrophoneAndroid) {
      permissionArray.push(PermissionUtil.types.MICROPHONE);
    }
    // check if we need gallery permission
    if (
      cameraOptions.saveToPhotos &&
      (this.isPlatFromIOS || (this.isPlatFromAndroid && Platform.Version <= 32))
    ) {
      permissionArray.push(PermissionUtil.types.GALLERY);
    }
    // check if we need permission or not
    const enableDefault = permissionArray.length === 0;
    // open camera
    const result = await launchCamera(cameraOptions);
    // result is ok and video are selected
    if (Util.isNotEmpty(result.assets)) {
      callback?.(result.assets[0]);
    }
    // check permission first
    // PermissionUtil.checkMultiplePermission(
    //   permissionArray,
    //   async () => {
    //     // open camera
    //     const result = await launchCamera(cameraOptions);
    //     // result is ok and video are selected
    //     if (Util.isNotEmpty(result.assets)) {
    //       callback?.(result.assets[0]);
    //     }
    //   },
    //   enableDefault
    // );
  };
  showGalleryAndCameraOptions = async (callback, options = {}) => {
    // if (Platform.OS === "ios") {
    //   // show options for ios
    //   ActionSheetIOS.showActionSheetWithOptions(
    //     {
    //       options: ["Cancel", "Camera", "Gallery"],
    //       cancelButtonIndex: 0,
    //     },
    //     (buttonIndex) => {
    //       if (buttonIndex === 1) {
    //         this.recordVideoCamera(callback, options);
    //       } else if (buttonIndex === 2) {
    //         this.pickVideoFromGallery(callback, options);
    //       }
    //     }
    //   );
    // } else {
    //   // show options for android
    //   Alert.alert("Select Option", "", [
    //     {
    //       text: "Camera",
    //       onPress: () => {
    //         this.recordVideoCamera(callback, options);
    //       },
    //     },
    //     {
    //       text: "Gallery",
    //       onPress: () => {
    //         this.pickVideoFromGallery(callback, options);
    //       },
    //     },
    //     {
    //       text: "Cancel",
    //       onPress: () => {},
    //     },
    //   ]);
    // }
    DataHandler.getBottomSheetModalRef().show({
      title: "Select Option",
      dataSet: MediaPickerData,
      callback: (e) => {
        switch (e.identifier) {
          case "CAMERA":
            this.recordVideoCamera(callback, options);
            break;
          case "GALLERY":
            this.pickVideoFromGallery(callback, options);
            break;
          default:
        }
      },
    });
  };

  createVideoThumbnail = async (data, callback) => {
    const duration = Math.ceil(data.duration);
    createThumbnail({
      url: data?.uri ?? "",
      timeStamp: 10000,
    })
      .then((response) => {
        var filename = response.path.replace(/^.*[\\\/]/, "");
        if (duration <= 301 && response) {
          const file = {
            uri: response.path,
            name: filename,
            type: "image/jpeg",
          };
          callback?.(file);
        } else {
          Util.showCustomMessage("Video maximum duration 1 minute!");
        }
      })
      .catch((err) => console.log({ err }));
  };
}
export default new VideoPicker();
