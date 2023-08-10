import { Command, CommandProps } from '@src/libs/ddd/command-base';

export class DeletePostCommand extends Command {
  readonly userId: string;
  readonly postId: string;
  constructor(props: CommandProps<DeletePostCommand>) {
    super(props);
    this.userId = props.userId;
    this.postId = props.postId;
  }
}
