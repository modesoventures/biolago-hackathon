// Original file: src/framework/protobuf/SiLABinaryTransfer.proto

import type { Duration as _sila2_org_silastandard_Duration, Duration__Output as _sila2_org_silastandard_Duration__Output } from '../../../sila2/org/silastandard/Duration';

export interface CreateBinaryResponse {
  'binaryTransferUUID'?: (string);
  'lifetimeOfBinary'?: (_sila2_org_silastandard_Duration | null);
}

export interface CreateBinaryResponse__Output {
  'binaryTransferUUID': (string);
  'lifetimeOfBinary': (_sila2_org_silastandard_Duration__Output | null);
}
