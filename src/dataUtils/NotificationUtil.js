import { Util } from "../utils";

class NotificationUtil {
  message = (data) => data?.message ?? "";

  is_read = (data) => data?.is_read ?? false;

  created_at = (data) => data?.created_at ?? new Date();

  image = (data) => data?.Sender_data?.profile_image_link ?? "";
}

export default new NotificationUtil();
