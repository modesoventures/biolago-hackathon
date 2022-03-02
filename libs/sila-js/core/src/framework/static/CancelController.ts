import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { CancelControllerClient as _sila2_org_silastandard_core_cancelcontroller_v1_CancelControllerClient, CancelControllerDefinition as _sila2_org_silastandard_core_cancelcontroller_v1_CancelControllerDefinition } from './sila2/org/silastandard/core/cancelcontroller/v1/CancelController';

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
          cancelcontroller: {
            v1: {
              CancelController: SubtypeConstructor<typeof grpc.Client, _sila2_org_silastandard_core_cancelcontroller_v1_CancelControllerClient> & { service: _sila2_org_silastandard_core_cancelcontroller_v1_CancelControllerDefinition }
              Cancel_Parameters: MessageTypeDefinition
              Cancel_Responses: MessageTypeDefinition
            }
          }
        }
      }
    }
  }
}

