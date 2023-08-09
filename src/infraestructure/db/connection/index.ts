import { Sequelize } from 'sequelize'

import { config } from '../../config'

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.db.host,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name
})
