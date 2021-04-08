import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';


interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
    
  const { authorization } = req.headers;
  console.log(authorization)

  if (!authorization) {
    return res.status(401).json({error: "Qualquer coisa"});
  }

  if (!authorization.startsWith('Bearer')) {
    return res.status(401).json({ error: 'Invalid Token' });
  }

  const token = authorization.replace('Bearer', '').trim();



  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!);
    const { id } = data as TokenPayload;
    console.log(id)
    req.userId = id;
    return next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: 'Error during token validation' });
  }
}