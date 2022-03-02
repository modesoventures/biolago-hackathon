import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { LockControllerClient as _sila2_org_silastandard_core_lockcontroller_v1_LockControllerClient, LockControllerDefinition as _sila2_org_silastandard_core_lockcontroller_v1_LockControllerDefinition } from './sila2/org/silastandard/core/lockcontroller/v1/LockController';

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
          lockcontroller: {
            v1: {
              Get_FCPAffectedByMetadata_LockIdentifier_Parameters: MessageTypeDefinition
              Get_FCPAffectedByMetadata_LockIdentifier_Responses: MessageTypeDefinition
              Get_IsLocked_Parameters: MessageTypeDefinition
              Get_IsLocked_Responses: MessageTypeDefinition
              LockController: SubtypeConstructor<typeof grpc.Client, _sila2_org_silastandard_core_lockcontroller_v1_LockControllerClient> & { service: _sila2_org_silastandard_core_lockcontroller_v1_LockControllerDefinition }
              LockServer_Parameters: MessageTypeDefinition
              LockServer_Responses: MessageTypeDefinition
              Metadata_LockIdentifier: MessageTypeDefinition
              UnlockServer_Parameters: MessageTypeDefinition
              UnlockServer_Responses: MessageTypeDefinition
            }
          }
        }
      }
    }
  }
}

