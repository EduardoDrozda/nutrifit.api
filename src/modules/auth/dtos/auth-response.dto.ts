export interface IAuthResponseDTO {
  token: {
    type: string
    access_token: string
  }
  user: {
    id: string
    name: string
    email: string
  }
}
