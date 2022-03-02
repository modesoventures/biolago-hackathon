// Original file: src/framework/protobuf/SiLAFramework.proto

import type { CommandExecutionUUID as _sila2_org_silastandard_CommandExecutionUUID, CommandExecutionUUID__Output as _sila2_org_silastandard_CommandExecutionUUID__Output } from '../../../sila2/org/silastandard/CommandExecutionUUID';
import type { Duration as _sila2_org_silastandard_Duration, Duration__Output as _sila2_org_silastandard_Duration__Output } from '../../../sila2/org/silastandard/Duration';

export interface CommandConfirmation {
  'commandExecutionUUID'?: (_sila2_org_silastandard_CommandExecutionUUID | null);
  'lifetimeOfExecution'?: (_sila2_org_silastandard_Duration | null);
}

export interface CommandConfirmation__Output {
  'commandExecutionUUID': (_sila2_org_silastandard_CommandExecutionUUID__Output | null);
  'lifetimeOfExecution': (_sila2_org_silastandard_Duration__Output | null);
}
