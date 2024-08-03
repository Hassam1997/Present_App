/** @format */
import Contacts from "react-native-contacts"
import PermissionUtil from "./PermissionUtil"

async function _handleContacts(callBack: CallbackFunction) {
  try {
    PermissionUtil.checkMultiplePermission(
      PermissionUtil.types.CONTACTS,
      () => {
        Contacts.getAll().then((contacts) => {
          callBack(contacts)
        })
      }
    )
  } catch (e) {
    console.log(e, "pop")
  }
}

export default {
  _handleContacts,
}
