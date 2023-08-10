import { DataTypes } from 'sequelize'

import { sequelize } from '../connection'

enum parkingType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  COURTESY = 'courtesy'
}

export const Parking = sequelize.define('Parking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  spots: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  parkingType: {
    type: DataTypes.ENUM(parkingType.PUBLIC, parkingType.PRIVATE, parkingType.COURTESY)
  }
})
