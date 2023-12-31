import { UserEntity } from '../domain/user.entity';
import { resultUserWithNull } from '../domain/user.types';

export default interface UserRepositoryPort {
  createUser: (entity: UserEntity) => Promise<boolean>;
  findByEmail: (email: string) => Promise<resultUserWithNull>;
  saveRefreshToken: (email: string, refreshToken: string) => Promise<void>;
}
