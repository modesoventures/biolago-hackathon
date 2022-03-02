import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { ObservableCommandControllerClient as _sila2_org_silastandard_core_observablecommandcontroller_v1_ObservableCommandControllerClient, ObservableCommandControllerDefinition as _sila2_org_silastandard_core_observablecommandcontroller_v1_ObservableCommandControllerDefinition } from './sila2/org/silastandard/core/observablecommandcontroller/v1/ObservableCommandController';

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
          observablecommandcontroller: {
            v1: {
              Abort_Parameters: MessageTypeDefinition
              Abort_Responses: MessageTypeDefinition
              DataType_UUID: MessageTypeDefinition
              Get_SupportedCommands_Parameters: MessageTypeDefinition
              Get_SupportedCommands_Responses: MessageTypeDefinition
              ObservableCommandController: SubtypeConstructor<typeof grpc.Client, _sila2_org_silastandard_core_observablecommandcontroller_v1_ObservableCommandControllerClient> & { service: _sila2_org_silastandard_core_observablecommandcontroller_v1_ObservableCommandControllerDefinition }
              Pause_Parameters: MessageTypeDefinition
              Pause_Responses: MessageTypeDefinition
              Resume_Parameters: MessageTypeDefinition
              Resume_Responses: MessageTypeDefinition
            }
          }
        }
      }
    }
  }
}

