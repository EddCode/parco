import { Parking } from '../../../../infraestructure/db'
import { type ParkingLotRepository, type parkingLot, type listOptions } from '../../../domain'

const save = async (parking: parkingLot): Promise<parkingLot> => {
  try {
    const parkingModel = Parking.build(parking as any)
    await parkingModel.save()
    console.log(parking, 'After saved')
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

const getOne = async (parkingId: string): Promise<parkingLot> => {
  try {
    const parking = await Parking.findByPk(parkingId) as any
    if (parking == null) {
      throw Error('Parking not found')
    }

    const parkingLotType: parkingLot = {
      id: parking.id,
      name: parking.name,
      contact: parking.contact,
      spots: parking.spots,
      parkingType: parking.parkingType
    }

    return parkingLotType
  } catch (err: any) {
    throw Error(err.message)
  }
}

const edit = async (parkingId: string, contact?: string, spots?: number): Promise<parkingLot> => {
  try {
    const parking = await Parking.findByPk(parkingId) as any
    if (parking == null) {
      throw Error('Parking not found')
    }

    parking.contact = (contact !== '') ? contact : parking.contact
    parking.spots = (!Number.isNaN(spots)) ? spots : parking.spots

    await parking.save()

    const parkingUpdated: parkingLot = {
      id: parking.id,
      name: parking.name,
      contact: parking.contact,
      spots: parking.spots,
      parkingType: parking.parkingType
    }

    return parkingUpdated
  } catch (err: any) {
    throw Error(err.message)
  }
}

export const PsqlRepository: ParkingLotRepository = {
  list,
  update: edit,
  save,
  getOne
}
