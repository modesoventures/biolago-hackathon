import * as grpc from '@grpc/grpc-js';

export default class ClientWrapper {
  readonly name: string;
  private client: grpc.Client;

  constructor(name: string, client: grpc.Client) {
    this.name = name;
    this.client = client;
  }

  waitForReady(
    deadline: grpc.Deadline,
    callback: (error?: Error | undefined) => void
  ): void {
    this.client.waitForReady(deadline, callback);
  }
}
