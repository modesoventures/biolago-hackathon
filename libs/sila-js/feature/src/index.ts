/* eslint-disable max-statements */
import path from 'path';

import fse from 'fs-extra';
import * as grpc from '@grpc/grpc-js';
import type { IFeatureDefinition } from '@sila-standard/fdl-parser';
import { silaBasePath } from '@sila-standard/sila-base';
import logger from 'winston';
import { protoFromFeatureDefinition } from '@sila-standard/proto-builder';
import * as protoLoader from '@grpc/proto-loader';
import { silaXMLtoFeatureDefinition } from '@sila-standard/fdl-parser';

type Options = { protobufPath: string; silaBasePath: string };

type Endpoint = { hostname: string; port: number };

const DEFAULT_OPTIONS: Options = {
  protobufPath: path.join(__dirname, '..', 'protobuf'),
  silaBasePath,
};

export interface IIndexable {
  [key: string]: any;
}

function copyProtoFile(
  featureIdentifier: string,
  inputFolder: string,
  outputFolder: string
) {
  fse.copyFileSync(
    path.join(inputFolder, `${featureIdentifier}.proto`),
    path.join(outputFolder, `${featureIdentifier}.proto`)
  );
}

export default class Feature {
  featureDefinition: IFeatureDefinition;

  protoString: string;
  options: Options;

  client: grpc.Client | undefined;

  constructor(
    featureDefinition: IFeatureDefinition,
    options: Options = DEFAULT_OPTIONS
  ) {
    this.featureDefinition = featureDefinition;
    this.protoString = protoFromFeatureDefinition(featureDefinition);
    this.options = options;

    logger.info(`FEATURE ${this.featureDefinition.title} - generated.`);
  }

  init(endpoint: Endpoint): void {
    logger.info(
      `FEATURE ${this.featureDefinition.title} - initializing @ ${endpoint.hostname}:${endpoint.port}`
    );
    const protoFilename: string = path.join(
      this.options.protobufPath,
      `${this.featureDefinition.title}.proto`
    );

    fse.mkdirSync(this.options.protobufPath, { recursive: true });

    fse.writeFileSync(protoFilename, this.protoString);

    copyProtoFile(
      'SiLABinaryTransfer',
      path.join(this.options.silaBasePath, 'protobuf'),
      this.options.protobufPath
    );
    copyProtoFile(
      'SiLAFramework',
      path.join(this.options.silaBasePath, 'protobuf'),
      this.options.protobufPath
    );

    const REGEX = /^(.*)package (.*);/gm;

    const fileContent = fse.readFileSync(protoFilename, 'utf8').toString();

    const packageNamespaceGroup = REGEX.exec(fileContent);

    const packageNamespace = packageNamespaceGroup
      ? packageNamespaceGroup[2]
      : '';

    const packageDefinition: protoLoader.PackageDefinition =
      protoLoader.loadSync(protoFilename, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      });

    const loadedPackageDefinition =
      grpc.loadPackageDefinition(packageDefinition);

    const ServiceClientImpl = (
      packageNamespace.split('.').reduce((a, b) => {
        return (a as IIndexable)[b];
      }, loadedPackageDefinition) as IIndexable
    )[this.featureDefinition.title];

    this.client = new ServiceClientImpl(
      `${endpoint.hostname}:${endpoint.port}`,
      grpc.credentials.createInsecure()
    );
    logger.info(`FEATURE ${this.featureDefinition.title} - initialized.`);
  }

  // SiLA specific routines

  getProperty(propertyIdentifier: string): Promise<never> {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        reject('No connection');
        return;
      }

      (this.client as IIndexable)[`Get_${propertyIdentifier}`].call(
        this.client,
        {},
        (err: grpc.ServiceError | null, value?: any) => {
          if (err) reject(err);

          if (!value) {
            reject('No connection');
          } else {
            resolve(value[propertyIdentifier]);
          }
        }
      );
    });
  }

  subscribeObservableProperty(
    propertyIdentifier: string,
    callback: any
  ): Promise<never> {
    return new Promise((resolve) => {
      const call = (this.client as IIndexable)[`${propertyIdentifier}`].call(
        this.client
      );

      call.on('data', callback);

      call.on('end', resolve);

      call.on('error', resolve);
    });
  }

  runCommand(commandIdentifier: string, parameter: any): Promise<never> {
    return new Promise((resolve, reject) => {
      (this.client as IIndexable)[`${commandIdentifier}`].call(
        this.client,
        parameter,
        (err: grpc.ServiceError | null, value?: any) => {
          if (err) {
            reject(err);
          }

          if (!value) {
            reject('No connection');
          } else {
            resolve(value);
          }
        }
      );
    });
  }

  subscribeObservableCommand(
    commandIdentifier: string,
    parameter: any,
    callback: any
  ): Promise<never> {
    return new Promise((resolve) => {
      const call = (this.client as IIndexable)[
        `${commandIdentifier}_Info`
      ].call(this.client, parameter);

      call.on('data', callback);

      call.on('end', resolve);

      call.on('error', resolve);
    });
  }

  subscribeIntermediateResults(
    commandIdentifier: string,
    parameter: any,
    callback: any
  ): Promise<never> {
    return new Promise((resolve) => {
      const call = (this.client as IIndexable)[
        `${commandIdentifier}_Intermediate`
      ].call(this.client, parameter);

      call.on('data', callback);

      call.on('end', resolve);

      call.on('error', resolve);
    });
  }
}

// initialization functions

export const featureFromFeatureDefinition = (
  featureDefinition: IFeatureDefinition,
  options: Options = DEFAULT_OPTIONS
): Feature => {
  const feature = new Feature(featureDefinition, options);

  return feature;
};

export const featureFromSiLAXML = (
  silaXML: string,
  options: Options = DEFAULT_OPTIONS
): Feature => {
  const feature = new Feature(silaXMLtoFeatureDefinition(silaXML), options);

  return feature;
};
