/** @format */

import { STARRED_STAR, STATUS } from "../config/Constants";

class MyRegistryUtil {
  id = (data) => data?.id ?? "";

  title = (data) => data?.title ?? "Not Available";

  full_name = (data) => data?.full_name ?? "Not Available";

  dob = (data) => data?.dob ?? new Date();

  image = (data) => data?.image ?? data?.image_url ?? "";

  isPrioritize = (data) => data?.starred ?? false;

  price = (data) => data?.price ?? undefined;

  total_amount = (data) => data?.total_amount ?? 0;

  purchased = (data) => data?.purchased ?? false;

  products_contacts = (data) => data?.products_contacts ?? [];

  members = (data) => data?.members ?? [];

  category = (data) => data?.category ?? "";

  platform = (data) => data?.platform ?? 30;

  status = (data) => data?.status ?? STATUS.ACTIVE;

  junior_starred = (data) => data?.junior_starred ?? STARRED_STAR.NOT_STARRED;

  model_id = (data) => data?.model_id ?? 0;

  deadline = (data) => data?.deadline ?? new Date();

  member_image = (data) => data?.member?.image ?? "";

  member_full_name = (data) => data?.member?.full_name ?? "";

  amount = (data) => data?.amount ?? 0;

  is_admin = (data) => data?.is_admin ?? false;

  amount_percentage = (data) => data?.amount_percentage ?? 0;

  is_paid = (data) => data?.status ?? "Unpaid";

  image_url = (data) => data?.image_url ?? "";

  products = (data) => data?.products ?? [];

  link = (data) => data?.link ?? "";
}

export default new MyRegistryUtil();
