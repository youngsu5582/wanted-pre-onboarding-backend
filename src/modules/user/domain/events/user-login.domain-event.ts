import { DomainEvent, DomainEventProps } from '@src/libs/ddd/domain-event-base';

export class UserLoginDomainEvent extends DomainEvent {
  readonly email: string;
  constructor(props: DomainEventProps<UserLoginDomainEvent>) {
    super(props);
    this.email = props.email;
  }
}
