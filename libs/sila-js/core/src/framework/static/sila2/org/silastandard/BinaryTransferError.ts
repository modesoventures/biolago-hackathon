// Original file: src/framework/protobuf/SiLABinaryTransfer.proto


// Original file: src/framework/protobuf/SiLABinaryTransfer.proto

export enum _sila2_org_silastandard_BinaryTransferError_ErrorType {
  INVALID_BINARY_TRANSFER_UUID = 0,
  BINARY_UPLOAD_FAILED = 1,
  BINARY_DOWNLOAD_FAILED = 2,
}

export interface BinaryTransferError {
  'errorType'?: (_sila2_org_silastandard_BinaryTransferError_ErrorType | keyof typeof _sila2_org_silastandard_BinaryTransferError_ErrorType);
  'message'?: (string);
}

export interface BinaryTransferError__Output {
  'errorType': (keyof typeof _sila2_org_silastandard_BinaryTransferError_ErrorType);
  'message': (string);
}
