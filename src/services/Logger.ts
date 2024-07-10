import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import { join } from 'path';
import SlackClient from './SlackClient';

class Logger {
  private static instance: Logger;
  private logger: WinstonLogger;

  private constructor() {
    const logFormat = format.combine(
      format.colorize(),
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    );

    this.logger = createLogger({
      level: 'info',
      format: logFormat,
      transports: [
        new transports.Console(),
        new transports.File({ filename: join(__dirname, '../../', 'logs', 'error.log'), level: 'error' }),
        new transports.File({ filename: join(__dirname, '../../', 'logs', 'combined.log') })
      ]
    });

    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new transports.Console({
        format: format.combine(
          format.colorize(),
          format.simple()
        )
      }));
    }
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
    this.notifySlack(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  private async notifySlack(message: string): Promise<void> {
    const slackClient = SlackClient.getInstance();
    await slackClient.sendMessage(`Error: ${message}`);
  }
}

export default Logger;
