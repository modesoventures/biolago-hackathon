// Original file: src/framework/protobuf/SiLAFramework.proto

import type { ValidationError as _sila2_org_silastandard_ValidationError, ValidationError__Output as _sila2_org_silastandard_ValidationError__Output } from '../../../sila2/org/silastandard/ValidationError';
import type { DefinedExecutionError as _sila2_org_silastandard_DefinedExecutionError, DefinedExecutionError__Output as _sila2_org_silastandard_DefinedExecutionError__Output } from '../../../sila2/org/silastandard/DefinedExecutionError';
import type { UndefinedExecutionError as _sila2_org_silastandard_UndefinedExecutionError, UndefinedExecutionError__Output as _sila2_org_silastandard_UndefinedExecutionError__Output } from '../../../sila2/org/silastandard/UndefinedExecutionError';
import type { FrameworkError as _sila2_org_silastandard_FrameworkError, FrameworkError__Output as _sila2_org_silastandard_FrameworkError__Output } from '../../../sila2/org/silastandard/FrameworkError';

export interface SiLAError {
  'validationError'?: (_sila2_org_silastandard_ValidationError | null);
  'definedExecutionError'?: (_sila2_org_silastandard_DefinedExecutionError | null);
  'undefinedExecutionError'?: (_sila2_org_silastandard_UndefinedExecutionError | null);
  'frameworkError'?: (_sila2_org_silastandard_FrameworkError | null);
  'error'?: "validationError"|"definedExecutionError"|"undefinedExecutionError"|"frameworkError";
}

export interface SiLAError__Output {
  'validationError'?: (_sila2_org_silastandard_ValidationError__Output | null);
  'definedExecutionError'?: (_sila2_org_silastandard_DefinedExecutionError__Output | null);
  'undefinedExecutionError'?: (_sila2_org_silastandard_UndefinedExecutionError__Output | null);
  'frameworkError'?: (_sila2_org_silastandard_FrameworkError__Output | null);
  'error': "validationError"|"definedExecutionError"|"undefinedExecutionError"|"frameworkError";
}
