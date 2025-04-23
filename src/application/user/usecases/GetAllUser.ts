import { injectable, inject } from "inversify";
import { UserRepository } from "../ports/UserRepository";
import { User } from "../../../domain/user/models/User";

@injectable()
export class GetAllUser {
  constructor(
    @inject('UserRepository') private repository: UserRepository
  ) { }

  async execute(): Promise<User[]> {
    return await this.repository.findAll();
  }
}
