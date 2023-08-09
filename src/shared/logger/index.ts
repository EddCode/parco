import winston from 'winston'

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
})

logger.add(new winston.transports.Console({
  format: winston.format.simple()
}))

export { logger }
