import * as dotenv from 'dotenv';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import User from '../database/models/users';
import ILoginBody from '../interfaces/user.interface';

dotenv.config();

// tipando o secret que está no .env
const secret = process.env.JWT_SECRET as string;

export default class UserService {
  public userModel;
  constructor() {
    // o userModel recebe o que tem no User
    this.userModel = User;
  }

  public async login(body: ILoginBody) {
    // tipando o email e password
    const { email, password } = body;

    // usuário coloca email e senha na paǵina
    // conferindo se dentro do User encontra um email igual ao que foi colocado
    const confereEmail = await this.userModel.findOne({ where: { email } });
    // se for diferente, retorna erro e status
    if (!confereEmail) {
      return {
        error: true,
        status: 401,
        message: 'Incorrect email or password' };
    }
    // crypt.compare() compare se o password é igual ao password do email digitado
    const conferePassword = await bcryptjs.compare(password, confereEmail.password);

    // se não estiver correto, vai retornar erro e status
    if (!conferePassword) {
      return { error: true, status: 401, message: 'Incorrect email or password',
      };
    }

    // depois de fazer toda essa verificação do email e password, o servidor irá autenticar e criará um token JWT com status Ok (200)
    const token = jwt.sign({ email, password }, secret);
    return { status: 200, token };
  }
}
