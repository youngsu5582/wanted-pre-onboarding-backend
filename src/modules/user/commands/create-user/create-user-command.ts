import { Command, CommandProps } from '@src/libs/ddd/command-base';

export class CreateUserCommand extends Command {
  readonly email: string;
  readonly password: string;
  readonly nickname: string;
  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.email = props.email;
    this.password = props.password;
    this.nickname = props.nickname;
  }
}
