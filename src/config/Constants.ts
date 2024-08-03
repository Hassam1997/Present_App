/** @format */

export const ANDROID_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.lemon.lvoverseas";
export const IOS_STORE_URL =
  "https://apps.apple.com/pk/app/equitrip-driver/id1556479264";

export const OTP_RESEND_TIMER = 15;

export const DATE_FORMAT = "MM/DD/YYYY";
export const DATE_FORMAT2 = "DD/MM/YYYY";
export const DATE_SERVER_FORMAT = "YYYY-MM-DD";
export const DATE_US_FORMAT = "MM/DD/YYYY";
export const TIME_FORMAT = "HH-mm";
export const TIME_FORMAT_MESSAGE = "h:mm A ";
export const DATE_TIME_FORMAT = "ddd MMM DD, h:mm A";
export const DATE_FORMAT_DISPLAY = "DD MMM, YYYY";
export const DATE_FORMAT_DISPLAY2 = "MMM DD, YYYY";
export const DATE_MONTH_FORMAT = "DD MMMM";
export const TIME_FORMAT_DISPLAY = "h:mm A";
export const MONTH_YEAR_FORMAT = "YYYY-MM";
export const MONTH_YEAR_FORMAT_DISPLAY = "MMM YYYY";
export const MONTH_DATE_FORMATE = "MMMM DD";
export const MONTH_DATE_FORMAT_2 = "ddd MMM DD";
export const FEEDBACK_DATE_FORMATE = "MMMM DD, YYYY h:mm A";
export const MONTH_DATE_FORMATE_2 = "MMMM YYYY";
export const DAY_DATE_YEAR = "ddd, MMMM DD, YYYY";
export const DATE_MONTH = "Do MMM YYYY";
export const EVENTS_DATE_FORMAT = "ddd, MMM DD, YYYY";
export const EVENTS_DAY_FORMAT = "ddd, MMM DD";
export const EVENTS_YEAR_FORMAT = "YYYY";
export const EVENTS_MONTH_FORMAT = "M";

export const DATE_PICKER_TYPE = {
  DATE: "date",
  TIME: "time",
  DATE_TIME: "datetime",
  YEAR_MONTH: "year_month",
};
export const PRODUCT_REPORT_OPTION_DATA = [
  {
    title: "View All Products",
    identifier: "allproducts",
  },
  {
    title: "Relevant",
    identifier: "relevant",
  },
  {
    title: "Irrelevant",
    identifier: "irrelevant",
  },
];

export const MIN_AGE = 18;

export const BUTTON_TYPE = {
  DEACTIVATE: 1,
};

export const NOTIFICATION_LIST = {
  LATEST: "latest",
  OLDER: "older",
};

export const RATING_TYPE = {
  RATING_INPUT: 1,
  RATING_WITH_COUNT: 2,
  RATING_WITHOUT_COUNT: 3,
  RATING_INPUT_WITH_TEXT: 4,
  RATING_WITH_COUNT_TEXT: 5,
};
export const STAR_SIZE = {
  SMALL: 15,
  MEDIUM: 20,
  LARGE: 25,
  XLARGE: 34,
  XXLARGE: 40,
};

export const SOCIAL_BUTTON_TYPE = {
  GOOGLE: "GOOGLE",
  FACEBOOK: "FACEBOOK",
  INSTA: "INSTA",
  APPLE: "APPLE",
};

export const CIRCLE_CHECK_BUTTON_TYPE = {
  RADIO: "RADIO",
};

export enum EVENT_TYPES {
  GENERAL = 15,
  CUSTOMIZED = 30,
  ADMIN = 45,
}

export const PRODUCT_TYPES = {
  AMAZON: 30,
  WALMART: 60,
  TARGET: 90,
};

export enum REMINDER_ENUM {
  NEVER = 10,
  TWO_DAYS = 20,
  ONE_WEEK = 30,
  TWO_WEEK = 40,
}

export enum CONTACT_TYPE_ENUM {
  MANUAL = 10,
  PHONE = 20,
}

export enum URL_LINK {
  LINK = 120,
}

export enum STATUS {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  PAST = "Past",
}

export enum SENT_TO {
  PARENT = "Parent",
  SANTA = "Santa",
}

export enum STARRED_STAR {
  FIRST_PRIORITY = 5,
  SECOND_PRIORITY = 10,
  THIRD_PRIORITY = 15,
  NOT_STARRED = 20,
}
