/** @format */

class ContactDataUtil {
  id = (user) => user?.id ?? 0;

  full_name = (user) =>
    (
      user?.givenName +
      " " +
      user?.middleName +
      " " +
      user?.familyName
    ).trim() ?? "";

  givenName = (user) => user?.givenName ?? "";

  name = (user) => user?.full_name ?? user?.name ?? "";

  dob = (user) =>
    user?.birthday != undefined
      ? `${user?.birthday?.year}-${user?.birthday?.month}-${user?.birthday?.day}`
      : "1999-12-12";

  thumbnailPath = (user) =>
    user?.thumbnailPath == "" ? null : user?.thumbnailPath;

  image = (user) => user?.image ?? "";

  phone_number = (user) => user?.phoneNumbers[0]?.number ?? "";

  url = (user) => user?.url ?? undefined;

  groups = (user) => user?.groups ?? [];

  events = (user) => user?.events ?? [];

  events_for_edit = (user) => user?.events_for_edit ?? [];

  date = (user) => user?.date ?? new Date();

  title = (user) => user?.title ?? "";

  products = (user) => user?.products ?? [];

  date_of_birth = (user) => user?.dob ?? new Date();

  contacts = (user) => user?.contacts ?? [];

  edit_name = (user) => user?.full_name?.split(" ")[0];

  interests = (user) => user?.interests ?? [];

  relations = (user) => user?.relation?.name ?? "";

  gender = (user) => (user?.gender == "F" ? "Female" : "Male");

  relation_id = (user) => user?.relation?.id ?? null;
}

export default new ContactDataUtil();
