import { logger } from '../../shared/logger'
import { type listOptions, type listResult, ParkingLot, type parkingLot, type ParkingLotRepository, type parkingType } from '../domain'

interface parkingLotMutation {
  name: string
  contact: string
  parkingType: parkingType
  spots: number
}

export function ParkingLotActions (parkingRepository: ParkingLotRepository): any {
  const save = async (data: parkingLotMutation): Promise<parkingLot | undefined> => {
    try {
      const parkinglot: parkingLot = {
        id: '8a6e0804-2bd0-4672-b79d-d97027f9071b',
        name: data.name,
        contact: data.contact,
        spots: data.spots,
        parkingType: data.parkingType
      }
      const parking = ParkingLot(parkinglot)
      const ab = await parkingRepository.save(parking)
      return ab
    } catch (err: any) {
      await Promise.reject(err)
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
      return await Promise.reject(err.message)
    }
  }

  const edit = async (parkingId: string, contact?: string, sports?: number): Promise<parkingLot> => {
    try {
      const parking = await parkingRepository.update(parkingId, contact, sports)
      logger.info('Editing parking lots')
      console.log(parking)
      return parking
    } catch (err: any) {
      logger.error(err.message)
      return await Promise.reject(err.message)
    }
  }

  return {
    save,
    list,
    edit
  }
}
