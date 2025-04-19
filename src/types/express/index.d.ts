

/*
import { Request } from 'express';
import { User } from '../../domain/models/User'; // si tienes una entidad de usuario tipada

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        // puedes agregar más campos si tu token lo trae
        // role?: string;
        // email?: string;
      };
    }
  }
}*/

declare namespace Express {
    export interface Request {
      user: {
        id: string;
        // Puedes agregar más propiedades si las necesitas
        // email?: string;
        // role?: string;
      };
    }
  }