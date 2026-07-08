import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import gl from "../../messages/gl.json";
import { routing, type Locale } from "./routing";

const messagesByLocale: Record<Locale, typeof en> = { en, es, gl };

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: messagesByLocale[locale],
  };
});
