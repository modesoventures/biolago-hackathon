// Original file: src/framework/protobuf/SiLAFramework.proto


// Original file: src/framework/protobuf/SiLAFramework.proto

export enum _sila2_org_silastandard_FrameworkError_ErrorType {
  COMMAND_EXECUTION_NOT_ACCEPTED = 0,
  INVALID_COMMAND_EXECUTION_UUID = 1,
  COMMAND_EXECUTION_NOT_FINISHED = 2,
  INVALID_METADATA = 3,
  NO_METADATA_ALLOWED = 4,
}

export interface FrameworkError {
  'errorType'?: (_sila2_org_silastandard_FrameworkError_ErrorType | keyof typeof _sila2_org_silastandard_FrameworkError_ErrorType);
  'message'?: (string);
}

export interface FrameworkError__Output {
  'errorType': (keyof typeof _sila2_org_silastandard_FrameworkError_ErrorType);
  'message': (string);
}
