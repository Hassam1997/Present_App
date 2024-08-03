import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { ActionSheetIOS, Platform, Alert } from "react-native";
import { DataHandler, PermissionUtil, Util } from "../utils";

class AudioRecorder {
  constructor() {
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }
  /**
   * Record Audio
   *
   * @param {*} callback function which handle the response
   * @param {*} data  customize parameters
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
  recordAudio = async (data, callback) => {
    // check if we need permission or not
    PermissionUtil.checkPermission(
      PermissionUtil.types.MICROPHONE,
      async () => {
        const result = await this.audioRecorderPlayer.startRecorder();
        this.audioRecorderPlayer.addRecordBackListener((e) => {
          callback?.(e);
        });
      }
    );
  };
}
export default new AudioRecorder();
