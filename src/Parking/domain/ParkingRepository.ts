import { type parkingLot } from './Parking.entity'
export interface listOptions {
  skip: number
  limit: number
  orderField: string
  orderDirection: string
}

export interface listResult {
  count: number
  parking: parkingLot[] | []
}

export interface ParkingLotRepository {
  save: (data: parkingLot) => Promise<parkingLot>
  list: (options: listOptions) => Promise<parkingLot[]>
  update: (parkingId: string, contact?: string, spots?: number) => Promise<parkingLot>
}
