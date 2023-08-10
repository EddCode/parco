import { buildSchema } from 'graphql'

import { parkingLotResponseDto, parkingResolver, parkingLotMutation, parkinglist, editParking } from '../../../Parking/infra/gateway/graphql'

export const Schema = buildSchema(`
   ${parkingLotResponseDto}

   type Query {
      ${parkinglist}
   }

   type Mutation {
    ${parkingLotMutation}
    ${editParking}
   }
`)

export const root = {
  ...parkingResolver
}
