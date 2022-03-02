import fse from 'fs-extra';
import path from 'path';

import * as protoLoader from '@grpc/proto-loader';

import {
  silaXMLtoFeatureDefinition,
  IFeatureDefinition,
} from '@sila-standard/fdl-parser';
import { silaBasePath } from '@sila-standard/sila-base';

import logger from 'winston';
import { protoFromFeatureDefinition } from '../src/index';

const transport = new logger.transports.Console();

logger.add(transport);
logger.level = 'error';

[
  [
    'feature_definitions/ch/unitelabs/core',
    'protobuf/ch/unitelabs/core',
    path.join(silaBasePath, 'protobuf'),
  ],
  [
    'feature_definitions/ch/unitelabs/robot',
    'protobuf/ch/unitelabs/robot',
    path.join(silaBasePath, 'protobuf'),
  ],

  [
    'feature_definitions/com/madisoft/reader',
    'protobuf/com/madisoft/reader',
    path.join(silaBasePath, 'protobuf'),
  ],

  [
    'feature_definitions/de/diginbio/examples',
    'protobuf/de/diginbio/examples',
    path.join(silaBasePath, 'protobuf'),
  ],
  [
    'feature_definitions/de/tuberlin/bioprocess/briefing',
    'protobuf/de/tuberlin/bioprocess/briefing',
    path.join(silaBasePath, 'protobuf'),
  ],
  [
    'feature_definitions/de/tuberlin/bioprocess/communication',
    'protobuf/de/tuberlin/bioprocess/communication',
    path.join(silaBasePath, 'protobuf'),
  ],
  [
    'feature_definitions/de/tuberlin/bioprocess/storing',
    'protobuf/de/tuberlin/bioprocess/storing',
    path.join(silaBasePath, 'protobuf'),
  ],

  [
    'feature_definitions/org/silastandard/core',
    'protobuf/org/silastandard/core',
    path.join(silaBasePath, 'protobuf'),
  ],
  [
    'feature_definitions/org/silastandard/core/commands',
    'protobuf/org/silastandard/core/commands',
    path.join(silaBasePath, 'protobuf'),
  ],
  [
    'feature_definitions/org/silastandard/examples',
    'protobuf/org/silastandard/examples',
    path.join(silaBasePath, 'protobuf'),
  ],
  [
    'feature_definitions/org/silastandard/instruments',
    'protobuf/org/silastandard/instruments',
    path.join(silaBasePath, 'protobuf'),
  ],
  [
    'feature_definitions/org/silastandard/test',
    'protobuf/org/silastandard/test',
    path.join(silaBasePath, 'protobuf'),
  ],

  [
    'xslt/test/valid-fdl',
    'xslt/test/reference-proto',
    path.join(silaBasePath, 'protobuf'),
  ],
].forEach(([directory, directoryOriginalProtobuf, directoryProtobuf]) => {
  describe(`proto-loader ${directory}`, () => {
    const basePath = path.join(silaBasePath, directory);

    fse
      .readdirSync(basePath)
      .filter(
        (dir) =>
          fse.lstatSync(path.join(basePath, dir)).isFile() &&
          dir.split('.')[1] === 'sila' &&
          dir.split('.')[2] === 'xml'
      )
      .forEach((featureFile) => {
        const scenario = featureFile.split('.')[0];

        const folderOriginal = path.join(
          silaBasePath,
          directoryOriginalProtobuf
        );

        const protoFilenameOriginal = path.join(
          folderOriginal,
          `${scenario}.proto`
        );

        const folderGenerated = path.join(__dirname, '..', 'tmp', scenario);

        fse.mkdirSync(folderGenerated, { recursive: true });

        it(`${scenario} should generate proto file from featureDefinition`, async () => {
          let protoOriginal = {};

          await protoLoader
            .load(protoFilenameOriginal, { includeDirs: [directoryProtobuf] })
            .then((root) => {
              protoOriginal = root;
            });

          fse.writeFileSync(
            path.join(folderGenerated, `${scenario}.original.proto`),
            fse.readFileSync(protoFilenameOriginal).toString()
          );

          fse.writeFileSync(
            path.join(folderGenerated, `${scenario}.original.protoraw`),
            JSON.stringify(protoOriginal, null, 2)
          );

          // Prepare generation of proto file

          fse.mkdirSync(folderGenerated, { recursive: true });

          const featureDefinition: IFeatureDefinition =
            silaXMLtoFeatureDefinition(
              fse.readFileSync(path.join(basePath, featureFile)).toString()
            );

          fse.writeFileSync(
            path.join(folderGenerated, `${scenario}.featureDefinition`),
            JSON.stringify(featureDefinition, null, 99)
          );

          fse.writeFileSync(
            path.join(folderGenerated, `${scenario}.proto`),
            protoFromFeatureDefinition(featureDefinition)
          );

          let protoGenerated = {};

          await protoLoader
            .load(path.join(folderGenerated, `${scenario}.proto`), {
              includeDirs: [directoryProtobuf],
            })
            .then((root) => {
              protoGenerated = root;
            });

          fse.writeFileSync(
            path.join(folderGenerated, `${scenario}.protoraw`),
            JSON.stringify(protoGenerated, null, 2)
          );

          expect(JSON.stringify(protoGenerated, null, 2).length).toEqual(
            JSON.stringify(protoOriginal, null, 2).length
          );
        });
      });
  });
});
