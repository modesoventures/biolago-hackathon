// Original file: src/framework/protobuf/SiLAFramework.proto

import type { Timezone as _sila2_org_silastandard_Timezone, Timezone__Output as _sila2_org_silastandard_Timezone__Output } from '../../../sila2/org/silastandard/Timezone';

export interface Date {
  'day'?: (number);
  'month'?: (number);
  'year'?: (number);
  'timezone'?: (_sila2_org_silastandard_Timezone | null);
}

export interface Date__Output {
  'day': (number);
  'month': (number);
  'year': (number);
  'timezone': (_sila2_org_silastandard_Timezone__Output | null);
}
