// Original file: src/framework/protobuf/SiLABinaryTransfer.proto

import type { Duration as _sila2_org_silastandard_Duration, Duration__Output as _sila2_org_silastandard_Duration__Output } from '../../../sila2/org/silastandard/Duration';
import type { Long } from '@grpc/proto-loader';

export interface GetChunkResponse {
  'binaryTransferUUID'?: (string);
  'offset'?: (number | string | Long);
  'payload'?: (Buffer | Uint8Array | string);
  'lifetimeOfBinary'?: (_sila2_org_silastandard_Duration | null);
}

export interface GetChunkResponse__Output {
  'binaryTransferUUID': (string);
  'offset': (string);
  'payload': (Buffer);
  'lifetimeOfBinary': (_sila2_org_silastandard_Duration__Output | null);
}
