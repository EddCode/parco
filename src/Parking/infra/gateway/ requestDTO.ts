import Joi from 'joi'

import { userEnumType } from '../../domain'

export const createParkingLotInputSchema = Joi.object({
  name: Joi.string().required().min(3),
  spots: Joi.number().integer().min(50).max(1500).required(),
  contact: Joi.string().required().pattern(/^\d{10}$/, 'contact'),
  parkingType: Joi.string().valid('public', 'private', 'courtesy').required()
})

const parkingLotsSchema = Joi.object({
  skip: Joi.number().integer().min(1).required(),
  limit: Joi.number().integer().min(1).required(),
  orderField: Joi.string().valid('name', 'spots', 'contact', 'parkingType').required(),
  orderDirection: Joi.string().valid('asc', 'desc').required()
})

const checkingScema = Joi.object({
  parkingId: Joi.string().required(),
  userType: Joi.string().valid(userEnumType.CORPORATE, userEnumType.PROVIDER, userEnumType.VISITOR).required()
})

export const validateParkingDTO = (parkingDTO: any): boolean => {
  const { error } = createParkingLotInputSchema.validate(parkingDTO)

  if (error != null) {
    return true
  }

  return false
}

export const validateParkingListDto = (parkingDTO: any): boolean => {
  const { error } = parkingLotsSchema.validate(parkingDTO)

  if (error != null) { return true }

  return false
}

export const validateCheckingRequestDTO = (parkingDTO: any): boolean => {
  const { error } = checkingScema.validate(parkingDTO)
  if (error != null) { return true }

  return false
}
