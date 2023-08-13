import { Command, CommandProps } from '@src/libs/ddd/command-base';

export class CreatePostCommand extends Command {
  readonly title: string;
  readonly content: string;
  readonly userId: string;
  readonly imageUrl: string;
  constructor(props: CommandProps<CreatePostCommand>) {
    super(props);
    this.title = props.title;
    this.content = props.content;
    this.userId = props.userId;
    this.imageUrl = props.imageUrl;
  }
}
