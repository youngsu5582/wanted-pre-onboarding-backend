import { CreateUserProps, UserProps } from "./user.types";
import { AggregateId, AggregateRoot } from "@src/libs/ddd/aggregate-root-base";
import {v4} from 'uuid';

export class UserEntity extends AggregateRoot<UserProps>{
    protected readonly _id : AggregateId;
    static create(props : CreateUserProps) : UserEntity {
        const id = v4();
        const user = new UserEntity({id,props});
        return user;
    } 
}