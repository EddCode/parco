import { Parking } from '../../../../infraestructure/db'
import { type userType, type ParkingLotRepository, type parkingLot, ParkingType, type listOptions } from '../../../domain'

const save = async (parking: parkingLot): Promise<parkingLot> => {
  try {
    const parkingModel = Parking.build(parking as any)
    await parkingModel.save()
    return parking
  } catch (err: any) {
    throw Error(err)
  }
}

const list = async (options: listOptions): Promise<parkingLot[]> => {
  try {
    const parkingList = await Parking.findAll({
      offset: options.skip,
      limit: options.limit,
      order: [[options.orderField, options.orderDirection]]
    })

    const parkingLotTypes: parkingLot[] = parkingList.map((parking: any) => ({
      id: parking.id,
      name: parking.name,
      contact: parking.contact,
      spots: parking.spots,
      parkingType: parking.parkingType
    }))

    return parkingLotTypes
  } catch (err: any) {
    throw Error(err)
  }
}

const edit = async (_parkingId: string, _usertype: userType): Promise<parkingLot> => {
  const response: parkingLot = {
    id: '1',
    name: 'Estacionamento 1',
    contact: '55 11 99999-9999',
    spots: 50,
    parkingType: ParkingType.PRIVATE
  }
  return response
}

export const PsqlRepository: ParkingLotRepository = {
  list,
  update: edit,
  save
}
