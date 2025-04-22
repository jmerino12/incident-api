// db/models/IncidentModel.ts

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface IncidentAttributes {
  id?: number;
  title: string;
  description: string;
  status: "low" | "medium" | "high";
  created_by: string;
  created_at?: Date;
}

export interface IncidentCreationAttributes extends Optional<IncidentAttributes, 'id'> {}

export class IncidentModel extends Model<IncidentAttributes, IncidentCreationAttributes> implements IncidentAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!:  "low" | "medium" | "high";
  public created_by!: string;
  public created_at!: Date;
}

export const defineIncidentModel = (sequelize: Sequelize) => {
  IncidentModel.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'Incident',
    tableName: 'incidents',
    timestamps: false,
  });

  return IncidentModel;
};
