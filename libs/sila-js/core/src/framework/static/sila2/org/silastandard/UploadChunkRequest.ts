// Original file: src/framework/protobuf/SiLABinaryTransfer.proto


export interface UploadChunkRequest {
  'binaryTransferUUID'?: (string);
  'chunkIndex'?: (number);
  'payload'?: (Buffer | Uint8Array | string);
}

export interface UploadChunkRequest__Output {
  'binaryTransferUUID': (string);
  'chunkIndex': (number);
  'payload': (Buffer);
}
