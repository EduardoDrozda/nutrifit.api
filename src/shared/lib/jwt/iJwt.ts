export interface IJwt {
  sign(payload: string | object | Buffer, secret?: string): string
  verify(token: string, secret?: string): string | object
}
