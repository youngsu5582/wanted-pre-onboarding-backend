import { Command, CommandProps } from '@src/libs/ddd/command-base';

export class UpdatePostCommand extends Command {
  readonly title: string;
  readonly content: string;
  readonly userId: string;
  readonly postId: string;
  constructor(props: CommandProps<UpdatePostCommand>) {
    super(props);
    this.title = props.title;
    this.content = props.content;
    this.userId = props.userId;
    this.postId = props.postId;
  }
}
