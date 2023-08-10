import { DomainEvent, DomainEventProps } from '@src/libs/ddd/domain-event-base';

export class PostUpdatedDomainEvent extends DomainEvent {
  readonly userId: string;
  constructor(props: DomainEventProps<PostUpdatedDomainEvent>) {
    super(props);
    this.userId = props.userId;
  }
}
