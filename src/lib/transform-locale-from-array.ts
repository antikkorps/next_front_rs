// When get locale from client component it's in array, here you get it into string + default value

export const transformLocaleFromArray = (locale: string | string[]) => {
    let localeValue = locale
    if (Array.isArray(localeValue)) {
      localeValue = localeValue[0];
    }
    if (!localeValue) {
      localeValue = 'fr';
    }
    return localeValue;
}