import type { ParkingEntryResult, ParkingEntryValidator, accessActions } from './ParkingRepository'
import { ParkingType, validateParkingSpots, validateParkingType } from './ParkingType'
import { userEnumType } from './UserType'

export interface parkingLot {
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

export const createParkingEntryValidator = (userType: userEnumType, parkingType: string): ParkingEntryValidator => {
  const validate = (): ParkingEntryResult => {
    const accessTypes: accessActions = {
      [ParkingType.PUBLIC]: () => ({ success: true }),
      [ParkingType.PRIVATE]: () => validatePrivate(),
      [ParkingType.COURTESY]: () => validateCourtesy()
    }

    /* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */
    return accessTypes[parkingType as ParkingType] ? accessTypes[parkingType as ParkingType]() : invalidParkingTypeError()
  }

  const validatePrivate = (): ParkingEntryResult => {
    if (userType === userEnumType.CORPORATE) {
      return validateWeekday() ? { success: true } : weekdayError()
    }
    return accessDeniedError()
  }

  const validateCourtesy = (): ParkingEntryResult => {
    if (userType === userEnumType.VISITOR) {
      return validateWeekend() ? { success: true } : weekendError()
    }
    return accessDeniedError()
  }

  const validateWeekday = (): boolean => {
    const now = new Date()
    const dayOfWeek = now.getDay()
    return dayOfWeek >= 1 && dayOfWeek <= 5 // Días hábiles (lunes a viernes)
  }

  const validateWeekend = (): boolean => {
    const now = new Date()
    const dayOfWeek = now.getDay()
    return dayOfWeek === 0 || dayOfWeek === 6 // Sábado o domingo
  }

  const accessDeniedError = (): ParkingEntryResult => {
    return { success: false, errorCode: 'ACCESS_DENIED', message: 'Access denied' }
  }

  const weekdayError = (): ParkingEntryResult => {
    return { success: false, errorCode: 'WEEKDAY_ERROR', message: 'Parking only available on weekdays' }
  }

  const weekendError = (): ParkingEntryResult => {
    return { success: false, errorCode: 'WEEKEND_ERROR', message: 'Parking only available on weekends' }
  }

  const invalidParkingTypeError = (): ParkingEntryResult => {
    return { success: false, errorCode: 'INVALID_PARKING_TYPE', message: 'Invalid parking type' }
  }

  return { validate }
}
