import DynamicClient, { Endpoint } from '@sila-standard/dynamic-client';

import logger from 'winston';

const transport = new logger.transports.Console();

transport.format = logger.format.combine(
  logger.format.timestamp(),
  logger.format.prettyPrint()
);
logger.add(transport);
logger.level = 'info';

const endpoint: Endpoint = {
  hostname: '127.0.0.1',
  port: 55054,
};

export default async function go(): Promise<void> {
  const dynamicClient = new DynamicClient(endpoint);

  await dynamicClient.initSiLAFeatures();

  await dynamicClient.getImplementedFeatures();

  const response = await dynamicClient
    .useFeature('org.silastandard/core/SiLAService/v1')
    .getProperty('ServerName');

  logger.info(`Result of getProperty ServerName: ${(response as any).value}`);
}
