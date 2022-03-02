import { silaBasePath } from '@sila-standard/sila-base';
import fse from 'fs-extra';
import path from 'path';

import logger from 'winston';
import { Endpoint, initClient } from '../src/index';

const transport = new logger.transports.Console();

logger.add(transport);

logger.level = 'error';

const endpoint: Endpoint = {
  hostname: 'localhost',
  port: 50051,
};

[
  ['feature_definitions/ch/unitelabs/core'],
  ['feature_definitions/ch/unitelabs/robot'],

  ['feature_definitions/com/madisoft/reader'],

  ['feature_definitions/de/diginbio/examples'],
  ['feature_definitions/de/tuberlin/bioprocess/briefing'],
  ['feature_definitions/de/tuberlin/bioprocess/communication'],
  ['feature_definitions/de/tuberlin/bioprocess/storing'],

  ['feature_definitions/org/silastandard/core'],
  ['feature_definitions/org/silastandard/core/commands'],
  ['feature_definitions/org/silastandard/examples'],
  ['feature_definitions/org/silastandard/instruments'],
  ['feature_definitions/org/silastandard/test'],

  ['xslt/test/valid-fdl'],
].forEach(([directory]) => {
  describe(`@sila-standard/client for ${directory}`, () => {
    fse
      .readdirSync(path.join(silaBasePath, directory))
      .filter(
        (dir) =>
          fse.lstatSync(path.join(silaBasePath, directory, dir)).isFile() &&
          dir.split('.')[1] === 'sila' &&
          dir.split('.')[2] === 'xml'
      )
      .forEach((scenario) => {
        const xmlfilename = path.join(silaBasePath, directory, scenario);

        it(`${scenario} should load and parse ${scenario}`, () => {
          const client = initClient(endpoint);

          expect(client.state).toBe('initialized');
          expect(client.features).toHaveLength(1);

          const xml = fse.readFileSync(xmlfilename).toString();

          const feature = client.addFeatureFromXML(xml);

          expect(client.featureList).toContain(
            feature.featureDefinition.fullyQualifiedFeatureIdentifier
          );
        });
      });
  });
});
