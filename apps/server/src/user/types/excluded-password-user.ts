import { User } from "../entities/user.entity";

export type ExcludedPasswordUser = Omit<User, "password">;
