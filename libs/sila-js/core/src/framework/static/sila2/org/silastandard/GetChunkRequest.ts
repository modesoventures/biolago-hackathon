// Original file: src/framework/protobuf/SiLABinaryTransfer.proto

import type { Long } from '@grpc/proto-loader';

export interface GetChunkRequest {
  'binaryTransferUUID'?: (string);
  'offset'?: (number | string | Long);
  'length'?: (number);
}

export interface GetChunkRequest__Output {
  'binaryTransferUUID': (string);
  'offset': (string);
  'length': (number);
}
