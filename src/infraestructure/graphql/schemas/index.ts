import { buildSchema } from 'graphql'

import { parkingLotResponseDto, parkingResolver, parkingLotMutation, parkinglist } from '../../../Parking/infra/gateway/graphql'

export const Schema = buildSchema(`
   ${parkingLotResponseDto}

   type Query {
      ${parkinglist}
   }

   type Mutation {
    ${parkingLotMutation}
   }
`)

export const root = {
  ...parkingResolver
}
