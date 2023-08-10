import Joi from 'joi'

export const createParkingLotInputSchema = Joi.object({
  name: Joi.string().required().min(3),
  spots: Joi.number().integer().min(50).max(1500).required(),
  contact: Joi.string().required().pattern(/^\d{10}$/, 'contact'),
  parkingType: Joi.string().valid('public', 'private', 'courtesy').required()
})

export const validateParkingDTO = (parkingDTO: any): { message: string } | undefined => {
  const { error } = createParkingLotInputSchema.validate(parkingDTO)

  if (error != null) {
    return {
      message: 'Bad Request'
    }
  }
}
