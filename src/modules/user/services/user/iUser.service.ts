import { type ICreateUserDTO, type IGetUserDTO } from '../../dtos'

export interface IUserService {
  store: (data: ICreateUserDTO) => Promise<IGetUserDTO>
  getUserByEmail: (email: string) => Promise<IGetUserDTO | null>
}
