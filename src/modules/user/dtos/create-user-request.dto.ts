import { User } from "@prisma/client";


export type CreateUserRequestDto = Pick<User,"email"|"password">;