/* eslint prettier/prettier: ["warn"] */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
/* eslint-disable no-plusplus */
import * as grpc from '@grpc/grpc-js';

import {
  GetFeatureDefinition_Responses as FeatureDefn,
  Get_ImplementedFeatures_Responses as ImplementedFeatures,
  Get_ServerDescription_Responses as ServerDescription,
  Get_ServerName_Responses as ServerName,
  Get_ServerType_Responses as ServerType,
  Get_ServerUUID_Responses as ServerUUID,
  Get_ServerVendorURL_Responses as ServerVendorURL,
  Get_ServerVersion_Responses as ServerVersion,
  SetServerName_Responses,
  SiLAServiceClient,
  SiLAServiceRoot,
  SimulationControllerClient,
  SimulationControllerRoot,
  Get_SimulationMode_Responses as SimulationMode,
} from '@sila-standard/core';

import ClientWrapper from './client-wrapper';
import SiLAServiceClientWrapper from './service-client-wrapper';
import SimulationControllerClientWrapper from './simulation-client-wrapper';

interface ServiceClientConstructor {
  new (address: string, credentials: grpc.ChannelCredentials): grpc.Client;
  service: grpc.ServiceDefinition;
}

export interface ClientOptions {
  name?: string;
  serverName?: string;
  serverHost?: string;
  serverPort?: number;
  credentials?: grpc.ChannelCredentials;
}

export class SiLAClient {
  readonly name: string;
  readonly serverName: string;
  readonly endpoint: string;
  private credentials: grpc.ChannelCredentials;
  private serviceClient: SiLAServiceClientWrapper;
  private simulationClient: SimulationControllerClientWrapper;
  private clients: Array<ClientWrapper> = [];

  constructor(options?: ClientOptions) {
    this.name = options?.name ?? 'Unknown';
    this.serverName = options?.serverName ?? 'Unknown';
    this.credentials =
      options?.credentials ?? grpc.credentials.createInsecure();

    const host: string = options?.serverHost ?? '0.0.0.0';
    const port: number = options?.serverPort ?? 50051;

    this.endpoint = `${host}:${port}`;
    this.serviceClient = new SiLAServiceClientWrapper(
      this.registerServiceClient(
        'SiLAService',
        SiLAServiceRoot.sila2.org.silastandard.core.silaservice.v1.SiLAService
      ) as SiLAServiceClient
    );
    this.simulationClient = new SimulationControllerClientWrapper(
      this.registerServiceClient(
        'SimulationController',
        SimulationControllerRoot.sila2.org.silastandard.core
          .simulationcontroller.v1.SimulationController
      ) as SimulationControllerClient
    );
  }

  registerServiceClient(
    name: string,
    ClientConstructor: ServiceClientConstructor
  ): grpc.Client {
    const client = new ClientConstructor(this.endpoint, this.credentials);

    this.clients.push(new ClientWrapper(name, client));
    return client;
  }

  start(): Promise<number> {
    let clientsRemaining: number = this.clients.length;
    const deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 5);
    return new Promise<number>((resolve, reject) => {
      this.clients.forEach((client) => {
        client.waitForReady(deadline, (error?: Error) => {
          if (error) {
            reject(
              new Error(
                `Unable to connect to ${client.name} server: ${error.message}`
              )
            );
          }
          --clientsRemaining;
          if (clientsRemaining <= 0) {
            resolve(this.clients.length);
          }
        });
      });
    });
  }

  getFeatureDefinition(featureId: string): Promise<string> {
    return this._getStringValue<FeatureDefn>(
      (client, callback) => {
        client.GetFeatureDefinition(
          { QualifiedFeatureIdentifier: { value: featureId } },
          callback
        );
      },
      (response: FeatureDefn) => response.FeatureDefinition
    );
  }

  getImplementedFeatures(): Promise<Array<string>> {
    return new Promise<Array<string>>((resolve, reject) => {
      this.serviceClient.Get_ImplementedFeatures(
        {},
        (err?: grpc.ServiceError, response?: ImplementedFeatures) => {
          if (err) {
            reject(err);
          } else if (response && response.ImplementedFeatures) {
            const features = response.ImplementedFeatures;

            resolve(
              features.map((feature) => {
                if (feature.value) {
                  return feature.value;
                }
                return 'UNKNOWN_FEATURE';
              })
            );
          } else {
            reject(new Error('No response received'));
          }
        }
      );
    });
  }

  getServerDescription(): Promise<string> {
    return this._getStringValue<ServerDescription>(
      (client, callback) => {
        client.Get_ServerDescription({}, callback);
      },
      (response: ServerDescription) => response.ServerDescription
    );
  }

  getServerName(): Promise<string> {
    return this._getStringValue<ServerName>(
      (client, callback) => {
        client.Get_ServerName({}, callback);
      },
      (response: ServerName) => response.ServerName
    );
  }

  getServerType(): Promise<string> {
    return this._getStringValue<ServerType>(
      (client, callback) => {
        client.Get_ServerType({}, callback);
      },
      (response: ServerType) => response.ServerType
    );
  }

  getServerUUID(): Promise<string> {
    return this._getStringValue<ServerUUID>(
      (client, callback) => {
        client.Get_ServerUUID({}, callback);
      },
      (response: ServerUUID) => response.ServerUUID
    );
  }

  getServerVendorURL(): Promise<string> {
    return this._getStringValue<ServerVendorURL>(
      (client, callback) => {
        client.Get_ServerVendorURL({}, callback);
      },
      (response: ServerVendorURL) => response.ServerVendorURL
    );
  }

  getServerVersion(): Promise<string> {
    return this._getStringValue<ServerVersion>(
      (client, callback) => {
        client.Get_ServerVersion({}, callback);
      },
      (response: ServerVersion) => response.ServerVersion
    );
  }

  setServerName(serverName: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.serviceClient.SetServerName(
        { ServerName: { value: serverName } },
        (err?: grpc.ServiceError, response?: SetServerName_Responses) => {
          if (err) {
            reject(err);
          } else {
            resolve(response != null && typeof response !== 'undefined');
          }
        }
      );
    });
  }

  getSimulationMode(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.simulationClient.Get_SimulationMode(
        {},
        (err?: grpc.ServiceError, response?: SimulationMode) => {
          if (err) {
            reject(err);
          } else if (
            response &&
            response.SimulationMode &&
            typeof response.SimulationMode.value != 'undefined'
          ) {
            resolve(response.SimulationMode.value);
          } else {
            reject(new Error('No response received'));
          }
        }
      );
    });
  }

  startRealMode(): Promise<void> {
    return this._startMode((client, callback) => {
      client.StartRealMode({}, callback);
    });
  }

  startSimulationMode(): Promise<void> {
    return this._startMode((client, callback) => {
      client.StartSimulationMode({}, callback);
    });
  }

  private _startMode(method: (...args: any) => void): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      method(this.simulationClient, (err?: grpc.ServiceError) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  private _getStringValue<T>(
    method: (...args: any) => void,
    value: (response: T) => { value?: string } | null | undefined
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      method(
        this.serviceClient,
        (err?: grpc.ServiceError, response?: T | undefined) => {
          if (err) {
            reject(err);
          } else if (response) {
            const val = value(response);

            if (val && (val.value || val.value === '')) {
              resolve(val.value);
            } else {
              reject(new Error('No value received'));
            }
          } else {
            reject(new Error('No response received'));
          }
        }
      );
    });
  }
}
