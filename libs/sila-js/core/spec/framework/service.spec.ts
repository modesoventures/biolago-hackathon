/* eslint prettier/prettier: ["warn"] */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
import * as fs from 'fs';

import { v4 as uuidv4 } from 'uuid';

import {
  GetFeatureDefinition_Parameters__Output,
  Get_ImplementedFeatures_Parameters,
  Get_ServerDescription_Parameters,
  Get_ServerName_Parameters,
  Get_ServerType_Parameters,
  Get_ServerUUID_Parameters,
  Get_ServerVendorURL_Parameters,
  Get_ServerVersion_Parameters,
  SetServerName_Parameters__Output,
  SiLAService,
} from '../../src/framework/service';
import { SiLAValidationError } from '../../src/framework/errors';
import UnaryCallStub from './call';

const callbackMock = jest.fn();

describe('Create a new SiLAService', () => {
  it('should return a service instance', () => {
    const expectedServerName = 'testServerName';
    const expectedServerUUID = uuidv4();
    const expectedServerDescription = 'testServerDescription';
    const expectedServerType = 'testServerType';
    const expectedServerVendorURL = 'testServerVendorURL';
    const expectedServerVersion = 'testServerVersion';
    const options = {
      serverName: expectedServerName,
      serverUUID: expectedServerUUID,
      serverDescription: expectedServerDescription,
      serverType: expectedServerType,
      serverVendorURL: expectedServerVendorURL,
      serverVersion: expectedServerVersion,
    };
    const actual = new SiLAService(options);

    expect(actual).toBeTruthy();
    expect(actual.serverName).toEqual(expectedServerName);
    expect(actual.serverUUID).toEqual(expectedServerUUID);
    expect(actual.serverDescription).toEqual(expectedServerDescription);
    expect(actual.serverType).toEqual(expectedServerType);
    expect(actual.serverVendorURL).toEqual(expectedServerVendorURL);
    expect(actual.serverVersion).toEqual(expectedServerVersion);
  });
});

describe('Call Get_ServerDescription', () => {
  beforeEach(() => {
    callbackMock.mockClear();
  });

  it('should respond with the server description', () => {
    const expectedServerDescription = 'TestServerDescription';
    const expectedResponse = {
      ServerDescription: { value: expectedServerDescription },
    };
    const call = new UnaryCallStub<Get_ServerDescription_Parameters>({});
    const options = {
      serverName: 'testServerName',
      serverUUID: 'testUUID',
      serverDescription: expectedServerDescription,
    };
    const actual = new SiLAService(options);

    actual.handler.Get_ServerDescription(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, expectedResponse);
  });
});

describe('Call Get_ServerName', () => {
  beforeEach(() => {
    callbackMock.mockClear();
  });

  it('should respond with the server name', () => {
    const expectedServerName = 'TestServerName';
    const expectedResponse = {
      ServerName: { value: expectedServerName },
    };
    const call = new UnaryCallStub<Get_ServerName_Parameters>({});
    const options = {
      serverName: expectedServerName,
      serverUUID: 'testUUID',
    };
    const actual = new SiLAService(options);

    actual.handler.Get_ServerName(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, expectedResponse);
  });
});

describe('Call Get_ServerType', () => {
  beforeEach(() => {
    callbackMock.mockClear();
  });

  it('should respond with the server type', () => {
    const expectedServerType = 'TestServerType';
    const expectedResponse = {
      ServerType: { value: expectedServerType },
    };
    const call = new UnaryCallStub<Get_ServerType_Parameters>({});
    const options = {
      serverName: 'testServerName',
      serverUUID: 'testUUID',
      serverType: expectedServerType,
    };
    const actual = new SiLAService(options);

    actual.handler.Get_ServerType(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, expectedResponse);
  });
});

describe('Call Get_ServerUUID', () => {
  beforeEach(() => {
    callbackMock.mockClear();
  });

  it('should respond with the server UUID', () => {
    const expectedServerUUID = uuidv4();
    const expectedResponse = {
      ServerUUID: { value: expectedServerUUID },
    };
    const call = new UnaryCallStub<Get_ServerUUID_Parameters>({});
    const options = {
      serverName: 'testServerName',
      serverUUID: expectedServerUUID,
    };
    const actual = new SiLAService(options);

    actual.handler.Get_ServerUUID(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, expectedResponse);
  });
});

describe('Call Get_ServerVendorURL', () => {
  beforeEach(() => {
    callbackMock.mockClear();
  });

  it('should respond with the server vendor URL', () => {
    const expectedServerVendorURL = 'testServerVendorURL';
    const expectedResponse = {
      ServerVendorURL: { value: expectedServerVendorURL },
    };
    const call = new UnaryCallStub<Get_ServerVendorURL_Parameters>({});
    const options = {
      serverName: 'testServerName',
      serverUUID: 'testUUID',
      serverVendorURL: expectedServerVendorURL,
    };
    const actual = new SiLAService(options);

    actual.handler.Get_ServerVendorURL(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, expectedResponse);
  });
});

describe('Call Get_ServerVersion', () => {
  beforeEach(() => {
    callbackMock.mockClear();
  });

  it('should respond with the server version', () => {
    const expectedServerVersion = 'testServerVersion';
    const expectedResponse = {
      ServerVersion: { value: expectedServerVersion },
    };
    const call = new UnaryCallStub<Get_ServerVersion_Parameters>({});
    const options = {
      serverName: 'testServerName',
      serverUUID: 'testUUID',
      serverVersion: expectedServerVersion,
    };
    const actual = new SiLAService(options);

    actual.handler.Get_ServerVersion(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, expectedResponse);
  });
});

describe('Call SetServerName', () => {
  const serverName = 'TestServerNameAgain';
  const options = {
    serverName,
    serverUUID: 'testUUID',
  };
  const actual = new SiLAService(options);

  beforeEach(() => {
    callbackMock.mockClear();
  });

  it('should set the new server name', () => {
    const expectedServerName = 'NewTestServerName';
    const setCall = new UnaryCallStub<SetServerName_Parameters__Output>({
      ServerName: { value: expectedServerName },
    });

    actual.handler.SetServerName(setCall, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, {});
    expect(actual.serverName).toEqual(expectedServerName);
  });

  it('should send error when no new server name given', () => {
    const setCall = new UnaryCallStub<SetServerName_Parameters__Output>({
      ServerName: null,
    });
    const expectedError = new SiLAValidationError(
      'SetServerName_Parameters.ServerName',
      'ServerName is undefined'
    ).toServiceError();

    actual.handler.SetServerName(setCall, callbackMock);
    const actualError = callbackMock.mock.calls[0][0];

    expect(actualError).toEqual(expectedError);
  });
});

describe('Call GetFeatureDefinition', () => {
  const service = new SiLAService({
    serverName: 'server',
    serverUUID: 'uuid',
  });

  beforeEach(() => {
    callbackMock.mockClear();
  });

  it('should return SiLAService feature definition XML as string', () => {
    const call = new UnaryCallStub<GetFeatureDefinition_Parameters__Output>({
      QualifiedFeatureIdentifier: { value: 'SiLAService' },
    });
    const data = fs.readFileSync(
      'src/framework/feature_definitions/org/silastandard/core/SiLAService.sila.xml',
      { encoding: 'utf8' }
    );
    const expectedResponse = { FeatureDefinition: { value: data } };

    service.handler.GetFeatureDefinition(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, expectedResponse);
  });

  it('should return test feature definition XML as string if it is registered', () => {
    const path = 'spec/framework/testFeature.sila.xml';

    service.registerFeature('testFeature', path);

    const call = new UnaryCallStub<GetFeatureDefinition_Parameters__Output>({
      QualifiedFeatureIdentifier: { value: 'testFeature' },
    });
    const data = fs.readFileSync(path, { encoding: 'utf8' });
    const expectedResponse = { FeatureDefinition: { value: data } };

    service.handler.GetFeatureDefinition(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, expectedResponse);
  });

  it('should send error when no feature id given', () => {
    const call = new UnaryCallStub<GetFeatureDefinition_Parameters__Output>({
      QualifiedFeatureIdentifier: null,
    });
    const expectedError = new SiLAValidationError(
      'GetFeatureDefinition_Parameters.QualifiedFeatureIdentifier',
      `Feature identifier is undefined.`
    ).toServiceError();

    service.handler.GetFeatureDefinition(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(expectedError);
  });

  it('should send error when the feature id is not known', () => {
    const randomFeatureId = uuidv4();
    const call = new UnaryCallStub<GetFeatureDefinition_Parameters__Output>({
      QualifiedFeatureIdentifier: { value: randomFeatureId },
    });
    const expectedError = new SiLAValidationError(
      'GetFeatureDefinition_Parameters.QualifiedFeatureIdentifier',
      `Feature ${randomFeatureId} is unknown.`
    ).toServiceError();

    service.handler.GetFeatureDefinition(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(expectedError);
  });
});

describe('Call Get_ImplementedFeatures', () => {
  const service = new SiLAService({
    serverName: 'server',
    serverUUID: 'uuid',
  });

  beforeEach(() => {
    callbackMock.mockClear();
  });

  it('should return feature id of SiLAService', () => {
    const call = new UnaryCallStub<Get_ImplementedFeatures_Parameters>({});
    const expectedResponse = {
      ImplementedFeatures: [{ value: 'SiLAService' }],
    };

    service.handler.Get_ImplementedFeatures(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, expectedResponse);
  });

  it('should return feature ids of all registered features', () => {
    const path = 'spec/framework/testFeature.sila.xml';

    service.registerFeature('testFeature', path);
    service.registerFeature('AnotherFeature', path);

    const call = new UnaryCallStub<Get_ImplementedFeatures_Parameters>({});
    const expectedResponse = {
      ImplementedFeatures: [
        { value: 'SiLAService' },
        { value: 'testFeature' },
        { value: 'AnotherFeature' },
      ],
    };

    service.handler.Get_ImplementedFeatures(call, callbackMock);
    expect(callbackMock).toHaveBeenCalledWith(null, expectedResponse);
  });
});
