import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  // public <campo>!: <tipo>;
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  // underscoredAll: trueconverter automaticamente os nomes dos atributos do modelo camelCased para sublinhado(snake_case)
  underscored: true,
  // configuração do sequelize
  sequelize: db,
  // nome da tabela
  modelName: 'users',
  // createdAt e updatedAt são criadas automaticamente
  timestamps: false,
});

export default Users;
