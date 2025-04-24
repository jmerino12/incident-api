import { User } from "../../../domain/user/models/User";

export interface UserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  delete(id: string): Promise<void>;
}