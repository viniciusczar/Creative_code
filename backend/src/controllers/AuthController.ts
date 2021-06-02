import { Request, Response } from 'express'; 
import { getRepository } from 'typeorm';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
    async autenticate(request: Request, response: Response) {
        const repository = getRepository(User);
        const {
            email,
            password
        } = request.body;

        const user = await repository.findOne({ where: {email}});

        if(!user) {
            return response.status(401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return response.status(401);
        }

        const token = jwt.sign({ id: user.id }, 'segredo', {expiresIn: '1d'});

        return response.status(201).json({user, token})
        
    }
}
