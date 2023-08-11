import { logger } from '../../shared/logger'
import { uuidv4 } from '../../shared/uuid'
import {
  type listOptions,
  type listResult,
  type parkingLot,
  type ParkingLotRepository,
  type parkingType,
  createParkingEntryValidator,
  ParkingLot,
  type ParkingEntryResult,
  type userEnumType
} from '../domain'

interface parkingLotMutation {
  name: string
  contact: string
  parkingType: parkingType
  spots: number
}

interface ParkingLotActionsReturnType {
  save: (data: parkingLotMutation) => Promise<parkingLot>
  list: (options: listOptions) => Promise<listResult>
  edit: (parkingId: string, contact?: string, sports?: number) => Promise<parkingLot>
  checking: (parkingId: string, userType: userEnumType) => Promise<ParkingEntryResult>
}

export function ParkingLotActions (parkingRepository: ParkingLotRepository): ParkingLotActionsReturnType {
  const save = async (data: parkingLotMutation): Promise<parkingLot> => {
    try {
      const parkinglot: parkingLot = {
        id: uuidv4(),
        name: data.name,
        contact: data.contact,
        spots: data.spots,
        parkingType: data.parkingType
      }
      const parking = ParkingLot(parkinglot)
      const saved = await parkingRepository.save(parking)
      return saved
    } catch (err: any) {
      return await Promise.reject({
        success: false,
        errorCode: 'PARING_SAVE_ERR',
        message: err.message
      })
    }
  }

  const list = async (options: listOptions): Promise<listResult> => {
    try {
      const pagination: listOptions = {
        skip: (options.skip - 1) * options.limit,
        limit: options.limit,
        orderField: options.orderField,
        orderDirection: options.orderDirection
      }

      const parkingList = await parkingRepository.list(pagination)

      logger.info('Listing parking lots')
      return {
        count: parkingList.length,
        parking: parkingList
      }
    } catch (err: any) {
      logger.error(err.message)
      return await Promise.reject({
        success: false,
        errorCode: 'PARING_LIST_ERR',
        message: err.message
      })
    }
  }

  const edit = async (parkingId: string, contact?: string, sports?: number): Promise<parkingLot> => {
    try {
      const parking = await parkingRepository.update(parkingId, contact, sports)
      logger.info('Editing parking lots')

      return parking
    } catch (err: any) {
      logger.error(err.message)

      return await Promise.reject({
        success: false,
        errorCode: 'PARING_U',
        message: err.message
      })
    }
  }

  const checking = async (parkingId: string, userType: userEnumType): Promise<ParkingEntryResult> => {
    try {
      const parking = await parkingRepository.getOne(parkingId) as parkingLot | undefined
      if (parking == null) {
        return await Promise.reject({
          success: false,
          errorCode: 'PARKING_NOT_FOUND',
          message: 'Parking lot not found'
        })
      }

      const status = createParkingEntryValidator(userType, parking.parkingType).validate()

      if (!status.success) {
        return {
          success: false,
          errorCode: status.errorCode,
          message: status.message
        }
      }

      return status
    } catch (err: any) {
      return await Promise.reject({
        success: false,
        errorCode: 'PARKING_UNEXPECTED_ERR',
        message: err.message
      })
    }
  }

  return {
    save,
    list,
    edit,
    checking
  }
}
