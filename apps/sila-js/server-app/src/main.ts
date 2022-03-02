import { initLogging } from '@sila-standard/core';

import { SiLAServer } from '@sila-standard/server';

initLogging('debug');

const server = new SiLAServer({
  host: 'localhost',
  port: 50051,
  // simulationMode: true,
  name: 'device-server',
});

server.start();
