import { User } from "@prisma/client";
import { LoginUserRequestDto } from "../dtos/login-user-request.dto";



export default interface UserRepositoryPort {
    createUser: (user:User) => void;
    login: (dto:LoginUserRequestDto)=>void;
    
}