import { randomId } from "@src/utils/random-id";
import { CreateUserProps, LoginUserProps, UserProps } from "./user.types";
import { AggregateId, AggregateRoot } from "@src/libs/ddd/aggregate-root-base";
import { UserCreatedDomainEvent } from "./events/user-created.domain-event";
import { LoginUserQuery } from "../queries/login-user/login-user-query";
import { User } from "@prisma/client";
import { hashPassword } from "@src/utils/hash-password";
import { comparePassword } from "@src/utils/compare-password";

type resultUserWithNull = Pick<User,"email"|"password">|null;

export class UserEntity extends AggregateRoot<UserProps>{
    protected readonly _id : AggregateId;
    static create(createProps : CreateUserProps) : UserEntity {
        const id = randomId();
        const props : UserProps = {...createProps};
        props.password = hashPassword(props.password);
        const user = new UserEntity({id,props});
        user.addEvent(new UserCreatedDomainEvent({aggregatedId:id,email:props.email}));
        return user;
    }
    static validate(query : LoginUserQuery,user : resultUserWithNull){
        if(user===null)
            return false;
        const isMatched = comparePassword(query.password,user.password);
        if(isMatched)
            return false;
        return true;
    }
}