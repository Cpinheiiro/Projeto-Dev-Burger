import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth.js';
import User from '../models/User.js';

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const IsValid = await schema.isValid(request.body, {
      abortEarly: false,
      strict: true,
    });

    const emailorPasswordIncorrect = () => {
      return response
        .status(400)
        .json({ error: 'Email or password incorrect' });
    };

    if (!IsValid) {
      emailorPasswordIncorrect();
    }

    const { email, password } = request.body;

    const existsUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!existsUser) {
      emailorPasswordIncorrect();
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existsUser.password_hash,
    );

    if (!isPasswordValid) {
      emailorPasswordIncorrect();
    }

    const token = jwt.sign(
      { id: existsUser.id, admin: existsUser.admin, name: existsUser.name },
      authConfig.secret,
      {
        expiresIn: authConfig.experiresIn,
      },
    );

    return response.status(200).json({
      id: existsUser.id,
      name: existsUser.name,
      email: existsUser.email,
      admin: existsUser.admin,
      token,
    });
  }
}

export default new SessionController();
