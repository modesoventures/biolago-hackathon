import { initLogging } from '@sila-standard/core';

import { SiLAServer } from '@sila-standard/server';

initLogging('debug');

const server = new SiLAServer();

server.start();
