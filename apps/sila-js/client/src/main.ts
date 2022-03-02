/* eslint-disable max-statements */
import fse from 'fs-extra';
import path from 'path';

/* eslint-disable max-len */
import Feature, { featureFromSiLAXML } from '@sila-standard/feature';
import { silaBasePath } from '@sila-standard/sila-base';
import logger from 'winston';

export type Options = { protobufPath: string; silaBasePath: string };

export type Endpoint = { hostname: string; port: number };

const DEFAULT_OPTIONS: Options = {
  protobufPath: path.join(__dirname, '..', 'protobuf'),
  silaBasePath,
};

const DEFAULT_ENDPOINT: Endpoint = {
  hostname: 'localhost',
  port: 50051,
};

export default class Client {
  state: string;

  options: Options = DEFAULT_OPTIONS;
  endpoint: Endpoint = DEFAULT_ENDPOINT;

  features: Array<Feature>;

  constructor(options: Options = DEFAULT_OPTIONS) {
    this.state = 'initialized';
    this.options = options;

    logger.info(`CLIENT - generating...`);

    fse.mkdirSync(this.options.protobufPath, { recursive: true });
    if (
      !fse.existsSync(
        path.join(this.options.protobufPath, 'SiLABinaryTransfer.proto')
      )
    ) {
      fse.copyFileSync(
        path.join(
          this.options.silaBasePath,
          'protobuf',
          'SiLABinaryTransfer.proto'
        ),
        path.join(this.options.protobufPath, 'SiLABinaryTransfer.proto')
      );
    }
    if (
      !fse.existsSync(
        path.join(this.options.protobufPath, 'SiLAFramework.proto')
      )
    ) {
      fse.copyFileSync(
        path.join(this.options.silaBasePath, 'protobuf', 'SiLAFramework.proto'),
        path.join(this.options.protobufPath, 'SiLAFramework.proto')
      );
    }

    this.features = [];

    logger.info(`CLIENT - generated.`);
  }

  init(endpoint: Endpoint): Feature {
    this.endpoint = endpoint;

    // Every SiLA server MUST implement SiLAService
    return this.initFeature('org.silastandard/core/SiLAService/v1');
  }

  get featureList(): Array<string> {
    return this.features.map(
      ({ featureDefinition }) =>
        featureDefinition.fullyQualifiedFeatureIdentifier
    );
  }

  initFeature(fullyQualifiedFeatureIdentifier: string): Feature {
    logger.info(
      `CLIENT - initialize existing feature - ${fullyQualifiedFeatureIdentifier}`
    );
    const featurePath: string = path.join(
      this.options.silaBasePath,
      'feature_definitions',
      path.join(...fullyQualifiedFeatureIdentifier.split('/')[0].split('.')),
      path.join(...fullyQualifiedFeatureIdentifier.split('/')[1].split('.')),
      `${fullyQualifiedFeatureIdentifier.split('/')[2]}.sila.xml`
    );

    const xml: string = fse.readFileSync(featurePath).toString();

    const feature: Feature = featureFromSiLAXML(xml, this.options);

    fse.writeFileSync(
      path.join(
        this.options.protobufPath,
        `${feature.featureDefinition.title}.proto`
      ),
      feature.protoString
    );

    this.features.push(feature);
    feature.init(this.endpoint);
    return feature;
  }

  useFeature(fqfi: string): Feature {
    return (
      this.features.find(
        ({ featureDefinition }) =>
          featureDefinition.fullyQualifiedFeatureIdentifier === fqfi
      ) || this.initFeature(fqfi)
    );
  }

  addFeatureFromXML(xml: string): Feature {
    logger.info(`CLIENT - initialize existing feature from XML`);
    const feature: Feature = featureFromSiLAXML(xml, this.options);

    if (
      this.featureList.includes(
        feature.featureDefinition.fullyQualifiedFeatureIdentifier
      )
    ) {
      return feature;
    }

    fse.writeFileSync(
      path.join(
        this.options.protobufPath,
        `${feature.featureDefinition.title}.proto`
      ),
      feature.protoString
    );

    this.features.push(feature);
    feature.init(this.endpoint);
    return feature;
  }
}

export const initClient = (
  endpoint: Endpoint = DEFAULT_ENDPOINT,
  options: Options = DEFAULT_OPTIONS
): Client => {
  const client = new Client(options);

  client.init(endpoint);

  return client;
};
