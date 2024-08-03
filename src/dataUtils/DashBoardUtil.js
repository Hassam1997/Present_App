/** @format */

import { Util } from "../utils";

class DashBoardUtil {
  id = (data) => data?.id ?? "";

  title = (data) => data?.title ?? "";

  event_type = (data) => data?.event_type ?? 15;

  date = (data) => data?.date ?? new Date();

  created_at = (data) => data?.created_at ?? new Date();

  price = (data) => data?.price ?? 0;

  discounted_price = (data) => data?.discounted_price ?? 0;

  platform = (data) => data?.platform ?? 15;

  is_saved = (data) => data?.is_saved ?? false;

  image = (data) => data?.image_url ?? data?.image ?? "";

  name = (data) => data?.name ?? "";

  keyword = (data) => data?.keyword ?? "";

  product_image = (data) => data?.images ?? [];

  discount = (data) => data?.discount ?? "-50%";

  category = (data) => data?.category ?? "";

  description = (data) =>
    data?.description ??
    "Be reminded of your blessings each time you pack the incredibly spacious Blessed Canvas Tote for a fun trip or an everyday excursion. The Blessed Canvas Tote is a fashionable way to carry larger items or pack a blanket for a day trip. The top two-thirds of the tote is decorated with a floral pattern in shades of coral, goldenrod, and turquoise against a white background.";

  specifications = (data) => data?.specifications ?? [];

  buy_link = (data) => data?.buy_link ?? "";

  share_link = (data) => data?.buy_link ?? "";

  SFL = (data) => data.SFL ?? false;
}

export default new DashBoardUtil();
