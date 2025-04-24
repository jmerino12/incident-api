import { QueryTypes, Sequelize } from "sequelize";
import { inject, injectable } from "inversify";
import { IncidentModel } from "./models/IncidentModel";
import { Incident } from "../../../domain/incident/models/Incident";
import { IncidentRepository } from "../../../application/incident/ports/IncidentRepository";
import { IncidentWithUser } from "../../../domain/incident/models/IncidentWithUser";
import { User } from "../../../domain/user/models/User";

@injectable()
export class IncidentSequalizeRepository implements IncidentRepository {
    constructor(
        @inject('Sequelize') private db: Sequelize
    ) { }

    async create(data: Incident): Promise<Incident> {
        const result = await this.db.query(
            'INSERT INTO incidents (title, description, status, created_by) VALUES (?, ?, ?, ?)',
            {
                replacements: [data.title, data.description, data.priority, data.createdBy],
                type: QueryTypes.INSERT,
                raw: true
            }
        );
        const insertedId = result[0];

        return new Incident(
            String(insertedId),
            data.title,
            data.description,
            data.priority,
            data.createdBy
        );
    }


    async findAll(): Promise<Incident[]> {
        const rows = await this.db.query(
            'SELECT incidents.*, users.id AS user_id, users.name AS user_name, users.email AS user_email ' +
            'FROM incidents ' +
            'JOIN users ON incidents.created_by = users.identification',
            {
                type: QueryTypes.SELECT,
                raw: true
            }
        );

        return rows.map((row: any) => new IncidentWithUser(
            String(row.id),
            row.title,
            row.description,
            row.status,
            row.created_by,
            new User(
              String(row.created_by),
              row.user_name,
              row.user_email
            )
          ));
          
    }

    async update(data: Incident): Promise<Incident> {
        await this.db.query(
            'UPDATE incidents SET title = ?, description = ?, status = ?, created_by = ? WHERE id = ?',
            {
                replacements: [data.title, data.description, data.priority, data.createdBy, data.id],
                type: QueryTypes.UPDATE,
            }
        );

        return data;
    }

    async findById(id: string): Promise<Incident | null> {
        const rows = await this.db.query(
            'SELECT * FROM incidents WHERE id = ?',
            {
                replacements: [id],
                model: IncidentModel,
                mapToModel: true,
                type: QueryTypes.SELECT
            }
        );

        const row = (rows)[0];
        if (!row) return null;

        return new Incident(
            String(row.id),
            row.title,
            row.description,
            row.status,
            row.created_by
        );
    }

    async findByTitle(title: string): Promise<Incident | null> {
        const [incident] = await this.db.query(
            'SELECT * FROM incidents WHERE title = ?',
            {
                replacements: [title],
                model: IncidentModel,
                mapToModel: true,
                type: QueryTypes.SELECT
            }
        );

        if (!incident) {
            return null;
        }

        return new Incident(
            String(incident.id),
            incident.title,
            incident.description,
            incident.status as 'low' | 'medium' | 'high',
            incident.created_by
        );
    }

    async delete(id: string): Promise<void> {
        await this.db.query(
            'DELETE FROM incidents WHERE id = ?',
            {
                replacements: [id],
                type: QueryTypes.DELETE,
            }
        );
    }

}