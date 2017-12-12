import { Platform, NativeModules } from 'react-native';

import messages from '../i18n';

const startsWithVowel = param => {
  const letter = param[0];
  if (
    letter === 'a' ||
    letter === 'e' ||
    letter === 'i' ||
    letter === 'o' ||
    letter === 'u' ||
    letter === 'y'
  ) {
    return true;
  }

  return false;
};

export const getLanguage = () => {
  if (Platform.OS === 'ios' && NativeModules.SettingsManager) {
    if (
      NativeModules.SettingsManager.settings.AppleLocale.substr(0, 2) === 'fr'
    ) {
      return 'fr';
    }
  } else if (Platform.OS === 'android' && NativeModules.I18nManager) {
    if (NativeModules.I18nManager.localeIdentifier.substr(0, 2) === 'fr') {
      return 'fr';
    }
  }
  return 'en';
};

const getTrad = (target, key, defaultKey) => {
  return target[key] || defaultKey;
};

export const getTranslations = (key, params, elisionParam = null) => {
  const lang = getLanguage();
  let newKey = key;

  // Handle elision of the translation depending on a param
  if (elisionParam && params[elisionParam]) {
    newKey = startsWithVowel(params[elisionParam])
      ? `${key}.vowel`
      : `${key}.consonant`;
  }

  // Proxy doesn't work on old version of IOS and android
  // const i18n = new Proxy(messages[lang], {
  //   get(target, k) {
  //     return target[k] || key;
  //   },
  // });
  const res = getTrad(messages[lang], newKey, key);

  if (!res) return res;
  return res.replace(/\/%(.*?)%\//g, (matching, param) => params[param]);
};

export const getTrueNumber = (amount, type = '', currency = '€') => {
  const absAmount = Math.abs(amount);
  const strAmount = absAmount.toString();
  let sign = ' ';

  if (type !== '') {
    sign = type === 'credit' ? '+' : '-';
  }

  if (strAmount === '0') {
    return ` ${strAmount}${currency}`;
  }
  if (strAmount.length <= 2) {
    return `${sign}0,${strAmount}${currency}`;
  }

  const fistDigits = strAmount.substring(0, strAmount.length - 2);
  const lastDigits = strAmount.substring(strAmount.length - 2);

  if (lastDigits === '00') {
    return `${sign}${fistDigits}${currency}`;
  }
  return `${sign}${fistDigits},${lastDigits}${currency}`;
};
