import { injectable, inject } from "inversify";
import { UserRepository } from "../ports/UserRepository";
import { User } from "../../../domain/user/models/User";

@injectable()
export class UpdateUser {
  constructor(
    @inject('UserRepository') private repository: UserRepository
  ) { }
  
    async execute(data: { id: string; name: string, email: string }): Promise<User> {
      const existing = await this.repository.findById(data.id);
      if (!existing) throw new Error('User not found');
  
      const updated = new User(data.id, data.name, data.email);
  
      return this.repository.update(updated);
    }
  }
  