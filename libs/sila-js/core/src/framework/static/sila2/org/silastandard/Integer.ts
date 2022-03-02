// Original file: src/framework/protobuf/SiLAFramework.proto

import type { Long } from '@grpc/proto-loader';

export interface Integer {
  'value'?: (number | string | Long);
}

export interface Integer__Output {
  'value': (string);
}
