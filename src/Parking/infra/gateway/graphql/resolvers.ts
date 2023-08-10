import { validateParkingDTO, validateParkingListDto } from '../ requestDTO'
import { ParkingLotActions } from '../../../application'
import { PsqlRepository } from '../psql/repoitory'

const { save, list, edit } = ParkingLotActions(PsqlRepository)

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
  },
  editParking: async (input: any) => {
    try {
      const parking = await edit(input.id, input.contact, input.spots)

      return {
        ...parking
      }
    } catch (err: any) {
      throw new Error(err.message)
    }
  }
}
