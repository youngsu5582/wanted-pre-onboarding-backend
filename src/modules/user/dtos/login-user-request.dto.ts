
import { User } from "@prisma/client";


export type LoginUserRequestDto = Pick<User,"email"|"password">;