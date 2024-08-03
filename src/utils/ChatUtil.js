import { getUserData } from "../ducks/auth";
import DataHandler from "./DataHandler";
import firebaseService from "../helpers/firebase.helper";
import UploadImageAws from "./UploadImageAws";
import Util from "./Util";
import { deleteChat, getchatListIdentifier } from "../ducks/chat";

function createChatRoom(messages, url) {
  return firebaseService
    .firestore()
    .collection("mobilechats")
    .doc(`${messages[0].path}`)
    .set({
      receiver_id: messages[0].receiver.id,
      receiver_name: messages[0].receiver.name,
      receiver_image: messages[0].receiver.avatar,
      type: messages[0].type,
      last_msg: url ?? messages[0].value,
      createdAt: messages[0].createdAt,
      sender_id: messages[0].user_id,
      sender_name: messages[0].name,
      sender_image: messages[0].image,
      chatRoomId: messages[0].path,
      isRead: false,
      client_id: messages[0].receiver.client_id,
    });
}

async function addFirestore(messages, url) {
  const chatRoomId = await createChatRoom(messages, url);
  firebaseService
    .firestore()
    .collection("mobilechats")
    .doc(`${messages[0].path}`)
    .collection("messages")
    .add({
      receiver: messages[0].receiver,
      type: messages[0].type,
      value: url ?? messages[0].value,
      createdAt: messages[0].createdAt,
      sender_role: messages[0].user_id,
      sender_name: messages[0].name,
      sender_image: messages[0].image,
      ...(messages[0].type == "video" && { thumbnail: messages[0].thumbnail }),
    });
}

const uploadMedia = (messages) => {
  UploadImageAws.UploadImageOnS3(
    messages[0].value,
    (succes) => {
      console.log("LOG::::", succes);
      addFirestore(messages, succes);
    },
    (error) => {
      Util.showCustomMessage(error);
    }
  );
};

function onSendMessage(messages = [], handleMessage) {
  switch (messages[0].type) {
    case "text":
      return addFirestore(messages);
    case "image":
      return uploadMedia(messages, handleMessage);
    case "video":
      return uploadMedia(messages, handleMessage);
    case "document":
      return uploadMedia(messages, handleMessage);
    case "audio":
      return uploadMedia(messages);
  }
}

function realTimeFetch(handleMessage, path) {
  if (path) {
    firebaseService
      .firestore()
      .collection("mobilechats")
      .doc(`${path}`)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .onSnapshot((res) => {
        console.log(res, "response");
        if (res) {
          let thread = res.docs.map((item) => {
            return item._data;
          });
          handleMessage(thread, path);
        }
      });
  }
}

function getChatRoom(page) {
  return firebaseService.firestore().collection("mobilechats").get();
}

function getMessages(id, page = 1, lastmessageObj = {}) {
  const messageListData = getchatListIdentifier(`${id}`)(
    DataHandler.getStore()
  );

  console.log("messageListData Firebase", lastmessageObj);
  if (page === 1) {
    return firebaseService
      .firestore()
      .collection("mobilechats")
      .doc(id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
  } else {
    return firebaseService
      .firestore()
      .collection("mobilechats")
      .doc(id)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .startAfter(lastmessageObj.createdAt)
      .limit(10)
      .get();
  }
}

function getTotalCount(id) {
  return firebaseService
    .firestore()
    .collection("mobilechats")
    .doc(`${id}`)
    .collection("messages")
    .count()
    .get();
}

function getlastMessages(id, success) {
  return firebaseService
    .firestore()
    .collection("mobilechats")
    .doc(`${id}`)
    .collection("messages")
    .orderBy("createdAt", "desc")
    .limit(1)
    .onSnapshot(success);
}

function deleteChatThread(path) {
  const colRef = firebaseService
    .firestore()
    .collection("mobilechats")
    .doc(`${path}`)
    .collection("messages");
  colRef.get().then((querySnapshot) => {
    Promise.all(
      querySnapshot.docs.map((d) =>
        d.ref.delete().then(() => {
          DataHandler.getStore().dispatch(deleteChat({ chatRoomId: path }));
        })
      )
    );
  });
}

export default {
  onSendMessage,
  realTimeFetch,
  getChatRoom,
  getMessages,
  getTotalCount,
  getlastMessages,
  deleteChatThread,
};
