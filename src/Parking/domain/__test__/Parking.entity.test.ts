import { ParkingLot, ParkingType } from '../index'

describe('Parking lot entity', () => {
  test('Should create a ParkingLot', () => {
    const ParkingMock = {
      id: 'some-random-id',
      spots: 500,
      name: 'Parco',
      contact: 'xx-xx-xx-xx',
      parkingType: ParkingType.PUBLIC
    }

    const parking = ParkingLot(ParkingMock)
    expect(parking).toMatchObject({
      id: 'some-random-id',
      spots: 500,
      name: 'Parco',
      contact: 'xx-xx-xx-xx',
      parkingType: 'public'
    })
  })

  test('Should throw and error for invalid spots small range', () => {
    const ParkingMock = {
      id: 'some-random-id',
      spots: 10,
      name: 'Parco',
      contact: 'xx-xx-xx-xx',
      parkingType: ParkingType.PUBLIC
    }


      expect(() => ParkingLot(ParkingMock)).toThrowError('Parking lot is to small')
  })

  test('Should throw and error for invalid spots big range', () => {
    const ParkingMock = {
      id: 'some-random-id',
      spots: 2000,
      name: 'Parco',
      contact: 'xx-xx-xx-xx',
      parkingType: ParkingType.PUBLIC
    }


      expect(() => ParkingLot(ParkingMock)).toThrowError('Parking lot is to big')
  })
})
