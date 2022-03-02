// Original file: src/framework/protobuf/SiLAFramework.proto

import type { Timezone as _sila2_org_silastandard_Timezone, Timezone__Output as _sila2_org_silastandard_Timezone__Output } from '../../../sila2/org/silastandard/Timezone';

export interface Time {
  'second'?: (number);
  'minute'?: (number);
  'hour'?: (number);
  'timezone'?: (_sila2_org_silastandard_Timezone | null);
}

export interface Time__Output {
  'second': (number);
  'minute': (number);
  'hour': (number);
  'timezone': (_sila2_org_silastandard_Timezone__Output | null);
}
