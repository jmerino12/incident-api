import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  created_at?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public created_at!: Date;
}

export const defineUserModel = (sequelize: Sequelize) => {
    UserModel.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  });

  return UserModel;
};
