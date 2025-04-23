import { injectable, inject } from "inversify";
import { UserRepository } from "../ports/UserRepository";
import { User } from "../../../domain/user/models/User";

@injectable()
export class UpdateUser {
  constructor(
    @inject('IncidentRepository') private repository: UserRepository
  ) { }
  
    async execute(data: { identification: string; name: string, email: string }): Promise<User> {
      const existing = await this.repository.findById(data.identification);
      if (!existing) throw new Error('Incident not found');
  
      const updated = new User(data.identification, data.name, data.email);
  
      return this.repository.update(updated);
    }
  }
  