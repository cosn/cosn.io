import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    new transports.Console({ format: format.simple() }),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
})

if (process.env.NODE_ENV !== 'production') {
  const ct = logger.transports.find((t) => t instanceof transports.Console)
  if (ct) {
    ct.format = format.combine(format.colorize(), format.simple())
  }
}

export default logger
