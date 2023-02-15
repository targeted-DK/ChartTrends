// logger.js
import { createLogger, format, transports } from "winston";
import path from "path";



const date = new Date();
const timestamp = date.toLocaleString();
const logDir = '../../errorlogs/'
const logFile = path.join(logDir, 'error' + timestamp +'.log');

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({
      filename: logFile,
      level: "error"
    })
  ]
});

export default logger;
