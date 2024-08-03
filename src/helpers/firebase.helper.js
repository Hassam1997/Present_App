import firebase from "@react-native-firebase/app";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";

let instance = null;

class FirebaseService {
  constructor() {
    if (!instance) {
      this.firebase = firebase;
      this.auth = auth;
      this.database = database;
      this.messaging = messaging;
      this.firestore = firestore;
      instance = this;
    }
    return instance;
  }
}

const firebaseService = new FirebaseService();
export default firebaseService;
