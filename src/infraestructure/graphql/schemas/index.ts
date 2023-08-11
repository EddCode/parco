import { buildSchema } from 'graphql'

import { parkingLotResponseDto, parkingResolver, parkingLotMutation, parkinglist, editParking, checking } from '../../../Parking/infra/gateway/graphql'

export const Schema = buildSchema(`
   ${parkingLotResponseDto}

   type Query {
      ${parkinglist}
   }

   type Mutation {
    ${parkingLotMutation}
    ${editParking}
    ${checking}
   }
`)

export const root = {
  ...parkingResolver
}
