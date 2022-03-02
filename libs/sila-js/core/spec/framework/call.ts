import { EventEmitter } from 'events';

import * as grpc from '@grpc/grpc-js';

export default class UnaryCallStub<RequestType> extends EventEmitter {
  cancelled: boolean;
  metadata: grpc.Metadata;
  request: RequestType;

  constructor(request: RequestType) {
    super();
    this.request = request;
    this.cancelled = false;
    this.metadata = new grpc.Metadata();
  }

  getPeer(): string {
    return '';
  }

  sendMetadata(): grpc.Metadata {
    return new grpc.Metadata();
  }

  getDeadline(): Date {
    return new Date();
  }
}
