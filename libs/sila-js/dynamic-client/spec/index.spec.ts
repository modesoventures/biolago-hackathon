import winston from 'winston';

import DynamicClient from '../src';

const transport = new winston.transports.Console();

winston.add(transport);
winston.level = 'error';

describe('@sila-standard/dynamic-client', () => {
  it('should initialize SiLAService', () => {
    const dynamicClient = new DynamicClient();

    expect(dynamicClient.state).toBe('initialized');
    expect(dynamicClient.features).toHaveLength(1);
    expect(dynamicClient.featureList).toContain(
      'org.silastandard/core/SiLAService/v1'
    );
  });
});
