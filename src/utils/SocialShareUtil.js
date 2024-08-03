import { ShareDialog } from "react-native-fbsdk-next";
import DataHandler from "./DataHandler";
import { sharePostOnFacebook } from "../ducks/social";

async function SocialShare(post, postId, success, error) {
  try {
    console.log(post);
    const shareContent = {
      contentType: "link",
      contentUrl: `${post}`,
    };
    const canShow = await ShareDialog.canShow(shareContent);
    if (canShow) {
      const result = await ShareDialog.show(shareContent);
      // The result object contains information about the share action
      console.log(canShow, "Share result:", result);
      if (result.isCancelled) {
        console.log("Post sharing cancelled");
      } else {
        // Perform any necessary actions or updates here
        DataHandler.getStore().dispatch(
          sharePostOnFacebook.request({
            payloadApi: {
              id: postId,
              status: "completed",
            },
            cb: (data) => {
              success("Post shared successfully!");
            },
          })
        );
      }
    }
  } catch (err) {
    error(err);
  }
}

export default { SocialShare };
