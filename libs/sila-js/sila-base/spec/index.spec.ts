import path from 'path';

import { silaBasePath } from '../src/index';

describe('index', () => {
  it('should return silaBasePath', () => {
    expect(silaBasePath).toBe(
      path.join(__dirname, '..', 'src', 'assets', 'sila_base')
    );
  });
});
