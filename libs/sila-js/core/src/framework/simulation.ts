/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import * as grpc from '@grpc/grpc-js';

import { Get_SimulationMode_Parameters } from './static/sila2/org/silastandard/core/simulationcontroller/v1/Get_SimulationMode_Parameters';
import { Get_SimulationMode_Responses } from './static/sila2/org/silastandard/core/simulationcontroller/v1/Get_SimulationMode_Responses';
import { SimulationControllerClient, SimulationControllerHandlers } from './static/sila2/org/silastandard/core/simulationcontroller/v1/SimulationController';
import { StartRealMode_Parameters } from './static/sila2/org/silastandard/core/simulationcontroller/v1/StartRealMode_Parameters';
import { StartRealMode_Responses } from './static/sila2/org/silastandard/core/simulationcontroller/v1/StartRealMode_Responses';
import { StartSimulationMode_Parameters } from './static/sila2/org/silastandard/core/simulationcontroller/v1/StartSimulationMode_Parameters';
import { StartSimulationMode_Responses } from './static/sila2/org/silastandard/core/simulationcontroller/v1/StartSimulationMode_Responses';
import { logger } from '../logging';

const log = logger('SimulationController');

export {
  Get_SimulationMode_Parameters,
  Get_SimulationMode_Responses,
  SimulationControllerClient,
  StartRealMode_Parameters,
  StartRealMode_Responses,
  StartSimulationMode_Parameters,
  StartSimulationMode_Responses,
}

export interface SimulationSwitcher {
  switchToSimulationMode(): boolean;
  switchToRealMode(): boolean;
}

export interface SimulationControllerOptions {
  simulationMode?: boolean;
  simulationSwitcher: SimulationSwitcher;
}

export class SimulationController {

  simulationMode = false;
  private simulationSwitcher: SimulationSwitcher;

  constructor(options: SimulationControllerOptions) {
    this.simulationSwitcher = options.simulationSwitcher;
    if (options.simulationMode) {
      this.simulationMode = options.simulationMode;
    }
  }

  handler: SimulationControllerHandlers = {
    Get_SimulationMode: (
      call: grpc.ServerUnaryCall<Get_SimulationMode_Parameters, Get_SimulationMode_Responses>,
      callback: grpc.sendUnaryData<Get_SimulationMode_Responses>
    ): void => {
      log.info(`Get_SimulationMode called; current mode is ${this.simulationMode}`);
      callback(null, { SimulationMode: { value: this.simulationMode } });
    },

    StartRealMode: (
      call: grpc.ServerUnaryCall<StartRealMode_Parameters, StartRealMode_Responses>,
      callback: grpc.sendUnaryData<StartRealMode_Responses>
    ): void => {
      log.info(`StartRealMode called; current mode is ${this.simulationMode}`);
      if (this.simulationSwitcher.switchToRealMode()) {
        this.simulationMode = false;
      }
      callback(null, {});
    },

    StartSimulationMode: (
      call: grpc.ServerUnaryCall<StartSimulationMode_Parameters, StartSimulationMode_Responses>,
      callback: grpc.sendUnaryData<StartSimulationMode_Responses>
    ): void => {
      log.info(`StartSimulationMode called; current mode is ${this.simulationMode}`);
      if (this.simulationSwitcher.switchToSimulationMode()) {
        this.simulationMode = true;
      }
      callback(null, {});
    },
  };
}
