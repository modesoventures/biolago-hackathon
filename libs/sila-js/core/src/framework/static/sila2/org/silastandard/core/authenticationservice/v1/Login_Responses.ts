// Original file: src/framework/protobuf/org.silastandard/AuthenticationService.proto

import type { String as _sila2_org_silastandard_String, String__Output as _sila2_org_silastandard_String__Output } from '../../../../../../sila2/org/silastandard/String';
import type { Integer as _sila2_org_silastandard_Integer, Integer__Output as _sila2_org_silastandard_Integer__Output } from '../../../../../../sila2/org/silastandard/Integer';

export interface Login_Responses {
  'AccessToken'?: (_sila2_org_silastandard_String | null);
  'TokenLifetime'?: (_sila2_org_silastandard_Integer | null);
}

export interface Login_Responses__Output {
  'AccessToken': (_sila2_org_silastandard_String__Output | null);
  'TokenLifetime': (_sila2_org_silastandard_Integer__Output | null);
}
