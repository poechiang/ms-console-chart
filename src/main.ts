import { ApplicationRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { useFrameAside, useFrameEvent, useFrameHeader } from '@core/signals';
import { CfExposes } from '@shared/types';
import { App } from './app/app';
import { appConfig } from './app/app.config';
let appRef: null | ApplicationRef;

/**
 * 挂载函数：供基座调用
 * @param container  基座提供的挂载容器选择器
 */
const mount = async (container: string | HTMLElement) => {
  const wrapper: null | HTMLElement =
    typeof container === 'string' ? document.querySelector(container) : container;
  if (wrapper && !wrapper.querySelector('app-root')) {
    wrapper.appendChild(document.createElement('app-root'));
  }

  try {
    appRef = await bootstrapApplication(App, appConfig);
  } catch (error) {
    console.error(error);
  }
};

const unmount = async () => {
  appRef?.components.forEach((component) => {
    component.destroy();
  });
  appRef = null;
  const appRoot = document.querySelector('app-root');
  appRoot?.remove();
  console.info('Micro-frontend unmounted successfully');
};

export { mount, unmount };

if (window.__MODULE_IN_MFE__) {
  const { header, aside, events } = window.getConsoleService();
  useFrameHeader.set(header);
  useFrameAside.set(aside);
  useFrameEvent.set(events);
} else {
  window.__FRAME_IN_MFE__ = true;
  const { header, aside, events } = (await import(
    /* @vite-ignore */ 'http://localhost:5174/src/main.ts'
  )) as CfExposes;

  useFrameHeader.set(header);
  useFrameAside.set(aside);
  useFrameEvent.set(events);
  mount('body');
}
