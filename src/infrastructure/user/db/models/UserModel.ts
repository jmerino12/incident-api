import { Sequelize, DataTypes, Model, Optional, literal } from 'sequelize';

export interface UserAttributes {
  id?: number;
  identification: string;
  name: string;
  email: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at'>{}

export class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public identification!: string;
  public name!: string;
  public email!: string;
  public created_at!: Date;
  public updated_at!: Date;

}

export const defineUserModel = (sequelize: Sequelize) => {
    UserModel.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    identification: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    created_at: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: literal('CURRENT_TIMESTAMP'),
   },
   updated_at: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: literal('CURRENT_TIMESTAMP'),
 }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',  
    updatedAt: 'updated_at',
  });

  return UserModel;
};
