import { ParkingLotActions } from './ParkingUseCases'
import { ParkingLotRepository, ParkingType, parkingLot } from '../domain'

describe('Parking lot use cases', () => {
    const parking = {
        id: '8a6e0804-2bd0-4672-b79d-d97027f9071b',
        name: 'Estacionamento 1',
        contact: '55 11 99999-9999',
        spots: 50,
        parkingType: ParkingType.PRIVATE
    }

    const mockParkingRepository: ParkingLotRepository = {
        save: jest.fn().mockResolvedValue({
                id: '8a6e0804-2bd0-4672-b79d-d97027f9071b',
                name: 'Estacionamento 1',
                contact: '55 11 99999-9999',
                spots: 50,
                parkingType: ParkingType.PRIVATE
            } as parkingLot),
        list: jest.fn(),
        update: jest.fn(),
        getOne: jest.fn()
    };

    const {save} = ParkingLotActions(mockParkingRepository);

    test('Should create a parking lot', async () => {
        const savedParking = await save(parking)
        parking.id = savedParking.id
        expect(savedParking).toEqual(parking)
    })
})