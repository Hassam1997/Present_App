/** @format */

import { Images } from "../theme";

const MediaPickerData = [
  {
    title: "Take a Picture",
    identifier: "CAMERA",
  },
  {
    title: "Upload a Picture",
    identifier: "GALLERY",
  },
];

const PRICE = [
  {
    title: "Lowest to highest",
    identifier: "asc",
  },
  {
    title: "Highest to lowest",
    identifier: "desc",
  },
];

const EVENTS = [
  {
    title: "All",
    identifier: "ALL",
  },
  {
    title: "Upcoming",
    identifier: "UPCOMING",
  },
  {
    title: "General",
    identifier: "GENERAL",
  },
  {
    title: "Customized",
    identifier: "CUSTOMIZED",
  },
];

const DISCOUNTS = [
  {
    title: "$50",
    identifier: 50,
  },
  {
    title: "$100",
    identifier: 100,
  },
  {
    title: "$200",
    identifier: 200,
  },
  {
    title: "$300",
    identifier: 300,
  },
];

const DATE = [
  {
    title: "This week",
    identifier: "1",
  },
  {
    title: "Last week",
    identifier: "2",
  },
  {
    title: "This month",
    identifier: "3",
  },
  {
    title: "This year",
    identifier: "4",
  },
  {
    title: "Last year",
    identifier: "5",
  },
  {
    title: "All Time",
    identifier: "6",
  },
];

const EventsRoutes = [
  { key: "general", title: `General`, index: 0 },
  { key: "customized", title: `Customized`, index: 1 },
];

const MyRegistryRoutes = [
  { key: "MyGifts", title: `My Gifts` },
  { key: "GiftingGroups", title: `Gifting Groups` },
  { key: "TrackGifts", title: `Track Gifts` },
  { key: "JuniorGifts", title: `Junior Gifts` },
  { key: "SavedGifts", title: `Saved Gifts` },
];

const horizontalListGiftsOption = [
  {
    text: "ALL",
    identifier: "all",
  },
  {
    text: "Purchased",
    identifier: "Purchased",
  },
  {
    text: "Not Purchased",
    identifier: "Not Purchased",
  },
];

const ACENDING_DECENDING_OPTIONS = [
  {
    title: "A - Z",
    identifier: "acending",
  },
  {
    title: "Z - A",
    identifier: "decending",
  },
];

const horizontalListGiftsGroupsOption = [
  {
    text: "All",
    identifier: "all",
  },
  {
    text: "Active",
    identifier: "Active",
  },
  {
    text: "Inactive",
    identifier: "Inactive",
  },
  {
    text: "Past",
    identifier: "Past",
  },
];

const CalendarRoutes = [
  { key: "allevents", title: `All Events` },
  { key: "generalevents", title: `General Events` },
  { key: "customizedevents", title: `Custom Events` },
];

const MembersRoutes = [
  { key: "contacts", title: `Contacts` },
  { key: "groups", title: `Groups` },
];

const EVENT_TYPE = [
  {
    title: "General Event",
    identifier: 15,
  },
  {
    title: "Customized Event",
    identifier: 30,
  },
];

const REMINDER = [
  {
    title: "Never",
    identifier: 10,
  },
  {
    title: "1 week before",
    identifier: 30,
  },
  {
    title: "2 weeks before",
    identifier: 40,
  },
  {
    title: "2 days before",
    identifier: 20,
  },
];

const EVENT_FUNCTIONS = [
  {
    title: "Add Reminder",
    identifier: "ADDREMINDER",
  },
  {
    title: "Edit Event",
    identifier: "EDITEVENT",
  },
  {
    title: "Delete Event",
    identifier: "DELETEEVENT",
  },
];

const ADMIN_OPTIONS = [
  {
    title: "Relevant",
    identifier: "relevant",
  },
  {
    title: "Irrelevant",
    identifier: "irrelevant",
  },
];

const GROUP_EDIT_MODAL_OPTIONS = [
  {
    title: "Share Group Link",
    identifier: "GROUPLINK",
  },
  {
    title: "Delete Group",
    identifier: "DELETEGROUP",
  },
];

const GROUP_MODAL_OPTIONS = [
  {
    title: "Share Group Link",
    identifier: "GROUPLINK",
  },
  {
    title: "Edit Group",
    identifier: "EDITGROUP",
  },
  {
    title: "Delete Group",
    identifier: "DELETEGROUP",
  },
];

const PROFILE_LIST = [
  {
    title: "Rewards",
    identifier: "rewards",
    icon: Images.icons.rewardIcon,
    route: "Rewards",
  },
  {
    title: "Settings",
    identifier: "settings",
    icon: Images.icons.settingIcon,
    route: "Settings",
  },
  {
    title: "Referral Link",
    identifier: "referrallink",
    icon: Images.icons.referralIcon,
    route: "ReferralLink",
  },
];

const ContactsRoute = [
  { key: "contacts", title: `My Contacts` },
  { key: "groups", title: `Groups` },
];

const MemberDistributionRoute = [
  { key: "even", title: `Even` },
  { key: "custom", title: `Custom` },
];

const JuniorRoute = [
  { key: "sentToSanta", title: `Sent To Santa` },
  { key: "sentToParent", title: `Sent To Parent` },
];

const SortContacs = [
  {
    title: "Sort by Upcoming Events",
    identifier: "sortbyupcoming",
  },
];

const CONTACTS_FUNCTIONS = [
  {
    title: "Delete Contact",
    identifier: "DELETE",
  },
  {
    title: "Add to Group",
    identifier: "ADD",
  },
];

const CONTACTS_OPTIONS = [
  {
    title: "Edit URL",
    identifier: "EDIT",
  },
  {
    title: "Delete URL",
    identifier: "DELETE",
  },
];

const GROUP_OPTIONS = [
  {
    title: "Delete Group",
    identifier: "DELETE",
  },
];

const EventRoutes = [
  { key: "allevents", title: `All Events` },
  { key: "generalevents", title: `General Events` },
  { key: "customizedevents", title: `Custom Events` },
];

const JuniorEventRoutes = [
  { key: "allevents", title: `All Events` },
  { key: "generalevents", title: `General Events` },
  { key: "customizedevents", title: `Custom Events` },
];

const PRODUCT_DETAILS = [
  {
    title: "Prioritize to Top",
    identifier: "PRIORITIZE",
  },
  {
    title: "Mark as Purchase",
    identifier: "MARKASPURCHASE",
  },
  {
    title: "Remove Gift",
    identifier: "REMOVEGIFT",
  },
  {
    title: "Share Gift",
    identifier: "SHAREGIFT",
  },
];

const PRODUCT_DETAILS_SAVE_GIFT = [
  {
    title: "Prioritize to Top",
    identifier: "PRIORITIZE",
  },
  {
    title: "Share Gift",
    identifier: "SHAREGIFT",
  },
];

const GENDER = [
  {
    title: "Male",
    identifier: "M",
  },
  {
    title: "Female",
    identifier: "F",
  },
];

const INTERESTS = [
  {
    title: "Fashion",
    identifier: "Fashion",
  },
  {
    title: "Sports",
    identifier: "Sports",
  },
  {
    title: "Shopping",
    identifier: "Shopping",
  },
  {
    title: "Entertainment",
    identifier: "Entertainment",
  },
];

const RELATIONS = [
  {
    title: "Friend",
    identifier: "FRIEND",
  },
  {
    title: "Family",
    identifier: "FAMILY",
  },
];

const PRIORITY = [
  {
    title: "1st Priority",
    identifier: 1,
  },
  {
    title: "2nd Priority",
    identifier: 2,
  },
  {
    title: "3rd Priority",
    identifier: 3,
  },
];

export {
  MediaPickerData,
  PRICE,
  DISCOUNTS,
  EventsRoutes,
  MyRegistryRoutes,
  horizontalListGiftsOption,
  horizontalListGiftsGroupsOption,
  CalendarRoutes,
  EVENT_TYPE,
  REMINDER,
  MembersRoutes,
  ACENDING_DECENDING_OPTIONS,
  EVENT_FUNCTIONS,
  PROFILE_LIST,
  ContactsRoute,
  SortContacs,
  JuniorRoute,
  MemberDistributionRoute,
  CONTACTS_FUNCTIONS,
  GROUP_MODAL_OPTIONS,
  CONTACTS_OPTIONS,
  GROUP_OPTIONS,
  EventRoutes,
  GROUP_EDIT_MODAL_OPTIONS,
  EVENTS,
  DATE,
  JuniorEventRoutes,
  PRODUCT_DETAILS,
  PRODUCT_DETAILS_SAVE_GIFT,
  GENDER,
  INTERESTS,
  RELATIONS,
  PRIORITY,
  ADMIN_OPTIONS,
};
