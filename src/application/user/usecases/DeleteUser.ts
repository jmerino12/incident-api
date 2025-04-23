import { injectable, inject } from "inversify";
import { UserRepository } from "../ports/UserRepository";
import { HttpError } from "../../../domain/shared/errors/HttpError";

@injectable()
export class DeleteUser {
  constructor(
    @inject('UserRepository') private repository: UserRepository
  ) { }

  async execute(identification: string): Promise<void> {
    const incident = await this.repository.findById(identification);

    if (!incident) {
      throw new HttpError('Incident not found', 404);
    }

    await this.repository.delete(identification);
  }
}
