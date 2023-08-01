import { LoginUserProps } from "../domain/user.types";



export default interface UserRepositoryPort {
    createUser: (user:) => Promise<boolean>;
    login: (props:LoginUserProps)=>void;
    
}