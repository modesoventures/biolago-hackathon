import * as winston from 'winston';

const { combine, timestamp, label, printf, splat } = winston.format;

const logFormat = printf((transformInfo: any) => {
  const { level, message } = transformInfo;
  const name = transformInfo.label;
  const ts = transformInfo.timestamp;

  return `${ts} | ${level.toUpperCase()} | ${name} | ${message}`;
});

const levelSetting = { level: 'info' };

/**
 * Initialize logging for the SiLA framework at the given level.
 * ```typescript
 * import { initLogging } from '@sila-standard/core';
 * initLogging('debug');
 * ```
 */
export const initLogging = (level: string): void => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Configuring logging at ${level} level`);
  }
  levelSetting.level = level;
};

/**
 * Create a logger for a given category of logging.
 * ```typescript
 * import { logger } from '@sila-standard/core';
 * const log = logger('MyLoggerCategory');
 * ...
 * log.debug('Hello you!');
 * // 2021-07-12T18:40:31.300Z | DEBUG | MyLoggerCategory | Hello you!
 * ```
 */
export const logger = (category: string): winston.Logger => {
  winston.loggers.add(category, {
    level: levelSetting.level,
    silent: process.env.NODE_ENV === 'test',
    format: combine(
      timestamp(),
      label({ label: category }),
      splat(),
      logFormat
    ),
    transports: [new winston.transports.Console()],
  });
  return winston.loggers.get(category);
};
