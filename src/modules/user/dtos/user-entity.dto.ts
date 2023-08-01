
import { User } from "@prisma/client";


export type UserEntity = Pick<User,"email"|"password"|'id'>;