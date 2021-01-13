import { User } from "./User";

export type CreateUserInput = User &
  Omit<User, "id" | "createdAt" | "updatedAt">;
