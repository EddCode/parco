import { validateParkingDTO, validateParkingListDto } from '../ requestDTO'
import { ParkingLotActions } from '../../../application'
import { PsqlRepository } from '../psql/repoitory'

const { save, list } = ParkingLotActions(PsqlRepository)

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
  },
  getParkingLots: async ({ skip = 0, limit = 10, orderField = 'name', orderDirection = 'asc' }) => {
    try {
      const error = validateParkingListDto({ skip, limit, orderField, orderDirection })

      if (error != null) {
        throw new Error('Bad request')
      }

      const parkingLots = await list({
        skip,
        limit,
        orderField,
        orderDirection
      })

      return {
        totalItems: parkingLots.count,
        data: parkingLots.parking
      }
    } catch (err) {
      throw new Error('Error retrieving parking lots')
    }
  }
}
