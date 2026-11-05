import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import User from '../models/User.js';

class UserController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      console.log(err);
      return response.status(400).json({ error: err.errors });
    }

    const { name, email, password, admin } = request.body;

    const existsUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existsUser) {
      return response.status(400).json({ message: 'Email already taken!' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    });

    return response.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
    });
  }

  async index(_request, response) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'admin'],
    });

    return response.status(200).json(users);
  }
}

export default new UserController();

/*
  store -> cria dados
  index -> lista todos os dados
  show -> Lista um dado específico
  update -> atualiza dados
  delete -> apaga dados
*/
