import { UserEntity } from "../domain/user.entity";
import { LoginUserProps } from "../domain/user.types";



export default interface UserRepositoryPort {
    createUser: (entity:UserEntity) => Promise<boolean>;
    login: (props:LoginUserProps)=>void;
    
}