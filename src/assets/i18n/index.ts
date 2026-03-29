import ar from '@angular/common/locales/ar';
import en from '@angular/common/locales/en';
import es from '@angular/common/locales/es';
import fr from '@angular/common/locales/fr';
import ru from '@angular/common/locales/ru';
import zh from '@angular/common/locales/zh';
import type { LocaleKeys } from '@shared/types';

import { ar_EG, en_US, es_ES, fr_FR, ru_RU, zh_CN } from 'ng-zorro-antd/i18n';

import arEG from './ar-EG.json';
import enUs from './en-US.json';
import esES from './es-ES.json';
import frFR from './fr-FR.json';
import ruRU from './ru-RU.json';
import zhCN from './zh-CN.json';

export const angLocaleData: Record<LocaleKeys, any> = {
  'ar-EG': ar,
  'en-US': en,
  'es-ES': es,
  'fr-FR': fr,
  'ru-RU': ru,
  'zh-CN': zh,
};
export const chartLocaleData: Record<LocaleKeys, any> = {
  'ar-EG': arEG,
  'en-US': enUs,
  'es-ES': esES,
  'fr-FR': frFR,
  'ru-RU': ruRU,
  'zh-CN': zhCN,
};

export const antdLocaleData: Record<LocaleKeys, any> = {
  'ar-EG': ar_EG,
  'en-US': en_US,
  'es-ES': es_ES,
  'fr-FR': fr_FR,
  'ru-RU': ru_RU,
  'zh-CN': zh_CN,
};
