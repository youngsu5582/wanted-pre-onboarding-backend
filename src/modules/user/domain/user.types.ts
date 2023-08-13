import { User } from '@prisma/client';

export type CreateUserProps = Pick<User, 'email' | 'password' | 'nickname'>;
export type LoginUserProps = Pick<User, 'email' | 'password'>;
export type UserProps = Pick<User, 'email' | 'password' | 'nickname'>;
export type resultUserWithNull = Pick<User, 'email' | 'password'> | null;
