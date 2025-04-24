import { injectable, inject } from "inversify";
import { UserRepository } from "../ports/UserRepository";
import { HttpError } from "../../../domain/shared/errors/HttpError";
import { User } from "../../../domain/user/models/User";

@injectable()
export class CreateUser {
    constructor(
        @inject('UserRepository') private repository: UserRepository
    ) { }

    async execute(data: { identification: string, name: string, email: string }) {
        const exists = await this.repository.findById(data.identification);
        if (exists) throw new HttpError('This identification already exists', 400);

        const existEmail = await this.repository.findByEmail(data.email);
        if (existEmail) throw new HttpError('This email already exists', 400);

        const user = new User(data.identification, data.name, data.email);

        return await this.repository.create(user);
    }
}