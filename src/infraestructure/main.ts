import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import { logger } from '../shared/logger'

import { config } from './config'
import { sequelize } from './db'
import { root, Schema } from './graphql/schemas'

const app = express()

app.use(
  '/graphql',
  graphqlHTTP({
    schema: Schema,
    rootValue: root,
    graphiql: true
  })
)

const start = async (): Promise<void> => {
  await sequelize.sync()
  logger.info('Database is running')
  app.listen(config.server.port, () => {
    logger.info(`Server listening on port ${config.server.port}`)
  })
}

export { start, app }
