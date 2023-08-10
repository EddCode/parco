import { buildSchema } from 'graphql'

import { parkingLotResponseDto, parkingLotQuery, parkingResolver, parkingLotMutation } from '../../../Parking/infra/gateway/graphql'

export const Schema = buildSchema(`
   ${parkingLotResponseDto}

   type Query {
      ${parkingLotQuery}
   }

   type Mutation {
    ${parkingLotMutation}
   }
`)

export const root = {
  ...parkingResolver
}
