const MAX_SPOTS = 1500
const MIN_SPOTS = 50

export enum ParkingType {
  PUBLIC = 'public',
  PRIVATE = 'private',
  COURTESY = 'courtesy'
}

export type parkingType = ParkingType.COURTESY | ParkingType.PRIVATE | ParkingType.PUBLIC

export function validateParkingSpots (spots: number): void {
  if (spots < MIN_SPOTS) throw new Error('Parking lot is to small')

  if (spots > MAX_SPOTS) throw new Error('Parking lot is to big')
}

export function validateParkingType (parkingtype: parkingType): void {
  if (!Object.values(ParkingType).includes(parkingtype)) throw Error('Invalid parking type')
}
