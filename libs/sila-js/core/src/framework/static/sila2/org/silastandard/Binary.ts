// Original file: src/framework/protobuf/SiLAFramework.proto


export interface Binary {
  'value'?: (Buffer | Uint8Array | string);
  'binaryTransferUUID'?: (string);
  'union'?: "value"|"binaryTransferUUID";
}

export interface Binary__Output {
  'value'?: (Buffer);
  'binaryTransferUUID'?: (string);
  'union': "value"|"binaryTransferUUID";
}
