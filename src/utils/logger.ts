import { config } from '../config';

interface Logger {
  info: (message: string, data?: any) => void;
  error: (message: string, error?: any) => void;
  warn: (message: string, data?: any) => void;
}

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
};

type LogLevel = keyof typeof LOG_LEVELS;

function shouldLog(level: LogLevel): boolean {
  const configLevel = config.logging.level as LogLevel;
  return LOG_LEVELS[level] <= LOG_LEVELS[configLevel];
}

export const logger: Logger = {
  info: (message: string, data?: any) => {
    if (shouldLog('info')) {
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data || '');
    }
  },
  error: (message: string, error?: any) => {
    if (shouldLog('error')) {
      console.error(
        `[ERROR] ${new Date().toISOString()} - ${message}`,
        error || ''
      );
    }
  },
  warn: (message: string, data?: any) => {
    if (shouldLog('warn')) {
      console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data || '');
    }
  },
};
