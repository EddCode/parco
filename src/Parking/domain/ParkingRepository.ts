import { type parkingLot } from './Parking.entity'
export interface listOptions {
  skip: number
  limit: number
  orderField: string
  orderDirection: string
}

export interface ParkingEntryValidator {
  validate: () => ParkingEntryResult
}

export interface accessActions {
  public: () => {
    success: boolean
  }
  private: () => ParkingEntryResult
  courtesy: () => ParkingEntryResult
}
export interface listResult {
  count: number
  parking: parkingLot[] | []
}

export interface ParkingEntryResult {
  success: boolean
  errorCode?: string
  message?: string
}

export interface ParkingLotRepository {
  save: (data: parkingLot) => Promise<parkingLot>
  list: (options: listOptions) => Promise<parkingLot[]>
  update: (parkingId: string, contact?: string, spots?: number) => Promise<parkingLot>
  getOne: (parkingId: string) => Promise<parkingLot>
}
