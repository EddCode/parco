import jwt from 'jsonwebtoken'

import { config } from '../../infraestructure/config'

export function signToken (payload: unknown): string {
  if (payload instanceof Object) {
    const token = jwt.sign(payload, config.jwt.secret)
    return token
  }

  throw new Error('Payload should be an object')
}

export function tokenVerify (authorization: unknown): any {
  if (typeof authorization !== 'string') return null

  if (!authorization.startsWith('Bearer ')) {
    return null
  }

  try {
    const token = authorization.slice(7)
    const decodedToken = jwt.verify(token, config.jwt.secret)

    return {
      user: decodedToken
    }
  } catch (_err) {
    return null
  }
}
