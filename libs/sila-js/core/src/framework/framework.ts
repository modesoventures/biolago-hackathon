import * as path from 'path';

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

import { ProtoGrpcType as ServiceType } from './static/SiLAService';
import { ProtoGrpcType as SimulationType } from './static/SimulationController';

const silaBasePath = path.join(__dirname, 'assets');

const serviceDefn = protoLoader.loadSync('SiLAService.proto', {
  includeDirs: [
    path.join(silaBasePath, 'protobuf'),
    path.join(silaBasePath, 'protobuf', 'org.silastandard'),
  ],
});

const simDefn = protoLoader.loadSync('SimulationController.proto', {
  includeDirs: [
    path.join(silaBasePath, 'protobuf'),
    path.join(silaBasePath, 'protobuf', 'org.silastandard'),
  ],
});

export const SiLAServiceRoot = grpc.loadPackageDefinition(
  serviceDefn
) as unknown as ServiceType;
export const SimulationControllerRoot = grpc.loadPackageDefinition(
  simDefn
) as unknown as SimulationType;

export const standardFeatureDefinitionDir = path.join(
  silaBasePath,
  'feature_definitions',
  'org',
  'silastandard',
  'core'
);
