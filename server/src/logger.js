import logger from 'simple-node-logger';
import context from 'request-context';

const loggerOptions = {
    logDirectory: './logs',
    fileNamePattern: '<DATE>.log',
    dateFormat: 'DD.MM.YYYY'
};

const log = logger.createRollingFileLogger(loggerOptions);

export const fileLogger = {
    ...log,
    info: (message) => log.info(context.get('uuid'), ' ', message),
    error: (message) => log.error(context.get('uuid'), ' ', message),
    fatal: (message) => log.fatal(context.get('uuid'), ' ', message),
};
