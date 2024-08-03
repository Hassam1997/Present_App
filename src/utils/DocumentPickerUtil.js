import DocumentPicker from "react-native-document-picker";

const DOCUMENT_PICKER_TYPES = {
  IMAGES: DocumentPicker.types.images,
  PDF: DocumentPicker.types.pdf,
  DOC: DocumentPicker.types.doc,
  DOCX: DocumentPicker.types.docx,
  PPT: DocumentPicker.types.ppt,
  PPTX: DocumentPicker.types.pptx,
  XLS: DocumentPicker.types.xls,
  XLSX: DocumentPicker.types.xlsx,
  AUDIO: DocumentPicker.types.audio,
};

const pickDocument = async (type, callback) => {
  try {
    const result = await DocumentPicker.pickSingle({
      type: type ? type : [DocumentPicker.types.allFiles],
      presentationStyle: "fullScreen",
      copyTo: "cachesDirectory",
    });
    callback(result);
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      console.log("User cancelled the picker");
    } else {
      console.log("DocumentPicker Error: ", err);
    }
  }
};

export default {
  DOCUMENT_PICKER_TYPES,
  pickDocument,
};
