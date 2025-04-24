import { inject, injectable } from "inversify";
import { QueryTypes, Sequelize } from "sequelize";
import { UserRepository } from "../../../application/user/ports/UserRepository";
import { User } from "../../../domain/user/models/User";
import { UserModel } from "./models/UserModel";

@injectable()
export class UserSequalizeRepository implements UserRepository {
    constructor(
        @inject('Sequelize') private db: Sequelize
    ) { }
    async create(user: User): Promise<User> {
        const result = await this.db.query(
            'INSERT INTO users (identification, name, email) VALUES (?, ?, ?)',
            {
                replacements: [user.id, user.name, user.email],
                type: QueryTypes.INSERT,
                raw: true
            }
        );
        const insertedId = result[0];

        return new User(
            String(insertedId),
            user.name,
            user.email,
        );
    }
    async findAll(): Promise<User[]> {
        const rows = await this.db.query(
            'SELECT * FROM users',
            {
                type: QueryTypes.SELECT,
                mapToModel: true,
                model: UserModel
            }
        );

        return (rows).map(row => new User(
            String(row.identification),
            row.name,
            row.email,
        ));
    }
    async update(user: User): Promise<User> {
        await this.db.query(
            'UPDATE users SET name = ?, email = ? WHERE identification = ?',
            {
                replacements: [user.name, user.email, user.id],
                type: QueryTypes.UPDATE,
            }
        );

        return user;
    }
    async findById(id: string): Promise<User | null> {
        const rows = await this.db.query(
            'SELECT * FROM users WHERE identification = ?',
            {
                replacements: [id],
                model: UserModel,
                mapToModel: true,
                type: QueryTypes.SELECT
            }
        );

        const row = (rows)[0];
        if (!row) return null;

        return new User(
            String(row.id),
            row.name,
            row.email,
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const rows = await this.db.query(
            'SELECT * FROM users WHERE email = ?',
            {
                replacements: [email],
                model: UserModel,
                mapToModel: true,
                type: QueryTypes.SELECT
            }
        );

        const row = (rows)[0];
        if (!row) return null;

        return new User(
            String(row.id),
            row.name,
            row.email,
        );
    }
    async delete(id: string): Promise<void> {
        await this.db.query(
            'DELETE FROM users WHERE identification = ?',
            {
                replacements: [id],
                type: QueryTypes.DELETE,
            }
        );
    }
}
