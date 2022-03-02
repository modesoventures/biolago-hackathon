import path from 'path';

import fse from 'fs-extra';

import extractDataType from '../../../../src/utils/silaHelpers/extractDataType';
import { listScenariosSync } from '../../../fixtures/helpers';

const FIXTURES_DIR = path.join(__dirname, '../../../fixtures/');
const fixture = (...paths: Array<string>): string =>
  path.join(FIXTURES_DIR, ...paths);

describe('utils/silaHelpers/extractDataType', () => {
  const scenarios: Array<string> = listScenariosSync(fixture('dataTypes'));

  scenarios.forEach((scenario) => {
    describe(`+ ${scenario}`, () => {
      it(`should convert ${scenario}`, async () => {
        const dataTypeWithConstrained = await fse.readJson(
          fixture('dataTypes', scenario, `${scenario}.json`)
        );
        const dataTypeWithConstrainedParsed = await fse.readJson(
          fixture('dataTypes', scenario, `${scenario}.parsed.json`)
        );

        expect(extractDataType(dataTypeWithConstrained)).toEqual(
          dataTypeWithConstrainedParsed
        );
      });
    });
  });
});
