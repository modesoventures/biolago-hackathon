import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ParameterConstraintsProviderClient as _sila2_org_silastandard_core_parameterconstraintsprovider_v1_ParameterConstraintsProviderClient, ParameterConstraintsProviderDefinition as _sila2_org_silastandard_core_parameterconstraintsprovider_v1_ParameterConstraintsProviderDefinition } from './sila2/org/silastandard/core/parameterconstraintsprovider/v1/ParameterConstraintsProvider';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  sila2: {
    org: {
      silastandard: {
        Any: MessageTypeDefinition
        Binary: MessageTypeDefinition
        Boolean: MessageTypeDefinition
        CommandConfirmation: MessageTypeDefinition
        CommandExecutionUUID: MessageTypeDefinition
        Date: MessageTypeDefinition
        DefinedExecutionError: MessageTypeDefinition
        Duration: MessageTypeDefinition
        ExecutionInfo: MessageTypeDefinition
        FrameworkError: MessageTypeDefinition
        Integer: MessageTypeDefinition
        Real: MessageTypeDefinition
        SiLAError: MessageTypeDefinition
        String: MessageTypeDefinition
        Time: MessageTypeDefinition
        Timestamp: MessageTypeDefinition
        Timezone: MessageTypeDefinition
        UndefinedExecutionError: MessageTypeDefinition
        ValidationError: MessageTypeDefinition
        core: {
          parameterconstraintsprovider: {
            v1: {
              ParameterConstraintsProvider: SubtypeConstructor<typeof grpc.Client, _sila2_org_silastandard_core_parameterconstraintsprovider_v1_ParameterConstraintsProviderClient> & { service: _sila2_org_silastandard_core_parameterconstraintsprovider_v1_ParameterConstraintsProviderDefinition }
              Subscribe_ParametersConstraints_Parameters: MessageTypeDefinition
              Subscribe_ParametersConstraints_Responses: MessageTypeDefinition
            }
          }
        }
      }
    }
  }
}

