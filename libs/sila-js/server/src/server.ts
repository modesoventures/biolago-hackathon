import * as path from 'path';

import * as grpc from '@grpc/grpc-js';
import { v4 as uuidv4 } from 'uuid';

import {
  SiLAService,
  SiLAServiceRoot,
  SimulationController,
  SimulationControllerRoot,
  SimulationSwitcher,
  logger,
  standardFeatureDefinitionDir,
} from '@sila-standard/core';

const log = logger('SiLAServer');

export interface ServerOptions {
  name?: string;
  uuid?: string;
  host?: string;
  port?: number;
  simulationMode?: boolean;
}

interface StartResult {
  name: string;
  endpoint: string;
}

export class SiLAServer implements SimulationSwitcher {
  readonly name: string;
  readonly simulationMode: boolean;
  readonly uuid: string;
  readonly endpoint: string;
  readonly service: SiLAService;
  readonly simulationModeSwitchers: Array<SimulationSwitcher>;
  private grpcServer: grpc.Server;

  constructor(options?: ServerOptions) {
    this.name = options?.name ?? 'Unknown';
    this.uuid = options?.uuid ?? uuidv4();
    this.simulationMode = options?.simulationMode ?? false;
    this.simulationModeSwitchers = [];
    this.grpcServer = new grpc.Server();

    const host: string = options?.host ?? '0.0.0.0';
    const port: number = options?.port ?? 50051;

    this.endpoint = `${host}:${port}`;
    this.service = new SiLAService({
      serverName: this.name,
      serverUUID: this.uuid,
    });

    this.initServices();
  }

  private initServices(): void {
    log.debug('Initializing gRPC services');

    const simulationController = new SimulationController({
      simulationMode: this.simulationMode,
      simulationSwitcher: this,
    });

    this.grpcServer.addService(
      SiLAServiceRoot.sila2.org.silastandard.core.silaservice.v1.SiLAService
        .service,
      this.service.handler
    );
    this.grpcServer.addService(
      SimulationControllerRoot.sila2.org.silastandard.core.simulationcontroller
        .v1.SimulationController.service,
      simulationController.handler
    );

    this.addFeature('SimulationController', standardFeatureDefinitionDir);
  }

  addFeature(
    featureId: string,
    dataPath: string,
    switcher?: SimulationSwitcher
  ): void {
    const fdlFile = path.join(dataPath, `${featureId}.sila.xml`);

    this.service.registerFeature(featureId, fdlFile);
    if (switcher) {
      this.simulationModeSwitchers.push(switcher);
    }
  }

  switchToRealMode(): boolean {
    // FIXME: naive implementation that does not revert if there is a failure
    return this.simulationModeSwitchers.every((switcher) =>
      switcher.switchToRealMode()
    );
  }

  switchToSimulationMode(): boolean {
    // FIXME: naive implementation that does not revert if there is a failure
    return this.simulationModeSwitchers.every((switcher) =>
      switcher.switchToSimulationMode()
    );
  }

  start(): Promise<StartResult> {
    log.info('Starting server %s on %s', this.name, this.endpoint);
    return new Promise<StartResult>((resolve, reject) => {
      this.grpcServer.bindAsync(
        this.endpoint,
        grpc.ServerCredentials.createInsecure(),
        (error, port) => {
          if (port > 0) {
            this.grpcServer.start();
            log.info('Server started');
            log.info('Press ctrl-c to stop');
            resolve({ name: this.name, endpoint: this.endpoint });
          } else {
            log.error('Unable to bind:', error);
            reject(error);
          }
        }
      );
    });
  }

  shutdown(): void {
    log.info('Gracefully shutting down server %s', this.name);
    this.grpcServer.tryShutdown((error?) => {
      if (error) {
        log.error(
          'Unable to gracefully shutdown the server. Forcing shutdown.',
          error
        );
        this.grpcServer.forceShutdown();
      }
    });
  }
}
