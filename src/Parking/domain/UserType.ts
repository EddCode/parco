export enum userEnumType {
  CORPORATE = 'corporate',
  PROVIDER = 'provider',
  VISITOR = 'visitor'
}

export type userType = userEnumType.CORPORATE | userEnumType.PROVIDER | userEnumType.VISITOR

export function validateUserType (usertype: userType): void {
  if (!Object.values(userEnumType).includes(usertype)) throw Error('invalid user type')
}
