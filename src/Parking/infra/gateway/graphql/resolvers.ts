import { validateCheckingRequestDTO, validateParkingDTO, validateParkingListDto } from '../ requestDTO'
import { ParkingLotActions } from '../../../application'
import { PsqlRepository } from '../psql/repoitory'

const { save, list, edit, checking } = ParkingLotActions(PsqlRepository)

export const parkingResolver = {
  createParking: async (input: any) => {
    try {
      const isError = validateParkingDTO(input)

      if (isError) {
        throw new Error('Bad request')
      }

      const data = await save(input)

      return {
        ...data
      }
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
  getParkingLots: async ({ skip = 0, limit = 10, orderField = 'name', orderDirection = 'asc' }) => {
    try {
      const isError = validateParkingListDto({ skip, limit, orderField, orderDirection })

      if (isError) {
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
  },
  checking: async (input: any) => {
    try {
      const error = validateCheckingRequestDTO(input)

      if (error) {
        await Promise.reject({
          success: false,
          errorCode: 'BAD_REQUEST_ERR',
          message: 'Bad request'
        })
      }

      const checkdStatus = await checking(input.parkingId, input.userType)

      if (!checkdStatus.success) {
        await Promise.reject({
          success: false,
          errorCode: 'CHECKING_ERR',
          message: checkdStatus.message
        })
      }

      return {
        message: 'Checked in',
        statusError: false
      }
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
        statusCode: err.errorCode
      }
    }
  }
}
