import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { SiLAServiceClient as _sila2_org_silastandard_core_silaservice_v1_SiLAServiceClient, SiLAServiceDefinition as _sila2_org_silastandard_core_silaservice_v1_SiLAServiceDefinition } from './sila2/org/silastandard/core/silaservice/v1/SiLAService';

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
          silaservice: {
            v1: {
              GetFeatureDefinition_Parameters: MessageTypeDefinition
              GetFeatureDefinition_Responses: MessageTypeDefinition
              Get_ImplementedFeatures_Parameters: MessageTypeDefinition
              Get_ImplementedFeatures_Responses: MessageTypeDefinition
              Get_ServerDescription_Parameters: MessageTypeDefinition
              Get_ServerDescription_Responses: MessageTypeDefinition
              Get_ServerName_Parameters: MessageTypeDefinition
              Get_ServerName_Responses: MessageTypeDefinition
              Get_ServerType_Parameters: MessageTypeDefinition
              Get_ServerType_Responses: MessageTypeDefinition
              Get_ServerUUID_Parameters: MessageTypeDefinition
              Get_ServerUUID_Responses: MessageTypeDefinition
              Get_ServerVendorURL_Parameters: MessageTypeDefinition
              Get_ServerVendorURL_Responses: MessageTypeDefinition
              Get_ServerVersion_Parameters: MessageTypeDefinition
              Get_ServerVersion_Responses: MessageTypeDefinition
              SetServerName_Parameters: MessageTypeDefinition
              SetServerName_Responses: MessageTypeDefinition
              SiLAService: SubtypeConstructor<typeof grpc.Client, _sila2_org_silastandard_core_silaservice_v1_SiLAServiceClient> & { service: _sila2_org_silastandard_core_silaservice_v1_SiLAServiceDefinition }
            }
          }
        }
      }
    }
  }
}

