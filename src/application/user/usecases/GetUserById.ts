import { injectable, inject } from "inversify";
import { UserRepository } from "../ports/UserRepository";
import { HttpError } from "../../../domain/shared/errors/HttpError";
import { User } from "../../../domain/user/models/User";

@injectable()
export class GetUserById {
  constructor(
    @inject('UserRepository') private repository: UserRepository
  ) { }

  async execute(identification: string): Promise<User> {
    const incident = await this.repository.findById(identification);

    if (!incident) {
      throw new HttpError('Incident not found', 404);
    }

    return incident;
  }
}
