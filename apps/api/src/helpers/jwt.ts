import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY!;

interface PayloadToken {
  email: string;
}

export const createToken = (data: PayloadToken) => {
  const expiresIn = '1h';
  return jwt.sign(data, secretKey, { expiresIn });
};
