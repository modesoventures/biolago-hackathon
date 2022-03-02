// Original file: src/framework/protobuf/org.silastandard/ParameterConstraintProvider.proto

import type { String as _sila2_org_silastandard_String, String__Output as _sila2_org_silastandard_String__Output } from '../../../../../../sila2/org/silastandard/String';

export interface _sila2_org_silastandard_core_parameterconstraintsprovider_v1_Subscribe_ParametersConstraints_Responses_ParametersConstraints_Struct {
  'CommandParameterIdentifier'?: (_sila2_org_silastandard_String | null);
  'Constraints'?: (_sila2_org_silastandard_String | null);
}

export interface _sila2_org_silastandard_core_parameterconstraintsprovider_v1_Subscribe_ParametersConstraints_Responses_ParametersConstraints_Struct__Output {
  'CommandParameterIdentifier': (_sila2_org_silastandard_String__Output | null);
  'Constraints': (_sila2_org_silastandard_String__Output | null);
}

export interface Subscribe_ParametersConstraints_Responses {
  'ParametersConstraints'?: (_sila2_org_silastandard_core_parameterconstraintsprovider_v1_Subscribe_ParametersConstraints_Responses_ParametersConstraints_Struct)[];
}

export interface Subscribe_ParametersConstraints_Responses__Output {
  'ParametersConstraints': (_sila2_org_silastandard_core_parameterconstraintsprovider_v1_Subscribe_ParametersConstraints_Responses_ParametersConstraints_Struct__Output)[];
}
