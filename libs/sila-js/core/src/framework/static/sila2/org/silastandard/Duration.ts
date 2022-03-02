// Original file: src/framework/protobuf/SiLAFramework.proto

import type { Long } from '@grpc/proto-loader';

export interface Duration {
  'seconds'?: (number | string | Long);
  'nanos'?: (number);
}

export interface Duration__Output {
  'seconds': (string);
  'nanos': (number);
}
