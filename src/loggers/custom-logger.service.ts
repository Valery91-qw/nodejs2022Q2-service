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
import { CustomLoggerEnums } from './custom-logger.enums';
import customLoggerConstants from './custom-logger.constants';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLoggerService extends ConsoleLogger {
  pathToLogsFile = join(
    customLoggerConstants.pathToFolder,
    customLoggerConstants.fileName,
  );

  constructor(context?: string) {
    super(context);
    const lvl: LogLevel[] = [
      CustomLoggerEnums.error,
      CustomLoggerEnums.warn,
      CustomLoggerEnums.log,
      CustomLoggerEnums.debug,
      CustomLoggerEnums.verbose,
    ];
    super.setLogLevels(lvl);
  }
  error(message: string) {
    super.error(message);
    this.writeLogFile(message, CustomLoggerEnums.error);
  }
  warn(message: string) {
    super.warn(message);
    this.writeLogFile(message, CustomLoggerEnums.warn);
  }
  log(message: string) {
    super.log(message);
    this.writeLogFile(message, CustomLoggerEnums.log);
  }
  debug(message: string) {
    super.debug(message);
    this.writeLogFile(message, CustomLoggerEnums.debug);
  }
  verbose(message: string) {
    super.verbose(message);
    this.writeLogFile(message, CustomLoggerEnums.verbose);
  }

  writeLogFile(message: string, type: LogLevel) {
    if (!existsSync(customLoggerConstants.pathToFolder))
      mkdirSync(customLoggerConstants.pathToFolder);

    const currentMessage = `${type}: ${message} \n`;

    if (!existsSync(this.pathToLogsFile))
      writeFile(this.pathToLogsFile, currentMessage, (err) => {
        console.warn(err);
      });

    if (
      statSync(join('./log', 'logs.txt')).size <=
      customLoggerConstants.maxFileSizeKB
    ) {
      appendFileSync(this.pathToLogsFile, currentMessage);
    } else {
      renameSync(this.pathToLogsFile, `${this.pathToLogsFile}_${Date.now()}`);

      writeFile(this.pathToLogsFile, currentMessage, (err) => {
        console.warn(err);
      });
    }
  }
}
