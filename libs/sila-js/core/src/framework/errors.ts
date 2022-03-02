/* eslint-disable @typescript-eslint/no-explicit-any */
import * as grpc from '@grpc/grpc-js';
import * as protobuf from 'protobufjs';

const root = protobuf.loadSync(`${__dirname}/assets/protobuf/SiLAFramework.proto`);
const SiLAError = root.lookupType('SiLAError');

function encode(error: any): string {
  const message = new protobuf.Message(error);
  const buffer = SiLAError.encode(message).finish();

  return Buffer.from(buffer).toString('base64');
}

function decode(error: string): { [index: string]: any } {
  const buffer = Buffer.from(error, 'base64');

  return SiLAError.decode(buffer);
}

export class ServiceError implements grpc.StatusObject {
  readonly name: string;
  readonly message: string;
  readonly code: grpc.status;
  readonly details: string;
  readonly metadata: grpc.Metadata;

  constructor(name: string, message: string, details: string) {
    this.name = name;
    this.message = message;
    this.details = details;
    this.code = grpc.status.ABORTED;
    this.metadata = new grpc.Metadata();
  }
}

export class SiLAValidationError {
  readonly parameter: string;
  readonly message: string;

  constructor(parameter: string, message: string) {
    this.message = message;
    this.parameter = parameter;
  }

  toServiceError(): grpc.ServiceError {
    const silaError = {
      validationError: {
        parameter: this.parameter,
        message: this.message,
      },
    };
    const details = encode(silaError);

    return new ServiceError('ValidationError', this.message, details);
  }

  static fromServiceError(
    error: grpc.ServiceError
  ): SiLAValidationError | null {
    if (error.name === 'ValidationError') {
      const { validationError } = decode(error.details);

      return new SiLAValidationError(
        validationError.parameter,
        validationError.message
      );
    }
    return null;
  }
}
