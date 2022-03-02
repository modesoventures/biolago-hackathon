/* eslint-disable camelcase */
/* eslint @typescript-eslint/no-unused-vars: ["warn"] */
import { readFileSync } from 'fs';

import * as path from 'path';
import * as grpc from '@grpc/grpc-js';

import { Get_ImplementedFeatures_Parameters } from './static/sila2/org/silastandard/core/silaservice/v1/Get_ImplementedFeatures_Parameters';
import { Get_ImplementedFeatures_Responses } from './static/sila2/org/silastandard/core/silaservice/v1/Get_ImplementedFeatures_Responses';
import { Get_ServerDescription_Parameters } from './static/sila2/org/silastandard/core/silaservice/v1/Get_ServerDescription_Parameters';
import { Get_ServerDescription_Responses } from './static/sila2/org/silastandard/core/silaservice/v1/Get_ServerDescription_Responses';
import { Get_ServerName_Parameters } from './static/sila2/org/silastandard/core/silaservice/v1/Get_ServerName_Parameters';
import { Get_ServerName_Responses } from './static/sila2/org/silastandard/core/silaservice/v1/Get_ServerName_Responses';
import { Get_ServerType_Parameters } from './static/sila2/org/silastandard/core/silaservice/v1/Get_ServerType_Parameters';
import { Get_ServerType_Responses } from './static/sila2/org/silastandard/core/silaservice/v1/Get_ServerType_Responses';
import { Get_ServerUUID_Parameters } from './static/sila2/org/silastandard/core/silaservice/v1/Get_ServerUUID_Parameters';
import { Get_ServerUUID_Responses } from './static/sila2/org/silastandard/core/silaservice/v1/Get_ServerUUID_Responses';
import { Get_ServerVendorURL_Parameters } from './static/sila2/org/silastandard/core/silaservice/v1/Get_ServerVendorURL_Parameters';
import { Get_ServerVendorURL_Responses } from './static/sila2/org/silastandard/core/silaservice/v1/Get_ServerVendorURL_Responses';
import { Get_ServerVersion_Parameters } from './static/sila2/org/silastandard/core/silaservice/v1/Get_ServerVersion_Parameters';
import { Get_ServerVersion_Responses } from './static/sila2/org/silastandard/core/silaservice/v1/Get_ServerVersion_Responses';
import {
  GetFeatureDefinition_Parameters,
  GetFeatureDefinition_Parameters__Output,
} from './static/sila2/org/silastandard/core/silaservice/v1/GetFeatureDefinition_Parameters';
import { GetFeatureDefinition_Responses } from './static/sila2/org/silastandard/core/silaservice/v1/GetFeatureDefinition_Responses';
import {
  SetServerName_Parameters,
  SetServerName_Parameters__Output,
} from './static/sila2/org/silastandard/core/silaservice/v1/SetServerName_Parameters';
import { SetServerName_Responses } from './static/sila2/org/silastandard/core/silaservice/v1/SetServerName_Responses';
import {
  SiLAServiceClient,
  SiLAServiceHandlers,
} from './static/sila2/org/silastandard/core/silaservice/v1/SiLAService';
import { SiLAValidationError } from './errors';
import { logger } from '../logging';

const log = logger('SiLAService');

export {
  GetFeatureDefinition_Parameters,
  GetFeatureDefinition_Parameters__Output,
  GetFeatureDefinition_Responses,
  Get_ImplementedFeatures_Parameters,
  Get_ImplementedFeatures_Responses,
  Get_ServerDescription_Parameters,
  Get_ServerDescription_Responses,
  Get_ServerName_Parameters,
  Get_ServerName_Responses,
  Get_ServerType_Parameters,
  Get_ServerType_Responses,
  Get_ServerUUID_Parameters,
  Get_ServerUUID_Responses,
  Get_ServerVendorURL_Parameters,
  Get_ServerVendorURL_Responses,
  Get_ServerVersion_Parameters,
  Get_ServerVersion_Responses,
  SetServerName_Parameters,
  SetServerName_Parameters__Output,
  SetServerName_Responses,
  SiLAServiceClient,
};

export interface SiLAServiceOptions {
  serverName: string;
  serverUUID: string;
  serverDescription?: string;
  serverType?: string;
  serverVendorURL?: string;
  serverVersion?: string;
}

export class SiLAService {
  serverName: string;
  readonly serverUUID: string;
  readonly serverDescription: string;
  readonly serverType: string;
  readonly serverVendorURL: string;
  readonly serverVersion: string;
  implementedFeatures: Map<string, string>;

  constructor(options: SiLAServiceOptions) {
    this.serverName = options.serverName;
    this.serverUUID = options.serverUUID;
    this.serverDescription = options.serverDescription || '';
    this.serverType = options.serverType || '';
    this.serverVendorURL = options.serverVendorURL || '';
    this.serverVersion = options.serverVersion || '';
    this.implementedFeatures = new Map();

    this.registerFeature(
      'SiLAService',
      path.join(
        __dirname,
        'assets',
        'feature_definitions',
        'org',
        'silastandard',
        'core',
        'SiLAService.sila.xml'
      )
    );
  }

  handler: SiLAServiceHandlers = {
    GetFeatureDefinition: (
      call: grpc.ServerUnaryCall<
        GetFeatureDefinition_Parameters,
        GetFeatureDefinition_Responses
      >,
      callback: grpc.sendUnaryData<GetFeatureDefinition_Responses>
    ): void => {
      log.info('GetFeatureDefinition was called');
      if (
        call.request &&
        call.request.QualifiedFeatureIdentifier &&
        call.request.QualifiedFeatureIdentifier.value
      ) {
        const featureId = call.request.QualifiedFeatureIdentifier.value;
        const featureDefinition = this.implementedFeatures.get(featureId);

        if (featureDefinition) {
          callback(null, { FeatureDefinition: { value: featureDefinition } });
        } else {
          const validationError = new SiLAValidationError(
            'GetFeatureDefinition_Parameters.QualifiedFeatureIdentifier',
            `Feature ${featureId} is unknown.`
          );

          callback(validationError.toServiceError());
        }
      } else {
        const validationError = new SiLAValidationError(
          'GetFeatureDefinition_Parameters.QualifiedFeatureIdentifier',
          `Feature identifier is undefined.`
        );

        callback(validationError.toServiceError());
      }
    },

    Get_ImplementedFeatures: (
      call: grpc.ServerUnaryCall<
        Get_ImplementedFeatures_Parameters,
        Get_ImplementedFeatures_Responses
      >,
      callback: grpc.sendUnaryData<Get_ImplementedFeatures_Responses>
    ): void => {
      log.info('Get_ImplementedFeatures was called');
      const ids = Array.from(this.implementedFeatures.keys()).map((item) => {
        return { value: item };
      });

      callback(null, { ImplementedFeatures: ids });
    },

    Get_ServerDescription: (
      call: grpc.ServerUnaryCall<
        Get_ServerDescription_Parameters,
        Get_ServerDescription_Responses
      >,
      callback: grpc.sendUnaryData<Get_ServerDescription_Responses>
    ): void => {
      log.info('Get_ServerDescription was called');
      callback(null, { ServerDescription: { value: this.serverDescription } });
    },

    Get_ServerName: (
      call: grpc.ServerUnaryCall<
        Get_ServerName_Parameters,
        Get_ServerName_Responses
      >,
      callback: grpc.sendUnaryData<Get_ServerName_Responses>
    ): void => {
      log.info('Get_ServerName was called');
      callback(null, { ServerName: { value: this.serverName } });
    },

    Get_ServerType: (
      call: grpc.ServerUnaryCall<
        Get_ServerType_Parameters,
        Get_ServerType_Responses
      >,
      callback: grpc.sendUnaryData<Get_ServerType_Responses>
    ): void => {
      log.info('Get_ServerType was called');
      callback(null, { ServerType: { value: this.serverType } });
    },

    Get_ServerUUID: (
      call: grpc.ServerUnaryCall<
        Get_ServerUUID_Parameters,
        Get_ServerUUID_Responses
      >,
      callback: grpc.sendUnaryData<Get_ServerUUID_Responses>
    ): void => {
      log.info('Get_ServerUUID was called');
      callback(null, { ServerUUID: { value: this.serverUUID } });
    },

    Get_ServerVendorURL: (
      call: grpc.ServerUnaryCall<
        Get_ServerVendorURL_Parameters,
        Get_ServerVendorURL_Responses
      >,
      callback: grpc.sendUnaryData<Get_ServerVendorURL_Responses>
    ): void => {
      log.info('Get_ServerVendorURL was called');
      callback(null, { ServerVendorURL: { value: this.serverVendorURL } });
    },

    Get_ServerVersion: (
      call: grpc.ServerUnaryCall<
        Get_ServerVersion_Parameters,
        Get_ServerVersion_Responses
      >,
      callback: grpc.sendUnaryData<Get_ServerVersion_Responses>
    ): void => {
      log.info('Get_ServerVersion was called');
      callback(null, { ServerVersion: { value: this.serverVersion } });
    },

    SetServerName: (
      call: grpc.ServerUnaryCall<
        SetServerName_Parameters,
        SetServerName_Responses
      >,
      callback: grpc.sendUnaryData<SetServerName_Responses>
    ): void => {
      log.info('SetServerName was called');
      if (
        call.request &&
        call.request.ServerName &&
        call.request.ServerName.value
      ) {
        this.serverName = call.request.ServerName.value;
        log.info(`Server name was set to ${this.serverName}`);
        callback(null, {});
      } else {
        const validationError = new SiLAValidationError(
          'SetServerName_Parameters.ServerName',
          'ServerName is undefined'
        );

        callback(validationError.toServiceError());
      }
    },
  };

  registerFeature(featureId: string, featureDefinitionFilename: string): void {
    if (featureDefinitionFilename) {
      const feature = readFileSync(featureDefinitionFilename, {
        encoding: 'utf8',
      });

      this.implementedFeatures.set(featureId, feature);
    } else {
      this.implementedFeatures.set(
        featureId,
        '<xml>Feature Definition Missing for this feature.</xml>'
      );
    }
  }
}
