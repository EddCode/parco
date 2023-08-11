import request from 'supertest'
import { app } from '../main'
import { PsqlRepository } from '../../Parking/infra/gateway/psql/repoitory';

jest.mock('../../Parking/infra/gateway/psql/repoitory')

describe('Parking integration tests', () => {
    const mockWeekday = new Date('2023-08-17T12:00:00Z')
    const mockSunday = new Date('2023-08-13T12:00:00Z')
    
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

    test('Should checkin', async () => {
        PsqlRepository.getOne = jest.fn().mockResolvedValue({
            id: 'bdddbb66-f3da-473e-b2d2-118f338f8b3b',
            name: "Other Parking 2",
            parkingType: "public",
            contact: '3319275124',
            spots: 100,
        })

        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
                mutation {
                    checking(parkingId: "bdddbb66-f3da-473e-b2d2-118f338f8b3b", userType: "visitor") {
                    message
                    statusCode
                    }
                }
                `
            })
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('checking')
        expect(response.body.data.checking).toHaveProperty('message')
        expect(response.body.data.checking.message).toBe('Checked in')
    })

    test('Should private checkin', async () => {
        PsqlRepository.getOne = jest.fn().mockResolvedValue({
            id: 'bdddbb66-f3da-473e-b2d2-118f338f8b3b',
            name: "Other Parking 2",
            parkingType: "private",
            contact: '3319275124',
            spots: 100,
        })

        const dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockWeekday)

        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
                mutation {
                    checking(parkingId: "bdddbb66-f3da-473e-b2d2-118f338f8b3b", userType: "corporate") {
                    message
                    statusCode
                    }
                }
                `
            })
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('checking')
        expect(response.body.data.checking).toHaveProperty('message')
        expect(response.body.data.checking.message).toBe('Checked in')
        dateSpy.mockRestore()
    })

    test('Should private checkin fail on weekend', async () => {
        PsqlRepository.getOne = jest.fn().mockResolvedValue({
            id: 'bdddbb66-f3da-473e-b2d2-118f338f8b3b',
            name: "Other Parking 2",
            parkingType: "private",
            contact: '3319275124',
            spots: 100,
        })

        const dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockSunday)

        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
                mutation {
                    checking(parkingId: "bdddbb66-f3da-473e-b2d2-118f338f8b3b", userType: "corporate") {
                    message
                    statusCode
                    }
                }
                `
            })
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('checking')
        expect(response.body.data.checking).toHaveProperty('message')
        expect(response.body.data.checking.message).toBe('Parking only available on weekdays')
        dateSpy.mockRestore()
    })

    test('Should courtesy checkin', async () => {
        PsqlRepository.getOne = jest.fn().mockResolvedValue({
            id: 'bdddbb66-f3da-473e-b2d2-118f338f8b3b',
            name: "Other Parking 2",
            parkingType: "courtesy",
            contact: '3319275124',
            spots: 100,
        })

        const dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockSunday)

        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
                mutation {
                    checking(parkingId: "bdddbb66-f3da-473e-b2d2-118f338f8b3b", userType: "visitor") {
                    message
                    statusCode
                    }
                }
                `
            })

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('checking')
        expect(response.body.data.checking).toHaveProperty('message')
        expect(response.body.data.checking.message).toBe('Checked in')
        dateSpy.mockRestore()
    })

    test('Should courtesy checkin', async () => {
        PsqlRepository.getOne = jest.fn().mockResolvedValue({
            id: 'bdddbb66-f3da-473e-b2d2-118f338f8b3b',
            name: "Other Parking 2",
            parkingType: "courtesy",
            contact: '3319275124',
            spots: 100,
        })

        const dateSpy = jest.spyOn(global, 'Date').mockImplementation(() => mockWeekday)

        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
                mutation {
                    checking(parkingId: "bdddbb66-f3da-473e-b2d2-118f338f8b3b", userType: "visitor") {
                    message
                    statusCode
                    }
                }
                `
            })

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('checking')
        expect(response.body.data.checking).toHaveProperty('message')
        expect(response.body.data.checking.message).toBe('Parking only available on weekends')
        dateSpy.mockRestore()
    })

    test('Should faild checkin for not found', async () => {
        PsqlRepository.getOne = jest.fn().mockResolvedValue(null) 
        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
                mutation {
                    checking(parkingId: "bdddbb66-f3da-473e-b2d2-118f338f8b3b", userType: "visitor") {
                    message
                    statusCode
                    }
                }
                `
            })

        expect(response.status).toBe(200)
        expect(response.body.data).toHaveProperty('checking')
        expect(response.body.data.checking).toHaveProperty('message')    
        expect(response.body.data.checking.message).toBe('Parking lot not found')
    })

    test('Should faild checkin for full parking lot', async () => {
        PsqlRepository.getOne = jest.fn().mockResolvedValue({
            id: 'bdddbb66-f3da-473e-b2d2-118f338f8b3b',
            name: "Other Parking 2",
            parkingType: "private",
            contact: '3319275124',
            spots: 100,
        })

        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
                mutation {
                    checking(parkingId: "bdddbb66-f3da-473e-b2d2-118f338f8b3b", userType: "visitor") {
                    message
                    statusCode
                    }
                }
                `
            }) 

        expect(response.status).toBe(200)
        expect(response.body.data).toHaveProperty('checking')
        expect(response.body.data.checking).toHaveProperty('message')  
        expect(response.body.data.checking.message).toBe('Access denied')
    })

    test('Should faild checkin for full parking lot', async () => {
        PsqlRepository.getOne = jest.fn().mockResolvedValue({
            id: 'bdddbb66-f3da-473e-b2d2-118f338f8b3b',
            name: "Other Parking 2",
            parkingType: "courtesy",
            contact: '3319275124',
            spots: 100,
        })

        const response = await request(app)
            .post('/graphql')
            .send({
                query: `
                mutation {
                    checking(parkingId: "bdddbb66-f3da-473e-b2d2-118f338f8b3b", userType: "provider") {
                    message
                    statusCode
                    }
                }
                `
            }) 

        expect(response.status).toBe(200)
        expect(response.body.data).toHaveProperty('checking')
        expect(response.body.data.checking).toHaveProperty('message')  
        expect(response.body.data.checking.message).toBe('Access denied')
    })
  })