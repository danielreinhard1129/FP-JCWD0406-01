import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.printf((log) => {
    return `${new Date()} : ${log.level.toLocaleUpperCase()} : ${log.message}`;
  }),
  transports: [
    new winston.transports.Console({}),
    new DailyRotateFile({
      filename: 'app-%DATE%.log',
      dirname: 'logs',
      zippedArchive: true,
      maxSize: '1m',
      maxFiles: '14d',
    }),
  ],
});
