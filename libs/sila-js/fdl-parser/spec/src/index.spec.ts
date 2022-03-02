import path from 'path';

import fse from 'fs-extra';

import logger from 'winston';

import { IFeatureDefinition, IFeatureDefinitionXMLRoot } from '../../src/types';
import { parseXML, silaXMLtoFeatureDefinition } from '../../src';
import { isDir, listScenariosSync } from '../fixtures/helpers';

const transport = new logger.transports.Console();

logger.add(transport);
logger.level = 'error';

const FIXTURES_DIR = path.join(__dirname, '../fixtures/');
const fixture = (...paths: Array<string>): string =>
  path.join(FIXTURES_DIR, ...paths);

describe('@sila-standard/fdl-parser', () => {
  // allow several different subdirectories in fixtures to run tests locally
  // with features which are not checked in due to .gitignore
  ['features', 'hidden_features'].forEach((featureDirectory) => {
    if (!isDir(fixture(featureDirectory))) return;

    const scenarios = listScenariosSync(fixture(featureDirectory));

    scenarios.forEach((scenario) => {
      beforeEach(async () => {
        fse.mkdirSync(fixture(featureDirectory, scenario, 'generated'), {
          recursive: true,
        });
      });

      afterEach(async () => {
        if (process.env.KEEP) return;

        await fse.remove(fixture(featureDirectory, scenario, 'generated'));
      });

      describe(`+ ${scenario}`, () => {
        const xmlFile = fixture(
          featureDirectory,
          scenario,
          `${scenario}.sila.xml`
        );
        const xmlObjectReferenceFile = fixture(
          featureDirectory,
          scenario,
          'reference',
          `${scenario}.raw.json`
        );
        const featureDefinitionReferenceFile = fixture(
          featureDirectory,
          scenario,
          'reference',
          `${scenario}.featureDefinition.json`
        );
        const featureDefinitionGeneratedFile = fixture(
          featureDirectory,
          scenario,
          'generated',
          `${scenario}.featureDefinition.json`
        );

        it('should load a SiLA XML', async () => {
          const xml = await fse.readFile(xmlFile, 'utf-8');
          const featureDefinitionXMLRoot: IFeatureDefinitionXMLRoot =
            parseXML(xml);

          expect(featureDefinitionXMLRoot.declaration).toBeDefined();

          const xmlObject = JSON.parse(
            await fse.readFile(xmlObjectReferenceFile, 'utf-8')
          );

          expect(featureDefinitionXMLRoot).toEqual(xmlObject);
        });

        it('should parse a SiLA XML into a featureDefinition', async () => {
          const xml = await fse.readFile(xmlFile, 'utf-8');
          const featureDefinition: IFeatureDefinition =
            silaXMLtoFeatureDefinition(xml);

          await fse.writeFile(
            featureDefinitionGeneratedFile,
            JSON.stringify(featureDefinition, null, 2)
          );

          expect(featureDefinition.sila2Version).toBe('1.0');

          const featureDefinitionReferenceObject = JSON.parse(
            await fse.readFile(featureDefinitionReferenceFile, 'utf-8')
          );

          expect(featureDefinition).toEqual(featureDefinitionReferenceObject);
        });
      });
    });
  });
});
