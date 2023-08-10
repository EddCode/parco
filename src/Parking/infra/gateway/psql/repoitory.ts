import { Parking } from '../../../../infraestructure/db'
import { type userType, type ParkingLotRepository, type parkingLot, ParkingType } from '../../../domain'

const save = async (parking: parkingLot): Promise<parkingLot> => {
  try {
    const parkingModel = Parking.build(parking as any)
    await parkingModel.save()
    return parking
  } catch (err: any) {
    throw Error(err)
  }
}

const list = async (): Promise<parkingLot[]> => {
  return []
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
