import {notFound} from "next/navigation";
import {getRequestConfig} from 'next-intl/server';
import { locales } from "./intlConfig";


interface getMessageProps {
  locale: string;
  defaultLocale: string | null;
}
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
 

  const getMessages = async (props: getMessageProps) => {
    const {locale, defaultLocale } = props;
    const getLocale = defaultLocale ? defaultLocale : locale
    const messages = {
      ...(await import(`../../messages/${getLocale}/login.json`)).default,
      ...(await import(`../../messages/${getLocale}/register.json`)).default,
      ...(await import(`../../messages/${getLocale}/coming-soon.json`)).default,
      ...(await import(`../../messages/${getLocale}/input.json`)).default,
      ...(await import(`../../messages/${getLocale}/button.json`)).default,
      ...(await import(`../../messages/${getLocale}/navigation.json`)).default,
      ...(await import(`../../messages/${getLocale}/forgotten_password.json`)).default,

    };
    return messages;
  }

  return {
    // messages: (
    //   await (locale === 'en'
    //     ? // When using Turbopack, this will enable HMR for `en`
    //       import('../../messages/en.json')
    //     : import(`../../messages/${locale}.json`))
    // ).default
    messages: await (locale === 'en'
    ? // When using Turbopack, this will enable HMR for `en`
      getMessages({locale, defaultLocale: "en"})
    : getMessages({locale, defaultLocale: null})
  )
  };
});