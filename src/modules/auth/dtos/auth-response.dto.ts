export interface IAuthResponseDTO {
  token: {
    type: string
    accessToken: string
  }
  user: {
    id: string
    name: string
    email: string
  }
}
