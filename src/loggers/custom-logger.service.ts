import { ConsoleLogger, Injectable, LogLevel, Scope } from '@nestjs/common';
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  renameSync,
  statSync,
  writeFile,
} from 'fs';
import { join } from 'path';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  constructor(context?: string) {
    super(context);
    const lvl: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];
    super.setLogLevels(lvl);
  }
  error(message: string) {
    super.error(message);
    this.writeLogFile(message, 'error');
  }
  warn(message: string) {
    super.warn(message);
    this.writeLogFile(message, 'warn');
  }
  log(message: string) {
    super.log(message);
    this.writeLogFile(message, 'log');
  }
  debug(message: string) {
    super.debug(message);
    this.writeLogFile(message, 'debug');
  }
  verbose(message: string) {
    super.verbose(message);
    this.writeLogFile(message, 'verbose');
  }

  writeLogFile(message: string, type: LogLevel) {
    if (!existsSync('./log')) mkdirSync('./log');
    const currentMessage = `${type}: ${message} \n`;
    if (!existsSync(join('./log', 'logs.txt')))
      writeFile(join('./log', 'logs.txt'), currentMessage, (err) => {
        console.log(err);
      });
    if (statSync(join('./log', 'logs.txt')).size <= 10 * 1024) {
      appendFileSync(join('./log', 'logs.txt'), currentMessage);
    } else {
      renameSync(
        join('./log', 'logs.txt'),
        `${join('./log', 'logs.txt')}_${Date.now()}`,
      );
      writeFile(join('./log', 'logs.txt'), currentMessage, (err) => {
        console.log(err);
      });
    }
  }
}
