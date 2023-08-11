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

  type ParkingLotList {
    totalItems: Int
    data: [ParkingLot]
  }

  type CheckingResponse {
    message: String
    statusCode: String

  }
`

export const parkingLotMutation = `
createParking(name: String, spots: Int, contact: String, parkingType: String): ParkingLot
`

export const parkinglist = 'getParkingLots(skip: Int, limit: Int, orderField: String, orderDirection: String): ParkingLotList'

export const editParking = 'editParking(id: String, contact: String!, spots: Int!): ParkingLot'

export const checking = 'checking(parkingId: String, userType: String): CheckingResponse'
