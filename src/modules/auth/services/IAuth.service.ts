import { IAuthRequestDTO, IAuthResponseDTO } from '../dtos'

export interface IAuthService {
  login(loginDto: IAuthRequestDTO): Promise<IAuthResponseDTO>
}
