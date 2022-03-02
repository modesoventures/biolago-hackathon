// Original file: src/framework/protobuf/org.silastandard/LockController.proto

import type { String as _sila2_org_silastandard_String, String__Output as _sila2_org_silastandard_String__Output } from '../../../../../../sila2/org/silastandard/String';
import type { Integer as _sila2_org_silastandard_Integer, Integer__Output as _sila2_org_silastandard_Integer__Output } from '../../../../../../sila2/org/silastandard/Integer';

export interface LockServer_Parameters {
  'LockIdentifier'?: (_sila2_org_silastandard_String | null);
  'Timeout'?: (_sila2_org_silastandard_Integer | null);
}

export interface LockServer_Parameters__Output {
  'LockIdentifier': (_sila2_org_silastandard_String__Output | null);
  'Timeout': (_sila2_org_silastandard_Integer__Output | null);
}
