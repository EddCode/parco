import { buildSchema } from 'graphql'

import { parkingLot, parkingLotQuery, parkingResolver } from '../../../Parking/infra/gateway/graphql'

export const Schema = buildSchema(`
   ${parkingLot}

   type Query {
      ${parkingLotQuery}
   }
`)

export const root = {
  ...parkingResolver
}
