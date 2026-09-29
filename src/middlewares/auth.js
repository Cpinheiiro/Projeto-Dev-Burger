import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';

const authMiddlewar = (request, response, next) => {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({ error: 'Token not provided' });
  }

  const token = authToken.split(' ')[1];

  try {
    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err) {
        throw Error();
      }

      request.userId = decoded.id;
      request.userAdmin = decoded.admin;
      request.userName = decoded.name;
    });
  } catch (_error) {
    return response.status(401).json({ error: 'Token is invalid' });
  }

  return next();
};

export default authMiddlewar;
