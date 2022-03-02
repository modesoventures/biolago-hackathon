/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import * as grpc from '@grpc/grpc-js';
import { v4 as uuidv4 } from 'uuid';

import { SiLAServer } from '../src/server';

const expectedCreds = {};
const addServiceMockArgs = jest.fn();
const bindAsyncMockArgs = jest.fn();
const startMockArgs = jest.fn();
const tryShutdownMockArgs = jest.fn();
const switchToRealModeSuccess = jest.fn(() => true);
const switchToSimulationModeSuccess = jest.fn(() => true);
const switchToRealModeFailure = jest.fn(() => false);
const switchToSimulationModeFailure = jest.fn(() => false);
const bindAsyncMock = jest
  .fn()
  .mockImplementationOnce(
    (
      endpoint: string,
      creds: grpc.ServerCredentials,
      callback: (error: Error | null, port: number) => void
    ) => {
      bindAsyncMockArgs(endpoint, creds);
      callback(null, 1);
    }
  )
  .mockImplementationOnce(
    (
      endpoint: string,
      creds: grpc.ServerCredentials,
      callback: (error: Error | null, port: number) => void
    ) => {
      bindAsyncMockArgs(endpoint, creds);
      callback(new Error('I am Angry!'), 0);
    }
  );
const tryShutdownMock = jest
  .fn()
  .mockImplementationOnce((callback) => {
    tryShutdownMockArgs();
    callback(null);
  })
  .mockImplementationOnce((callback) => {
    tryShutdownMockArgs();
    callback(new Error('I too am angry!!'));
  });
const forceShutdownMock = jest.fn();

jest.mock('@grpc/grpc-js', () => ({
  ...jest.requireActual('@grpc/grpc-js'),
  Server: jest.fn().mockImplementation(() => ({
    addService: (service: grpc.ServiceDefinition, implementation: grpc.UntypedServiceImplementation) => {
      addServiceMockArgs(service, implementation);
    },
    bindAsync: bindAsyncMock,
    start: startMockArgs,
    tryShutdown: tryShutdownMock,
    forceShutdown: forceShutdownMock,
  })),
  ServerCredentials: {
    createInsecure: () => expectedCreds,
  },
  makeGenericClientConstructor: jest.fn(),
}));

jest.mock('uuid');

describe('Create a new SiLAServer', () => {
  beforeEach(() => {
    addServiceMockArgs.mockClear();
  });

  it('should return its name', () => {
    const name = 'TestName';
    const actual = new SiLAServer({ name });

    expect(actual).toBeTruthy();
    expect(actual.name).toEqual(name);
  });

  it('should return Unkown name when none given', () => {
    const actual = new SiLAServer({});

    expect(actual.name).toEqual('Unknown');
  });

  it('should return Unkown name when no options given', () => {
    const actual = new SiLAServer();

    expect(actual.name).toEqual('Unknown');
  });

  it('should return its endpoint', () => {
    const host = 'localhost';
    const port = 8080;
    const actual = new SiLAServer({ host, port });

    expect(actual.endpoint).toEqual('localhost:8080');
  });

  it('should return endpoint with default host when no host', () => {
    const port = 8080;
    const actual = new SiLAServer({ port });

    expect(actual.endpoint).toEqual('0.0.0.0:8080');
  });

  it('should return endpoint with default port when no port', () => {
    const host = 'localhost';
    const actual = new SiLAServer({ host });

    expect(actual.endpoint).toEqual('localhost:50051');
  });

  it('should return default endpoint with no options', () => {
    const actual = new SiLAServer({});

    expect(actual.endpoint).toEqual('0.0.0.0:50051');
  });

  it('should return its uuid', () => {
    const expectedUuid = 'some uuid';
    const actual = new SiLAServer({ uuid: expectedUuid });

    expect(actual.uuid).toEqual(expectedUuid);
  });

  it('should return random uuid when no uuid specified', () => {
    const expectedUuid = 'some random default uuid';

    (uuidv4 as jest.Mock).mockReturnValue(expectedUuid);
    const actual = new SiLAServer();

    expect(actual.uuid).toEqual(expectedUuid);
  });

  it('should register SiLAServiceHandler with gRPC server', () => {
    const server = new SiLAServer({});
    const actualServiceDefinition: grpc.ServiceDefinition = addServiceMockArgs.mock.calls[0][0];
    const actualServiceHandler: grpc.UntypedServiceImplementation = addServiceMockArgs.mock.calls[0][1];

    expect(server).toBeTruthy();
    expect(actualServiceDefinition.Get_ServerName.path).toEqual(
      '/sila2.org.silastandard.core.silaservice.v1.SiLAService/Get_ServerName'
    );
    expect(actualServiceHandler.Get_ServerName).toBeDefined();
  });

  it('should register SimulationController with SiLA service', () => {
    const server = new SiLAServer({});
    const featureXml = server.service.implementedFeatures.get('SimulationController');

    expect(featureXml).toContain('<Identifier>SimulationController</Identifier>');
  });
});

describe('Adding a feature', () => {
  it('should register the feature with the SiLA service', () => {
    const featureId = 'FakeFeature';
    const server = new SiLAServer({});

    server.addFeature(featureId, __dirname);
    const featureXml = server.service.implementedFeatures.get(featureId);

    expect(featureXml).toContain(`<Identifier>${featureId}</Identifier>`);
    expect(server.simulationModeSwitchers.length).toEqual(0);
  });

  it('should register a simulation mode switcher for the feature', () => {
    const server = new SiLAServer({});
    const expectedSwitcher = {
      switchToRealMode: switchToRealModeSuccess,
      switchToSimulationMode: switchToSimulationModeSuccess,
    };

    server.addFeature('FakeFeature', __dirname, expectedSwitcher);
    expect(server.simulationModeSwitchers.length).toEqual(1);

    const actualSwitcher = server.simulationModeSwitchers[0];

    expect(actualSwitcher).toBe(expectedSwitcher);
  });
});

describe('Switching to real mode', () => {
  beforeEach(() => {
    switchToRealModeSuccess.mockClear();
    switchToSimulationModeSuccess.mockClear();
    switchToRealModeFailure.mockClear();
    switchToSimulationModeFailure.mockClear();
  });

  it('should call all switchers and return success', () => {
    const server = new SiLAServer({});
    const switcher1 = {
      switchToRealMode: switchToRealModeSuccess,
      switchToSimulationMode: switchToSimulationModeSuccess,
    };
    const switcher2 = {
      switchToRealMode: switchToRealModeSuccess,
      switchToSimulationMode: switchToSimulationModeSuccess,
    };

    server.addFeature('FakeFeature', __dirname, switcher1);
    server.addFeature('FakeFeature', __dirname, switcher2);

    const actualSwitchResult = server.switchToRealMode();

    expect(actualSwitchResult).toBeTruthy();
    expect(switchToRealModeSuccess).toHaveBeenCalledTimes(2);
    expect(switchToSimulationModeSuccess).toHaveBeenCalledTimes(0);
  });

  it('should call all switchers and return failure', () => {
    const server = new SiLAServer({});
    const switcher1 = {
      switchToRealMode: switchToRealModeSuccess,
      switchToSimulationMode: switchToSimulationModeSuccess,
    };
    const switcher2 = {
      switchToRealMode: switchToRealModeFailure,
      switchToSimulationMode: switchToSimulationModeSuccess,
    };

    server.addFeature('FakeFeature', __dirname, switcher1);
    server.addFeature('FakeFeature', __dirname, switcher2);

    const actualSwitchResult = server.switchToRealMode();

    expect(actualSwitchResult).toBeFalsy();
    expect(switchToRealModeSuccess).toHaveBeenCalledTimes(1);
    expect(switchToRealModeFailure).toHaveBeenCalledTimes(1);
    expect(switchToSimulationModeSuccess).toHaveBeenCalledTimes(0);
  });
});

describe('Switching to simulation mode', () => {
  beforeEach(() => {
    switchToRealModeSuccess.mockClear();
    switchToSimulationModeSuccess.mockClear();
    switchToRealModeFailure.mockClear();
    switchToSimulationModeFailure.mockClear();
  });

  it('should call all switchers and return success', () => {
    const server = new SiLAServer({});
    const switcher1 = {
      switchToRealMode: switchToRealModeSuccess,
      switchToSimulationMode: switchToSimulationModeSuccess,
    };
    const switcher2 = {
      switchToRealMode: switchToRealModeSuccess,
      switchToSimulationMode: switchToSimulationModeSuccess,
    };

    server.addFeature('FakeFeature', __dirname, switcher1);
    server.addFeature('FakeFeature', __dirname, switcher2);

    const actualSwitchResult = server.switchToSimulationMode();

    expect(actualSwitchResult).toBeTruthy();
    expect(switchToRealModeSuccess).toHaveBeenCalledTimes(0);
    expect(switchToSimulationModeSuccess).toHaveBeenCalledTimes(2);
  });

  it('should call all switchers and return failure', () => {
    const server = new SiLAServer({});
    const switcher1 = {
      switchToRealMode: switchToRealModeSuccess,
      switchToSimulationMode: switchToSimulationModeSuccess,
    };
    const switcher2 = {
      switchToRealMode: switchToRealModeSuccess,
      switchToSimulationMode: switchToSimulationModeFailure,
    };

    server.addFeature('FakeFeature', __dirname, switcher1);
    server.addFeature('FakeFeature', __dirname, switcher2);

    const actualSwitchResult = server.switchToSimulationMode();

    expect(actualSwitchResult).toBeFalsy();
    expect(switchToRealModeSuccess).toHaveBeenCalledTimes(0);
    expect(switchToSimulationModeSuccess).toHaveBeenCalledTimes(1);
    expect(switchToSimulationModeFailure).toHaveBeenCalledTimes(1);
  });
});

describe('Starting server', () => {
  beforeEach(() => {
    bindAsyncMock.mockClear();
    startMockArgs.mockClear();
  });

  it('should start the gRPC server', async () => {
    const expectedEndpoint = '0.0.0.0:50051';
    const actual = new SiLAServer({});

    await actual.start().then((result) => {
      expect(result.name).toEqual('Unknown');
      expect(result.endpoint).toEqual(expectedEndpoint);
    });
    expect(bindAsyncMockArgs).toHaveBeenCalledWith(
      expectedEndpoint,
      expectedCreds
    );
    expect(startMockArgs).toHaveBeenCalled();
  });

  it('should not start the gRPC server on error', async () => {
    const expectedEndpoint = '0.0.0.0:50051';
    const actual = new SiLAServer({});

    await actual.start().catch(() => {});
    expect(bindAsyncMockArgs).toHaveBeenCalledWith(
      expectedEndpoint,
      expectedCreds
    );
    expect(startMockArgs).not.toHaveBeenCalled();
  });
});

describe('Shutting the server down', () => {
  beforeEach(() => {
    tryShutdownMock.mockClear();
    tryShutdownMockArgs.mockClear();
    forceShutdownMock.mockClear();
  });

  it('should stop the gRPC server', () => {
    const actual = new SiLAServer({});

    actual.shutdown();
    expect(tryShutdownMockArgs).toHaveBeenCalled();
    expect(forceShutdownMock).not.toHaveBeenCalled();
  });

  it('should forcibly stop the gRPC server', () => {
    const actual = new SiLAServer({});

    actual.shutdown();
    expect(tryShutdownMockArgs).toHaveBeenCalled();
    expect(forceShutdownMock).toHaveBeenCalled();
  });
});
