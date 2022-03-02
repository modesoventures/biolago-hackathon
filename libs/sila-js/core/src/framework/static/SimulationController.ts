import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { SimulationControllerClient as _sila2_org_silastandard_core_simulationcontroller_v1_SimulationControllerClient, SimulationControllerDefinition as _sila2_org_silastandard_core_simulationcontroller_v1_SimulationControllerDefinition } from './sila2/org/silastandard/core/simulationcontroller/v1/SimulationController';

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
          simulationcontroller: {
            v1: {
              Get_SimulationMode_Parameters: MessageTypeDefinition
              Get_SimulationMode_Responses: MessageTypeDefinition
              SimulationController: SubtypeConstructor<typeof grpc.Client, _sila2_org_silastandard_core_simulationcontroller_v1_SimulationControllerClient> & { service: _sila2_org_silastandard_core_simulationcontroller_v1_SimulationControllerDefinition }
              StartRealMode_Parameters: MessageTypeDefinition
              StartRealMode_Responses: MessageTypeDefinition
              StartSimulationMode_Parameters: MessageTypeDefinition
              StartSimulationMode_Responses: MessageTypeDefinition
            }
          }
        }
      }
    }
  }
}

