import { randomId } from "@src/utils/random-id";
import { CreateUserProps, UserProps } from "./user.types";
import { AggregateId, AggregateRoot } from "@src/libs/ddd/aggregate-root-base";



export class UserEntity extends AggregateRoot<UserProps>{
    protected readonly _id : AggregateId;
    static create(create : CreateUserProps) : UserEntity {
        const id = randomId();
        const now = new Date();
        const props : UserProps = {...create};
        
        const user = new UserEntity({id,props});
        user.createdAt
        return user;
    } 
}