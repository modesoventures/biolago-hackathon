import * as winston from 'winston';

import { initLogging, logger } from '../src/logging';

describe('Initialize global logging level', () => {
  it('should be debug', () => {
    const expectedLevel = 'debug';

    initLogging(expectedLevel);
    const actualLogger = logger('TEST');

    expect(actualLogger.level).toEqual(expectedLevel);
  });
});

describe('Get a logger for a given category', () => {
  it('should create a logger', () => {
    initLogging('silly');
    const category = 'MyCategory';

    expect(winston.loggers.has(category)).toBeFalsy();

    const actual = logger(category);
    const expected = winston.loggers.get(category);

    expect(expected).toBe(actual);
    expect(expected.level).toEqual('silly');
  });
});

describe('Get a logger for a given category multiple times', () => {
  it('should rerturn the same instance', () => {
    const category = 'ADifferentCategory';
    const actual = logger(category);

    expect(logger(category)).toBe(actual);
  });
});
