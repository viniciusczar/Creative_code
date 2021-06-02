import { Request, Response } from 'express'; 
import { getRepository } from 'typeorm';
import User from '../models/User';
import * as Yup from 'yup';

export default {

    async index(request: Request, response: Response) {
        const userRepository = getRepository(User);

        try {
            const {
                nome,
                telefone,
                email,
                idade,
                peso,
                etinia,
                password
            } = request.body;

            const data = {
                nome,
                telefone,
                email,
                idade,
                peso,
                etinia,
                password
            };
    
            if(!data.email.indexOf('@' && '.com')){
                return response.status(401).json("Por favor, insira um e-mail válido")
            }
            const schema = Yup.object().shape({
                nome: Yup.string().required(),
                telefone: Yup.string().required(),
                email: Yup.string().required(),
                idade: Yup.number().required(),
                peso: Yup.number().required(),
                etinia: Yup.number().required(),
                password: Yup.string().required()
            });
            await schema.validate(data, {
                abortEarly: false
            });
    
            const user = userRepository.create(data);
            await userRepository.save(user);
            return response.status(201).json(user);
        }

        catch(error) {
            return response.status(401).json('Verifique seus dados de entrada e tente novamente!');
        }
        
    },
    async listener (request: Request, response: Response) {
        const userRepository = getRepository(User);
        
        try{
            const users = await userRepository.find();

            return response.json(users);

        }catch(error){
            return response.status(401).json('Tente novamente')
        }
    },

    async show (request: Request, response: Response) {
        const userRepository = getRepository(User);
        const { id } = request.params;
        try{
            const users = await userRepository.findOneOrFail(id);

            return response.json(users);

        }catch(error){
            return response.status(401).json('Tente novamente')
        }
    },

    async deleted (request: Request, response: Response) {
        const userRepository = getRepository(User);
        const { id } = request.params;

        try{
            await userRepository.delete(id);

            return response.json('Deletado');

        }catch(error){
            return response.status(401).json('Tente novamente')
        }

    },

    async updated (request: Request, response: Response) {
        const userRepository = getRepository(User);

        try{
            const {
                nome,
                telefone,
                email,
                idade,
                peso,
                etinia,
                id
            } = request.body;

            const data = {
                nome,
                telefone,
                email,
                idade,
                peso,
                etinia,
                id
            };

            console.log(data)
    
            if(!data.email.indexOf('@' && '.com')){
                return response.status(401).json("Por favor, insira um e-mail válido")
            }
            const schema = Yup.object().shape({
                nome: Yup.string().required(),
                telefone: Yup.string().required(),
                email: Yup.string().required(),
                idade: Yup.number().required(),
                peso: Yup.number().required(),
                etinia: Yup.number().required()
            });
            await schema.validate(data, {
                abortEarly: false
            });

            await userRepository.update(data.id, {
                nome: nome,
                telefone: telefone,
                email: email,
                idade: idade,
                peso: peso,
                etinia: etinia,
                id: id
            });
            return response.json('Atualizado!');

        }catch(error){
            return response.status(401).json('Tente novamente')
        }
    }

}