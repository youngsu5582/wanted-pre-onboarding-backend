import { randomId } from "@src/utils/random-id";
import { CreateUserProps, UserProps } from "./user.types";
import { AggregateId, AggregateRoot } from "@src/libs/ddd/aggregate-root-base";
import { UserCreatedDomainEvent } from "./events/user-created.domain-event";



export class UserEntity extends AggregateRoot<UserProps>{
    protected readonly _id : AggregateId;
    static create(create : CreateUserProps) : UserEntity {
        const id = randomId();
        const props : UserProps = {...create};
        const user = new UserEntity({id,props});
        user.addEvent(new UserCreatedDomainEvent({aggregatedId:id,email:props.email}));
        return user;
    } 
}