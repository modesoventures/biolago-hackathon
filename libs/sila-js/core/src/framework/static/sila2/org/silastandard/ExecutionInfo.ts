// Original file: src/framework/protobuf/SiLAFramework.proto

import type { Real as _sila2_org_silastandard_Real, Real__Output as _sila2_org_silastandard_Real__Output } from '../../../sila2/org/silastandard/Real';
import type { Duration as _sila2_org_silastandard_Duration, Duration__Output as _sila2_org_silastandard_Duration__Output } from '../../../sila2/org/silastandard/Duration';

// Original file: src/framework/protobuf/SiLAFramework.proto

export enum _sila2_org_silastandard_ExecutionInfo_CommandStatus {
  waiting = 0,
  running = 1,
  finishedSuccessfully = 2,
  finishedWithError = 3,
}

export interface ExecutionInfo {
  'commandStatus'?: (_sila2_org_silastandard_ExecutionInfo_CommandStatus | keyof typeof _sila2_org_silastandard_ExecutionInfo_CommandStatus);
  'progressInfo'?: (_sila2_org_silastandard_Real | null);
  'estimatedRemainingTime'?: (_sila2_org_silastandard_Duration | null);
  'updatedLifetimeOfExecution'?: (_sila2_org_silastandard_Duration | null);
}

export interface ExecutionInfo__Output {
  'commandStatus': (keyof typeof _sila2_org_silastandard_ExecutionInfo_CommandStatus);
  'progressInfo': (_sila2_org_silastandard_Real__Output | null);
  'estimatedRemainingTime': (_sila2_org_silastandard_Duration__Output | null);
  'updatedLifetimeOfExecution': (_sila2_org_silastandard_Duration__Output | null);
}
