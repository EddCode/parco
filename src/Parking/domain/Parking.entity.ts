import { type ParkingType, validateParkingSpots, validateParkingType } from './ParkingType'

interface parkingLot {
  id: string
  name: string
  spots: number
  contact: string
  parkingType: ParkingType.PUBLIC | ParkingType.PRIVATE | ParkingType.COURTESY
}

export function ParkingLot (parking: parkingLot): parkingLot {
  validateParkingSpots(parking.spots)
  validateParkingType(parking.parkingType)

  return {
    id: parking.id,
    name: parking.name,
    spots: parking.spots,
    contact: parking.contact,
    parkingType: parking.parkingType
  }
}
