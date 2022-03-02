/**
 * THIS IS JUST A USEFUL SCRIPT FOR RUNNING A SIMPLE SERVER.  IT WILL EVENTUALLY BE REMOVED.
 */
 import { initLogging } from '@sila-standard/core';

 import { SiLAServer } from './server';

 initLogging('debug');

 const server = new SiLAServer();

 server.start();
