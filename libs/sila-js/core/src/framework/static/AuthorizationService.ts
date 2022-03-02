import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AuthorizationServiceClient as _sila2_org_silastandard_core_authorizationservice_v1_AuthorizationServiceClient, AuthorizationServiceDefinition as _sila2_org_silastandard_core_authorizationservice_v1_AuthorizationServiceDefinition } from './sila2/org/silastandard/core/authorizationservice/v1/AuthorizationService';

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
          authorizationservice: {
            v1: {
              AuthorizationService: SubtypeConstructor<typeof grpc.Client, _sila2_org_silastandard_core_authorizationservice_v1_AuthorizationServiceClient> & { service: _sila2_org_silastandard_core_authorizationservice_v1_AuthorizationServiceDefinition }
              Get_FCPAffectedByMetadata_AccessToken_Parameters: MessageTypeDefinition
              Get_FCPAffectedByMetadata_AccessToken_Responses: MessageTypeDefinition
              Metadata_AccessToken: MessageTypeDefinition
            }
          }
        }
      }
    }
  }
}

