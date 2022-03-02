import path from 'path';

import Client, { Endpoint, Options } from '@sila-standard/client';
import { silaBasePath } from '@sila-standard/sila-base';
import logger from 'winston';
import Feature from '@sila-standard/feature';

const DEFAULT_OPTIONS: Options = {
  protobufPath: path.join(__dirname, '..', 'protobuf'),
  silaBasePath,
};

const DEFAULT_ENDPOINT: Endpoint = {
  hostname: 'localhost',
  port: 55001,
};

export * from '@sila-standard/client';
export { silaBasePath } from '@sila-standard/sila-base';

export default class DynamicClient extends Client {
  constructor(
    endpoint: Endpoint = DEFAULT_ENDPOINT,
    options: Options = DEFAULT_OPTIONS
  ) {
    super(options);
    logger.info(
      `DYNAMIC CLIENT - initialize @ ${endpoint.hostname}:${endpoint.port}`
    );
    this.init(endpoint);
  }

  async initSiLAFeatures(): Promise<Feature[]> {
    await this.getImplementedFeatures();

    return this.features;
  }

  async getImplementedFeatures(): Promise<Feature[]> {
    const SiLAService = this.useFeature('org.silastandard/core/SiLAService/v1');

    const remoteFeatures: Array<any> = await SiLAService.getProperty(
      'ImplementedFeatures'
    );

    for (const remoteFeatureIdentifier of remoteFeatures) {
      logger.info(
        `CLIENT - get feature definition - ${remoteFeatureIdentifier.value}`
      );
      // eslint-disable-next-line no-await-in-loop
      const response: any = await SiLAService.runCommand(
        'GetFeatureDefinition',
        {
          FeatureIdentifier: remoteFeatureIdentifier,
        }
      );

      const featureDefinitionXML = response.FeatureDefinition.value;

      this.addFeatureFromXML(featureDefinitionXML);
    }

    return Promise.resolve(this.features);
  }
}
