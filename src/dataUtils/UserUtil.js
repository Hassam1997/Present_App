/** @format */

import { FEEDBACK_DATE_FORMATE } from "../config/Constants";
import { Util } from "../utils";

class UserUtill {
  id = (user) => user?.id ?? "";

  client_id = (user) => user?.client_id ?? "";

  email = (user) => user?.email?.trim() ?? "";

  age = (user) => user?.age ?? "";

  contactNumber = (user) => user?.mobile_number ?? "";

  country_code = (user) => user?.country_code ?? "US";

  full_name = (user) => user?.full_name?.trim() ?? "";

  user_image = (user) => user?.profile_image_link ?? "";

  name = (user) => user?.Site?.biz_name?.trim() ?? "Not Available";

  image = (user) => user?.image ?? "";

  dob = (user) => user?.dob ?? "";

  bio = (user) => user?.bio ?? "";

  purpose = (user) => user?.Site?.purpose ?? user?.purpose ?? "Not available";

  rating = (user) => user?.Site?.ratings ?? user?.ratings;

  distance = (user) =>
    user?.Site?.biz_place_info?.distance ??
    user?.biz_place_info?.distance ??
    "";

  description = (user) =>
    user?.Site?.biz_description ?? user?.biz_description ?? "";

  facebook = (user) =>
    user?.Site?.facebook_account_info?.fb_page_link ??
    user?.facebook_account_info?.fb_page_link ??
    "";

  feedback_facebook = (user) =>
    user?.Site?.facebook_account_info?.fb_page_review_link ??
    user?.facebook_account_info?.fb_page_review_link ??
    "";

  is_facebook_sm_connected = (user) =>
    user?.Site?.is_facebook_sm_connected ??
    user?.is_facebook_sm_connected ??
    false;

  instagram = (user) =>
    user?.Site?.instagram_account_info?.profile_picture ??
    user?.instagram_account_info?.profile_picture ??
    "";

  is_instagram_sm_connected = (user) =>
    user?.Site?.is_instagram_sm_connected ??
    user?.is_instagram_sm_connected ??
    false;

  google = (user) =>
    `mailto:${
      user?.Site?.google_account_info?.account_email ??
      user?.google_account_info?.account_email ??
      ""
    }`;

  feedback_google = (user) =>
    user?.Site?.gmb_account_info?.gmb_review_link ??
    user?.gmb_account_info?.gmb_review_link ??
    "";

  gmb = (user) =>
    `sms:${
      user?.Site?.biz_contact_info?.phone_no ?? user?.biz_contact_info?.phone_no
    }`;

  address = (user) => user?.address ?? "123 Main Street, New York";

  phoneNumberOnly = (user) => user.phone_number ?? "";

  phoneNumberCode = (user) => `${user.country_code}` ?? "";

  phone_number = (user) => `${user.country_code} ${user.phone_number}`;

  juniors = (user) => user.juniors ?? [];

  operating_hours = (user) =>
    user?.Site?.operating_hours ??
    user?.operating_hours ?? [
      {
        day_of_week: "Sunday",
        ends_at: "08:00 PM",
        starts_at: "08:00 AM",
      },
    ];

  date = (user) =>
    Util.formatDate(
      user?.created_at ?? user?.transactionDateTime,
      FEEDBACK_DATE_FORMATE
    );

  biz_logo = (user) => user?.Site?.biz_photos?.logo_url;

  message = (user) =>
    // user?.message ??
    // user?.Appointment?.appointment_extra_info?.appointment_feedback;

    user?.message ?? user?.event_payload?.message;

  reward_points = (user) => user?.reward_points ?? "50";

  feedback_rating = (user) =>
    // user?.Appointment?.appointment_extra_info?.appointment_star_rating;
    user?.event_payload?.rating;

  feedback_completed_banner = (user) =>
    user?.Appointment?.appointment_extra_info?.appointment_feedback_image ?? "";
}

export default new UserUtill();
