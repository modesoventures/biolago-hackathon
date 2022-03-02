// Original file: src/framework/protobuf/SiLABinaryTransfer.proto

import type { Long } from '@grpc/proto-loader';

export interface CreateBinaryRequest {
  'binarySize'?: (number | string | Long);
  'chunkCount'?: (number);
  'parameterIdentifier'?: (string);
}

export interface CreateBinaryRequest__Output {
  'binarySize': (string);
  'chunkCount': (number);
  'parameterIdentifier': (string);
}
