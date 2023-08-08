import { DomainEvent, DomainEventProps } from '@src/libs/ddd/domain-event-base';

export class UserCreatedDomainEvent extends DomainEvent {
  readonly email: string;
  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
    super(props);
    this.email = props.email;
  }
}
