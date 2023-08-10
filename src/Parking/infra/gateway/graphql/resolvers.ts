import { validateParkingDTO } from '../ requestDTO'
import { ParkingLotActions } from '../../../application'
import { PsqlRepository } from '../psql/repoitory'

const { save } = ParkingLotActions(PsqlRepository)

export const parkingResolver = {
  createParking: async (input: any) => {
    const error = validateParkingDTO(input)

    if (error != null) {
      throw new Error(error.message)
    }

    const data = await save(input)

    return {
      ...data
    }
  }
}
