import { DomainEvent, DomainEventProps } from '@src/libs/ddd/domain-event-base';

export class PostCreatedDomainEvent extends DomainEvent {
  readonly userId: string;
  constructor(props: DomainEventProps<PostCreatedDomainEvent>) {
    super(props);
    this.userId = props.userId;
  }
}
