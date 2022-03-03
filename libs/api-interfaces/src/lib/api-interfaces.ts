import { Endpoint } from '@sila-standard/dynamic-client';

export interface Message {
  message: string;
}

export interface Service {
  serviceId: string;
  serviceName: string;
  uuid: string;
  endpoint: Endpoint;

  // TODO: how to handle server-initiated connections? Does sila-js support them?
}
