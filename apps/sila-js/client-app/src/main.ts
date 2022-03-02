import DynamicClient, { Endpoint } from '@sila-standard/dynamic-client';
import path from 'path';

import logger from 'winston';

const transport = new logger.transports.Console();

transport.format = logger.format.combine(
  logger.format.timestamp(),
  logger.format.prettyPrint()
);
logger.add(transport);
logger.level = 'info';

const endpoint: Endpoint = {
  hostname: 'localhost',
  port: 55001,
};

export default async function go(): Promise<void> {
  const dynamicClient = new DynamicClient(endpoint, {
    protobufPath: path.join(__dirname, 'assets', 'protobuf'),
    silaBasePath:  path.join(__dirname, 'assets'),
  });

  await dynamicClient.initSiLAFeatures();

  await dynamicClient.getImplementedFeatures();

  const response = await dynamicClient
    .useFeature('org.silastandard/core/SiLAService/v1')
    .getProperty('ServerName');

  logger.info(`Result of getProperty ServerName: ${(response as any).value}`);
}

go();
