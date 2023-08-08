import { QueryBase } from '@src/libs/ddd/query-base';
import { LoginUserProps } from '../../domain/user.types';

export class LoginUserQuery extends QueryBase {
  readonly email: string;
  readonly password: string;
  constructor(props: LoginUserProps) {
    super();
    this.email = props.email;
    this.password = props.password;
  }
}
