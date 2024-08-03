/** @format */

class EventsDataUtil {
  id = (user) => user?.id ?? 0;

  title = (user) => user?.title ?? "";

  event_type = (user) => user?.event_type ?? 0;

  date = (user) => user?.date ?? new Date();

  title = (user) => user?.title ?? "";

  others = (user) => user?.others ?? [];

  product_list = (user) => user?.products ?? [];

  images = (user) => user?.images ?? "";

  price = (user) => user?.price ?? 0;

  image = (user) => user?.image_url ?? "";

  platform = (user) => user?.platform ?? 30;

  buy_link = (user) => user?.buy_link ?? "www.google.com";

  reminder = (user) => user?.reminder ?? 30;
}

export default new EventsDataUtil();
