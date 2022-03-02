/**
 * THIS IS JUST A USEFUL SCRIPT FOR RUNNING A SIMPLE CLIENT.  IT WILL EVENTUALLY BE REMOVED.
 */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { SiLAClient } from './client';

const name = 'My Test Client';
const client = new SiLAClient({ name });

client.start()
  .then((clientsStartedCount) => {
    console.log(`Clients started: ${clientsStartedCount}`);

    client.getImplementedFeatures()
      .then((result: Array<string>) => {
        console.log('Implemented features are:', result);
      })
      .catch((error) => {
        console.log('There was a problem', error);
      });

    client.getServerName()
      .then((result: string) => {
        console.log('Server name is:', result);
      })
      .catch((error) => {
        console.log('There was a problem', error);
      });

    client.getServerDescription()
      .then((result: string) => {
        console.log('Server description is:', result);
      })
      .catch((error) => {
        console.log('There was a problem', error);
      });

    client.getServerType()
      .then((result: string) => {
        console.log('Server type is:', result);
      })
      .catch((error) => {
        console.log('There was a problem', error);
      });

    client.getSimulationMode()
      .then((result: boolean) => {
        console.log('Server is in simulation mode?', result);
      })
      .catch((error) => {
        console.log('There was a problem', error);
      });
  })
  .catch((error) => {
    console.log('Problem starting clients', error);
  });
