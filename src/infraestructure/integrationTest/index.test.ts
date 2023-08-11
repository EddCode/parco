import request from 'supertest'
import { app } from '../main'
import { PsqlRepository } from '../../Parking/infra/gateway/psql/repoitory';

jest.mock('../../Parking/infra/gateway/psql/repoitory')

describe('Parking integration tests', () => {
    
    afterEach(() => {
        jest.restoreAllMocks()
    });

    it('Should create and save parking lot', async () => {
        const saveMock = jest.fn().mockResolvedValue({
            name: 'parco',
            contact: '3319275124',
            spots: 100,
            parkingType: 'public'
        })
        PsqlRepository.save = saveMock;
    
        const response = await request(app)
            .post('/graphql')
            .send({
            query: `
                mutation {
                    createParking(name: "parco", contact: "3319275124", spots: 100, parkingType: "public") {
                        id
                        name
                        contact
                        spots
                        parkingType
                    }
                }
            `,
            }).expect(200)
        
        expect(response.body.data).toHaveProperty('createParking')
        const savedParkingLot = response.body.data.createParking
        expect(savedParkingLot.name).toBe('parco')
        expect(savedParkingLot.contact).toBe('3319275124')
        expect(savedParkingLot.spots).toBe(100)
        expect(savedParkingLot.parkingType).toBe('public')
    })

    test('Should faild create and save', async () => {
        const saveMock = jest.fn().mockResolvedValue({})
        PsqlRepository.save = saveMock;
    
        const response = await request(app)
            .post('/graphql')
            .send({
            query: `
                mutation {
                    createParking(name: "parco", contact: "3319275", spots: 100, parkingType: "public") {
                        id
                        name
                        contact
                        spots
                        parkingType
                    }
                }
            `,
            }).expect(200)
        expect(response.body).toHaveProperty('errors')
    })

    test('Should get parking lots', async () => {
        
    })
    test('Should edit parking lot', async () => {})
    test('Should checkin', async () => {})
  })