import { randomId } from '@src/utils/random-id';
import { CreateUserProps, LoginUserProps, UserProps } from './user.types';
import { AggregateId, AggregateRoot } from '@src/libs/ddd/aggregate-root-base';
import { UserCreatedDomainEvent } from './events/user-created.domain-event';
import { UserLoginDomainEvent } from './events/user-login.domain-event';

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: AggregateId;
  static create(createProps: CreateUserProps): UserEntity {
    const id = randomId();
    const props: UserProps = { ...createProps };
    const user = new UserEntity({ id, props });
    user.addEvent(
      new UserCreatedDomainEvent({ aggregatedId: id, email: props.email }),
    );
    return user;
  }
  static login(loginProps: LoginUserProps) {
    const id = randomId();
    const props: UserProps = { ...loginProps };
    const user = new UserEntity({ id, props });
    user.addEvent(
      new UserLoginDomainEvent({ aggregatedId: id, email: props.email }),
    );
    return user;
  }
}
