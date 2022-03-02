/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import * as grpc from '@grpc/grpc-js';
import { SiLAServiceRoot } from '@sila-standard/core';

import ClientWrapper from '../src/client-wrapper';
import { SiLAClient } from '../src/client';
import SiLAServiceClientWrapper from '../src/service-client-wrapper';
import SimulationControllerClientWrapper from '../src/simulation-client-wrapper';

const waitForReadyMock = jest.fn()
  /* start - test 1 */
  .mockImplementationOnce((deadline: grpc.Deadline, callback: (error?: Error | undefined) => void) => {
    callback();
  })
  .mockImplementationOnce((deadline: grpc.Deadline, callback: (error?: Error | undefined) => void) => {
    callback();
  })
  /* start - test 2 */
  .mockImplementationOnce((deadline: grpc.Deadline, callback: (error?: Error | undefined) => void) => {
    callback(new Error('I AM ANGRY!'));
  })
  .mockImplementationOnce((deadline: grpc.Deadline, callback: (error?: Error | undefined) => void) => {
    callback();
  })
  /* start - test 3 */
  .mockImplementationOnce((deadline: grpc.Deadline, callback: (error?: Error | undefined) => void) => {
    callback();
  })
  .mockImplementationOnce((deadline: grpc.Deadline, callback: (error?: Error | undefined) => void) => {
    callback();
  })
  .mockImplementationOnce((deadline: grpc.Deadline, callback: (error?: Error | undefined) => void) => {
    callback();
  });
const setServerNameMockArgs = jest.fn();
const getFeatureDefinitionMockArgs = jest.fn();
const getServerNameMock = jest.fn()
  .mockImplementationOnce((...args) => {
    args[1](null, { ServerName: { value: 'testServerName' } });
  })
  .mockImplementationOnce((...args) => {
    args[1](null);
  })
  .mockImplementationOnce((...args) => {
    args[1](null, { ServerName: null });
  })
  .mockImplementationOnce((...args) => {
    args[1](new Error('I AM TRULY ANGRY!'));
  })
  .mockImplementationOnce((...args) => {
    args[1](null, { ServerName: { value: '' }});
  })
  ;

jest.mock('../src/client-wrapper', () => {
  return jest.fn().mockImplementation((name: string) => ({
    waitForReady: waitForReadyMock,
    name,
  }));
});

jest.mock('../src/service-client-wrapper', () => {
  return jest.fn().mockImplementation(() => ({
    GetFeatureDefinition: jest.fn().mockImplementation((...args) => {
      getFeatureDefinitionMockArgs(args[0]);
      args[1](null, { FeatureDefinition: { value: '<?xml><FeatureDefinition/>' }})
    }),
    Get_ImplementedFeatures: jest.fn().mockImplementation((...args) => {
      args[1](null, { ImplementedFeatures: [{ value: 'testFeature1' }, { value: 'testFeature2' }]});
    }),
    Get_ServerDescription: jest.fn().mockImplementation((...args) => {
      args[1](null, { ServerDescription: { value: 'testDescription' }})
    }),
    Get_ServerName: getServerNameMock,
    Get_ServerType: jest.fn().mockImplementation((...args) => {
      args[1](null, { ServerType: { value: 'testType' }})
    }),
    Get_ServerUUID: jest.fn().mockImplementation((...args) => {
      args[1](null, { ServerUUID: { value: 'testUUID' }})
    }),
    Get_ServerVendorURL: jest.fn().mockImplementation((...args) => {
      args[1](null, { ServerVendorURL: { value: 'testURL' }})
    }),
    Get_ServerVersion: jest.fn().mockImplementation((...args) => {
      args[1](null, { ServerVersion: { value: 'testVersion' }})
    }),
    SetServerName: jest.fn().mockImplementation((...args) => {
      setServerNameMockArgs(args[0]);
      args[1](null, {});
    }),
  }));
});

jest.mock('../src/simulation-client-wrapper', () => {
  return jest.fn().mockImplementation(() => ({
    Get_SimulationMode: jest.fn().mockImplementation((...args) => {
      args[1](null, { SimulationMode: { value: true } });
    }),
    StartRealMode: jest.fn().mockImplementation((...args) => {
      args[1](null, {});
    }),
    StartSimulationMode: jest.fn().mockImplementation((...args) => {
      args[1](null, {});
    }),
  }));
});

const clientWrapper = ClientWrapper as jest.Mock;
const serviceClientWrapper = SiLAServiceClientWrapper as jest.Mock;
const simulationClientWrapper = SimulationControllerClientWrapper as jest.Mock;

describe('Creating a SiLAClient', () => {
  it('returns an instance', () => {
    const expectedName = 'testName';
    const expectedServerName = 'testServer';
    const expectedHost = '1.2.3.4';
    const expectedPort = 7890;
    const actual = new SiLAClient({
      name: expectedName,
      serverName: expectedServerName,
      serverHost: expectedHost,
      serverPort: expectedPort,
      credentials: grpc.ChannelCredentials.createInsecure(),
    });

    expect(actual.name).toEqual(expectedName);
    expect(actual.serverName).toEqual(expectedServerName);
    expect(actual.endpoint).toEqual(`${expectedHost}:${expectedPort}`);
  });

  it('returns an instance with defaults', () => {
    const actual = new SiLAClient();

    expect(actual.name).toEqual('Unknown');
    expect(actual.serverName).toEqual('Unknown');
    expect(actual.endpoint).toEqual('0.0.0.0:50051');
  });
});

describe('Calling registerServiceClient', () => {
  it('returns a gRPC client instance', () => {
    const client = new SiLAClient({
      serverHost: 'mybigfathost',
      serverPort: 1234,
    });
    const actual = client.registerServiceClient(
      'testClient',
      SiLAServiceRoot.sila2.org.silastandard.core.silaservice.v1.SiLAService
    );

    expect(actual.getChannel().getTarget()).toContain('mybigfathost:1234');
  });
});

describe('Calling start', () => {
  beforeEach(() => {
    clientWrapper.mockClear();
    waitForReadyMock.mockClear();
  });

  it('starts two clients by default', async () => {
    const client = new SiLAClient();
    const result = await client.start();

    expect(result).toEqual(2);
    expect(waitForReadyMock).toHaveBeenCalledTimes(2);
    expect(clientWrapper.mock.calls[0][0]).toEqual('SiLAService');
    expect(clientWrapper.mock.calls[1][0]).toEqual('SimulationController');
  });

  it('throws an error if client fails to start', async () => {
    const client = new SiLAClient();

    await expect(client.start()).rejects.toThrow('Unable to connect to SiLAService server: I AM ANGRY!');
    expect(waitForReadyMock).toHaveBeenCalledTimes(2);
    expect(clientWrapper.mock.calls[0][0]).toEqual('SiLAService');
    expect(clientWrapper.mock.calls[1][0]).toEqual('SimulationController');
  });

  it('starts additionally registered clients', async () => {
    const client = new SiLAClient();

    client.registerServiceClient(
      'testClient',
      SiLAServiceRoot.sila2.org.silastandard.core.silaservice.v1.SiLAService
    );
    const result = await client.start();

    expect(result).toEqual(3);
    expect(waitForReadyMock).toHaveBeenCalledTimes(3);
    expect(clientWrapper.mock.calls[0][0]).toEqual('SiLAService');
    expect(clientWrapper.mock.calls[1][0]).toEqual('SimulationController');
    expect(clientWrapper.mock.calls[2][0]).toEqual('testClient');
  });
});

describe('Calling getServerDescription', () => {
  beforeEach(() => {
    serviceClientWrapper.mockClear();
  });

  it('should return the server description', async () => {
    const client = new SiLAClient();
    const actualDescription = await client.getServerDescription();

    expect(actualDescription).toEqual('testDescription');
  });
});

describe('Calling getServerName', () => {
  beforeEach(() => {
    serviceClientWrapper.mockClear();
    getServerNameMock.mockClear();
  });

  it('should return the server name', async () => {
    const client = new SiLAClient();
    const actualName = await client.getServerName();

    expect(actualName).toEqual('testServerName');
  });

  it('should return an error when no response', async () => {
    const client = new SiLAClient();

    await expect(client.getServerName()).rejects.toThrow('No response received');
  });

  it('should return an error when no value', async () => {
    const client = new SiLAClient();

    await expect(client.getServerName()).rejects.toThrow('No value received');
  });

  it('should return an error when error response', async () => {
    const client = new SiLAClient();

    await expect(client.getServerName()).rejects.toThrow('I AM TRULY ANGRY!');
  });

  it('should return an empty server name', async () => {
    const client = new SiLAClient();
    const actualName = await client.getServerName();

    expect(actualName).toEqual('');
  });
});

describe('Calling getServerType', () => {
  beforeEach(() => {
    serviceClientWrapper.mockClear();
  });

  it('should return the server type', async () => {
    const client = new SiLAClient();
    const actualType = await client.getServerType();

    expect(actualType).toEqual('testType');
  });
});

describe('Calling getServerUUID', () => {
  beforeEach(() => {
    serviceClientWrapper.mockClear();
  });

  it('should return the server UUID', async () => {
    const client = new SiLAClient();
    const actualUUID = await client.getServerUUID();

    expect(actualUUID).toEqual('testUUID');
  });
});

describe('Calling getServerVendorURL', () => {
  beforeEach(() => {
    serviceClientWrapper.mockClear();
  });

  it('should return the server vendor URL', async () => {
    const client = new SiLAClient();
    const actualURL = await client.getServerVendorURL();

    expect(actualURL).toEqual('testURL');
  });
});

describe('Calling getServerVersion', () => {
  beforeEach(() => {
    serviceClientWrapper.mockClear();
  });

  it('should return the server version', async () => {
    const client = new SiLAClient();
    const actualURL = await client.getServerVersion();

    expect(actualURL).toEqual('testVersion');
  });
});

describe('Calling setServerName', () => {
  beforeEach(() => {
    serviceClientWrapper.mockClear();
    setServerNameMockArgs.mockClear();
  });

  it('should set the server name', async () => {
    const client = new SiLAClient();
    const actualResult = await client.setServerName('testNewServerName');

    expect(actualResult).toBeTruthy();
    expect(setServerNameMockArgs).toHaveBeenCalledWith({ ServerName: { value: 'testNewServerName' } });
  });
});

describe('Calling getImplementedFeatures', () => {
  beforeEach(() => {
    serviceClientWrapper.mockClear();
  });

  it('should return the list of implemented feature names', async () => {
    const client = new SiLAClient();
    const actualFeatures = await client.getImplementedFeatures();

    expect(actualFeatures).toEqual(['testFeature1', 'testFeature2']);
  });
});

describe('Calling getFeatureDefinition', () => {
  beforeEach(() => {
    serviceClientWrapper.mockClear();
    getFeatureDefinitionMockArgs.mockClear();
  });

  it('should return the feature definition XML', async () => {
    const client = new SiLAClient();
    const actualFeatureXML = await client.getFeatureDefinition('testFeatureId');

    expect(actualFeatureXML).toEqual('<?xml><FeatureDefinition/>');
    expect(getFeatureDefinitionMockArgs).toHaveBeenCalledWith(
      { QualifiedFeatureIdentifier: { value: 'testFeatureId' }}
    );
  });
});

describe('Calling getSimulationMode', () => {
  beforeEach(() => {
    simulationClientWrapper.mockClear();
  });

  it('should return the simulation mode', async () => {
    const client = new SiLAClient();
    const actualMode = await client.getSimulationMode();

    expect(actualMode).toBeTruthy();
  });
});

describe('Calling startRealMode', () => {
  beforeEach(() => {
    simulationClientWrapper.mockClear();
  });

  it('should successfully return', async () => {
    const client = new SiLAClient();

    await expect(client.startRealMode()).resolves.toBeUndefined();
  });
});

describe('Calling startSimulationMode', () => {
  beforeEach(() => {
    simulationClientWrapper.mockClear();
  });

  it('should successfully return', async () => {
    const client = new SiLAClient();

    await expect(client.startSimulationMode()).resolves.toBeUndefined();
  });
});
