import path from 'path';

import fse from 'fs-extra';

export const isDir = (dir: string) =>
  fse.existsSync(dir) && fse.statSync(dir).isDirectory();

export const listScenariosSync = (dir: string): Array<string> =>
  fse.readdirSync(dir).filter((scenario) => isDir(path.join(dir, scenario)));
