import * as dotenv from 'dotenv';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import UserModel from '../database/models/users';

dotenv.config();

// tipando o secret que está no .env
const secret = process.env.JWT_SECRET as string;

export default class UserService {
  userModel;
  constructor() {
    // o userModel recebe o que tem no User
    this.userModel = UserModel;
  }

  login = async (email: string, password: string) => {
    // tipando o email e password
    // usuário coloca email e senha na paǵina
    // conferindo se dentro do User encontra um email igual ao que foi colocado(email = email)
    const confereEmail = await this.userModel.findOne({ where: { email } });
    // se for diferente, retorna erro e status
    console.log(confereEmail);

    if (!confereEmail) {
      return { error: true };
    }
    // crypt.compare() compare se o password é igual ao password do email digitado
    const conferePassword = await bcryptjs.compare(password, confereEmail.password);

    // se não estiver correto, vai retornar erro e status
    if (!conferePassword) {
      return { error: true, status: 401, message: 'Incorrect email or password',
      };
    }

    // o objeto que vai estar preenchido
    const payload = {
      data: { email, password },
    };
    // o sign recebe 3 parâmetros: payload, secret e jwtOptions
    const token = jwt.sign(payload, secret, { expiresIn: '1d',
      algorithm: 'HS256' });

    // depois de fazer toda essa verificação do email e password, o servidor irá autenticar e criará um token JWT
    return { token };
  };

  verification = async (token: string) => {
    const myToken = jwt.verify(token, secret);
    const { data } = myToken as jwt.JwtPayload;

    const confereEmail = await this.userModel.findOne({ where: { email: data.email } });

    if (!myToken) {
      return 'invalid token';
    }

    if (confereEmail) {
      return confereEmail.role;
    }
  };
}
