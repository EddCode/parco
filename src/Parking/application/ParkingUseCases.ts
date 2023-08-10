import { logger } from '../../shared/logger'
import { ParkingLot, type parkingLot, type ParkingLotRepository, type parkingType } from '../domain'

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

  const list = () => {
    logger.info('Listing parking lots')
  }

  const edit = () => {
    logger.info('Editing parking lots')
  }

  return {
    save,
    list,
    edit
  }
}
