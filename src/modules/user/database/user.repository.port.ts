import { LoginUserRequestDto } from "../dtos/login-user-request.dto";
import { UserEntity } from "../dtos/user-entity.dto";



export default interface UserRepositoryPort {
    createUser: (user:UserEntity) => Promise<boolean>;
    login: (dto:LoginUserRequestDto)=>void;
    
}