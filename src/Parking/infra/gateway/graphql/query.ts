export const parkingLotResponseDto = `
  enum ParkingType {
    public
    private
    courtesy
  }

  type ParkingLot {
      id: String
      name: String
      spots: Int,
      contact: String,
      parkingType: ParkingType
  }
`

export const parkingLotQuery = 'parking: ParkingLot'

export const parkingLotMutation = `
createParking(name: String, spots: Int, contact: String, parkingType: String): ParkingLot
`
