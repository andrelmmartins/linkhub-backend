export const roles = [ 'admin', 'normal' ] as const
type RoleTuple = typeof roles;

export type Role = RoleTuple[number]
