import fse from 'fs-extra';
import path from 'path';

import { IFeatureDefinition } from '@sila-standard/fdl-parser';

import logger from 'winston';
import { featureFromFeatureDefinition } from '../src/index';

const transport = new logger.transports.Console();

logger.add(transport);

logger.level = 'error';

describe('index', () => {
  it('should load and parse a featureDefinition', () => {
    const featureDefinition: IFeatureDefinition = JSON.parse(
      fse
        .readFileSync(
          path.join(__dirname, 'support', 'SiLAService.featureDefinition.json')
        )
        .toString()
    );

    const feature = featureFromFeatureDefinition(featureDefinition);

    expect(feature.featureDefinition.sila2Version).toBe('1.0');
    expect(feature.protoString).toBeDefined();

    feature.init({ hostname: 'localhost', port: 50051 });
  });
});
