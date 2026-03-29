import { registerLocaleData } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { angLocaleData, antdLocaleData, chartLocaleData } from '@assets/i18n';
import { TranslateService } from '@ngx-translate/core';
import { LocaleKeys } from '@shared/types';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { forkJoin, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  #i18n = inject(NzI18nService);
  #translateSrv = inject(TranslateService);

  async init(defaultLang?: LocaleKeys) {
    this.#translateSrv.addLangs(Object.keys(chartLocaleData));
    Object.entries(angLocaleData).forEach(([k, d]) => {
      registerLocaleData(d, k);
    });

    const tasks = this.#translateSrv.getLangs().map((lang) => this.#translateSrv.reloadLang(lang));
    await lastValueFrom(forkJoin(tasks));
    this.use(defaultLang ?? 'zh-CN');
  }
  decode(key: string, params?: any): string {
    return this.#translateSrv.instant(key, params);
  }
  use(key: LocaleKeys) {
    this.#i18n.setLocale(antdLocaleData[key]);
    this.#translateSrv.use(key);
  }
}
