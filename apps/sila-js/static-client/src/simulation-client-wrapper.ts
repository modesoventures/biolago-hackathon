/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
import { SimulationControllerClient } from '@sila-standard/core';

export default class SimulationControllerClientWrapper {
  private simulationClient: SimulationControllerClient;

  constructor(simulationClient: SimulationControllerClient) {
    this.simulationClient = simulationClient;
  }

  Get_SimulationMode(...args: any): void {
    this.simulationClient.Get_SimulationMode(args[0], args[1]);
  }

  StartRealMode(...args: any): void {
    this.simulationClient.StartRealMode(args[0], args[1]);
  }

  StartSimulationMode(...args: any): void {
    this.simulationClient.StartSimulationMode(args[0], args[1]);
  }
}
