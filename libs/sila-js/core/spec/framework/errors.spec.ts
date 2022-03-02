/* eslint prettier/prettier: ["warn"] */
import * as grpc from '@grpc/grpc-js';
import * as protobuf from 'protobufjs';

import { SiLAValidationError } from '../../src/framework/errors';

describe('Create SiLAValidationError', () => {
  it('should return parameter and message', () => {
    const expectedParameter = 'testParameter';
    const expectedMessage = 'testMessage';
    const actualError = new SiLAValidationError(
      expectedParameter,
      expectedMessage
    );

    expect(actualError.parameter).toEqual(expectedParameter);
    expect(actualError.message).toEqual(expectedMessage);
  });
});

describe('SiLAValidationError.toServiceError', () => {
  const expectedParameter = 'testParameter';
  const expectedMessage = 'testMessage';
  const error = new SiLAValidationError(expectedParameter, expectedMessage);
  const actualResponse = error.toServiceError();

  it('should return fixed properties and custom message', () => {
    expect(actualResponse.name).toEqual('ValidationError');
    expect(actualResponse.message).toEqual(expectedMessage);
    expect(actualResponse.code).toEqual(grpc.status.ABORTED);
    expect(actualResponse.metadata).toEqual(new grpc.Metadata());
  });

  it('should return an encoded SiLAError', () => {
    const root = protobuf.loadSync(
      './src/framework/protobuf/SiLAFramework.proto'
    );
    const type = root.lookupType('SiLAError');
    const buffer = Buffer.from(actualResponse.details, 'base64');
    const actualSiLAError = type.decode(buffer);
    const expectedSilaError = {
      validationError: {
        parameter: expectedParameter,
        message: expectedMessage,
      },
    };

    expect(actualSiLAError).toEqual(expectedSilaError);
  });
});

describe('SiLAValidationError.fromServiceError', () => {
  const expectedParameter = 'testParameter';
  const expectedMessage = 'testMessage';
  const error = new SiLAValidationError(expectedParameter, expectedMessage);
  const serviceError = error.toServiceError();

  const actualError = SiLAValidationError.fromServiceError(serviceError);

  it('should return parameter and message', () => {
    expect(actualError?.parameter).toEqual(expectedParameter);
    expect(actualError?.message).toEqual(expectedMessage);
  });
});
