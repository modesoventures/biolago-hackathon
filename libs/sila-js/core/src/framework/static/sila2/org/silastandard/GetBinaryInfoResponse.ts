// Original file: src/framework/protobuf/SiLABinaryTransfer.proto

import type { Duration as _sila2_org_silastandard_Duration, Duration__Output as _sila2_org_silastandard_Duration__Output } from '../../../sila2/org/silastandard/Duration';
import type { Long } from '@grpc/proto-loader';

export interface GetBinaryInfoResponse {
  'binarySize'?: (number | string | Long);
  'lifetimeOfBinary'?: (_sila2_org_silastandard_Duration | null);
}

export interface GetBinaryInfoResponse__Output {
  'binarySize': (string);
  'lifetimeOfBinary': (_sila2_org_silastandard_Duration__Output | null);
}
