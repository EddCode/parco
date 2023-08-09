export const parkingLot = `
  enum ParkingType {
    public
    private
    courtesy
  }

  type ParkingLot {
      id: String
      name: String
      spots: String,
      contact: String,
      parkingType: ParkingType
  }
`

export const parkingLotQuery = 'parking: ParkingLot'
