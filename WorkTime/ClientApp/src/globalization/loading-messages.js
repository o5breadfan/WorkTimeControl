import {load, loadMessages} from '@progress/kendo-react-intl';
import esMessages from './ru.json';
import weekData from 'cldr-core/supplemental/weekData.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import numbers from 'cldr-numbers-full/main/ru/numbers.json';
import dateFields from 'cldr-dates-full/main/ru/dateFields.json';
import currencies from 'cldr-numbers-full/main/ru/currencies.json';
import caGregorian from 'cldr-dates-full/main/ru/ca-gregorian.json';
import timeZoneNames from 'cldr-dates-full/main/ru/timeZoneNames.json';
import '@progress/kendo-date-math/tz/Asia/Krasnoyarsk';

load(likelySubtags, currencyData, weekData, numbers, currencies, caGregorian, dateFields, timeZoneNames);
loadMessages(esMessages, 'ru-RU');

export const TimeZone = "Asia/Krasnoyarsk";
export const Locale = {
    language: 'ru-RU',
    locale: 'ru'
}