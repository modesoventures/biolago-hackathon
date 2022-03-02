import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthenticationServiceClient as _sila2_org_silastandard_core_authenticationservice_v1_AuthenticationServiceClient, AuthenticationServiceDefinition as _sila2_org_silastandard_core_authenticationservice_v1_AuthenticationServiceDefinition } from './sila2/org/silastandard/core/authenticationservice/v1/AuthenticationService';

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
          authenticationservice: {
            v1: {
              AuthenticationService: SubtypeConstructor<typeof grpc.Client, _sila2_org_silastandard_core_authenticationservice_v1_AuthenticationServiceClient> & { service: _sila2_org_silastandard_core_authenticationservice_v1_AuthenticationServiceDefinition }
              Login_Parameters: MessageTypeDefinition
              Login_Responses: MessageTypeDefinition
              Logout_Parameters: MessageTypeDefinition
              Logout_Responses: MessageTypeDefinition
            }
          }
        }
      }
    }
  }
}

