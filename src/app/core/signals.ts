import { signal } from '@angular/core';
import type { CfExposes } from '@shared/types';

export const useFrameHeader = signal<CfExposes['header'] | null>(null);
export const useFrameAside = signal<CfExposes['aside'] | null>(null);
export const useFrameEvent = signal<CfExposes['events'] | null>(null);
