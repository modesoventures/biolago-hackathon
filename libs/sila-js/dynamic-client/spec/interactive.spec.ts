/* eslint-disable camelcase */
import {
  ChildProcessWithoutNullStreams,
  spawn,
  spawnSync,
} from 'child_process';
import fse from 'fs-extra';
import path from 'path';

import logger from 'winston';

import DynamicClient, { Endpoint, silaBasePath } from '../src';

const transport = new logger.transports.Console();

logger.add(transport);

logger.level = 'error';

const endpoint: Endpoint = {
  hostname: '127.0.0.1',
  port: 55001,
};

const featureRootPath = path.join(silaBasePath, 'feature_definitions');

const featureList = [
  'org.silastandard/core/AuthenticationService/v1',
  'org.silastandard/core/AuthorizationConfigurationService/v1',
  'org.silastandard/core/AuthorizationProviderService/v1',
  'org.silastandard/core/AuthorizationService/v1',
  'org.silastandard/core/ConnectionConfigurationService/v1',
  // 'org.silastandard/core/ErrorRecoveryService/v1', // TODO: not supported by sila_python
  'org.silastandard/core/LockController/v1',
  'org.silastandard/core/SiLAService/v1',
  'org.silastandard/core/SimulationController/v1',

  'org.silastandard/core.commands/CancelController/v1',
  // 'org.silastandard/core.commands/ParamterConstraintsProvider/v1', // TODO: not supported by sila_js
  'org.silastandard/core.commands/PauseController/v1',

  'org.silastandard/examples/TemperatureController/v1',

  'org.silastandard/instruments/CoverController/v1',

  // 'org.silastandard/test/ComplexDataTypeTest/v1', // TODO: not supported by sila_python
  // 'org.silastandard/test/DataTypeTest/v1', // TODO: not supported by sila_js
  'org.silastandard/test/ObservableCommandTest/v1',
  'org.silastandard/test/ObservablePropertyTest/v1',
  // 'org.silastandard/test/ParameterConstraintsTest/v1', // TODO: not supported by sila_js

  'ch.unitelabs/core/InitializationController/v1',
  'ch.unitelabs/core/ProgramController/v1',
  'ch.unitelabs/core/SingleConnectionController/v1',
  'ch.unitelabs/core/StateService/v1',

  'ch.unitelabs/robot/BatteryController/v1',
  // 'ch.unitelabs/robot/DeviceCalibrationService/v1', // TODO: not supported by sila_js
  'ch.unitelabs/robot/GripController/v1',
  // 'ch.unitelabs/robot/PlateCalibrationService/v1', // TODO: not supported by sila_js
  // 'ch.unitelabs/robot/RobotController/v1', // TODO: not supported by sila_js
  'ch.unitelabs/robot/RobotTeachingService/v1',

  // 'com.madisoft/reader/AbsorbanceReaderService/v1', // TODO: python server does not start
  // 'com.madisoft/reader/FluorescenceReaderService/v1', // TODO: python server does not start
  // 'com.madisoft/reader/GloMaxStatusProvider/v1', // TODO: python server does not start
  // 'com.madisoft/reader/LuminescenceReaderService/v1', // TODO: python server does not start

  'de.diginbio/examples/WarpdriveService/v1',

  'de.tuberlin.bioprocess/briefing/DeviceInformationProvider/v1',
  'de.tuberlin.bioprocess/communication/MessagingController/v1',
  'de.tuberlin.bioprocess/storing/StorageService/v1',
];

const featureListReduced = featureList.map(
  (fullyQualifiedFeatureIdentifier: string) => {
    return featureName(fullyQualifiedFeatureIdentifier);
  }
);

const featureListReducedWithoutDefaults = featureListReduced.filter(
  (item) => item !== 'SiLAService' && item !== 'SimulationController'
);

function featurePath(fullyQualifiedFeatureIdentifier: string): string {
  return path.join(
    featureRootPath,
    path.join(...fullyQualifiedFeatureIdentifier.split('/')[0].split('.')),
    path.join(...fullyQualifiedFeatureIdentifier.split('/')[1].split('.')),
    `${fullyQualifiedFeatureIdentifier.split('/')[2]}.sila.xml`
  );
}

function featureName(fullyQualifiedFeatureIdentifier: string): string {
  return `${fullyQualifiedFeatureIdentifier.split('/')[2]}`;
}

const serviceDescriptionTemplate = {
  service_name: 'ExampleServer',
  service_description: 'ExampleServer',
  authors: '',
  creation_date: '19.03.2020',
  version: '1.0',
  vendor_url: '',
  SiLA_standard_feature_list: ['SiLAService'],
  SiLA_feature_list: featureListReducedWithoutDefaults,
  communication_port: '55001',
  IP_address: '127.0.0.1',
  hostname: 'localhost',
};

const delay = (t: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, t);
  });
};

const tempFolder = path.join(__dirname, '..', 'tmp');

const exampleServerFolder = path.join(tempFolder, 'ExampleServer');

describe('@sila-standard/dynamic-client', () => {
  let pythonSiLAServer: ChildProcessWithoutNullStreams;

  const currentEndpoint: Endpoint = JSON.parse(JSON.stringify(endpoint));

  describe(`runner`, () => {
    jest.setTimeout(30000);

    let dynamicClient: DynamicClient;

    beforeAll(async () => {
      fse.mkdirSync(exampleServerFolder, { recursive: true });

      featureList.forEach((fullyQualifiedFeatureIdentifier: string) => {
        fse.copyFileSync(
          featurePath(fullyQualifiedFeatureIdentifier),
          path.join(
            exampleServerFolder,
            `${featureName(fullyQualifiedFeatureIdentifier)}.sila.xml`
          )
        );
      });

      logger.info(`SILASERVER - generating service description...`);

      fse.writeFileSync(
        path.join(exampleServerFolder, 'service_description.json'),
        JSON.stringify(serviceDescriptionTemplate)
      );

      logger.info(`SILASERVER - generating code...`);

      spawnSync(
        'silacodegenerator',
        [`--build`, `ExampleServer`, '--ignore-overwrite-warning'],
        {
          cwd: tempFolder,
          // stdio: 'inherit',
        }
      );

      logger.info(`SILASERVER - launching...`);

      pythonSiLAServer = spawn(`python3`, [`ExampleServer_server.py`], {
        cwd: exampleServerFolder,
      });

      let resultStd = '';
      let resultErr = '';

      pythonSiLAServer.stdout.on('data', (data) => {
        resultStd += data.toString();
      });

      pythonSiLAServer.stderr.on('data', (data) => {
        resultErr += data.toString();
      });

      await delay(10000);

      logger.debug(resultStd);

      if (resultErr.indexOf('Started server in mode:') < 0) {
        logger.error('SILASERVER - NOT UP!');
        logger.error(resultErr);
        logger.error(resultStd);
        throw new Error('SiLA server could not be fired up.');
      } else {
        const regex = /in the network at ([\S\s]*) with port (\d*) /;

        const found = resultErr.match(regex);

        if (found && found.length > 1) {
          currentEndpoint.hostname = found[1];
          currentEndpoint.port = parseInt(found[2], 10);

          logger.info(
            `SILASERVER - up at ${currentEndpoint.hostname}, port ${currentEndpoint.port}`
          );
          logger.info(resultStd);
        } else {
          logger.error(
            `SILASERVER - up, but interface binding could not be detected.`
          );
          logger.error(resultErr);
          logger.error(resultStd);
          throw new Error('SiLA server could not be detected.');
        }
      }
    });

    afterAll(async () => {
      logger.info('SILASERVER - stopping...');

      pythonSiLAServer.kill('SIGTERM');
      pythonSiLAServer.kill('SIGKILL');

      await delay(2000);

      logger.info('SILASERVER - stopped.');

      // fse.rmSync(tempFolder, { recursive: true });
    });

    beforeEach(async () => {
      dynamicClient = new DynamicClient(endpoint);

      await dynamicClient.initSiLAFeatures();

      await dynamicClient.getImplementedFeatures();
    });

    it('should have initialized all features via reflection', async () => {
      expect(dynamicClient.state).toBe('initialized');
      expect(dynamicClient.featureList.sort()).toEqual(featureList.sort());
    });

    describe('SiLAFeature', () => {
      it('should get property ServerName', async () => {
        const response = await dynamicClient
          .useFeature('org.silastandard/core/SiLAService/v1')
          .getProperty('ServerName');

        expect(response).toStrictEqual({ value: 'ExampleServer' });
      });
    });

    describe('ObservablePropertyTest', () => {
      it('should get observable property UpTime', async () => {
        jest.setTimeout(60000);

        dynamicClient
          .useFeature('org.silastandard/test/ObservablePropertyTest/v1')
          .subscribeObservableProperty('Subscribe_UpTime', (res: unknown) => {
            expect(res).toStrictEqual({
              UpTime: {
                value: '0',
              },
            });
          });
        await delay(1000);
      });
    });

    describe('ObservableCommandTest', () => {
      it('should get observable command ObservableIteration', async () => {
        jest.setTimeout(60000);

        dynamicClient
          .useFeature('org.silastandard/test/ObservableCommandTest/v1')
          .subscribeObservableCommand(
            'ObservableIteration',
            { NumberIterations: 2 },
            (res: unknown) => {
              expect(res).toStrictEqual({
                commandStatus: 'waiting',
                estimatedRemainingTime: null,
                progressInfo: null,
                updatedLifetimeOfExecution: null,
              });
            }
          );

        await delay(1000);
      });
    });
  });
});
