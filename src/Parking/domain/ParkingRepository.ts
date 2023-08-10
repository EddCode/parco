import { type parkingLot } from './Parking.entity'
import { type userType } from './UserType'

export interface ParkingLotRepository {
  save: (data: parkingLot) => Promise<parkingLot>
  list: () => Promise<parkingLot[]>
  update: (parkingId: string, usertype: userType) => Promise<parkingLot>
}
