import { Request, Response } from 'express'; 
import { getRepository } from 'typeorm';
import * as Yup from 'yup';
import Endereco from '../models/Enderecos';

export default {
    async index (request: Request, response: Response) {
        const enderecoRepository = getRepository(Endereco);

        try {
            const {
                rua,
                numero,
                complemento,
                cep,
                cidade,
                estado,
                user_id
            } = request.body;

        const data = {
                rua,
                numero,
                complemento,
                cep,
                cidade,
                estado,
                user_id
            }
            
        
        const schema = Yup.object().shape({
                rua: Yup.string().required(),
                numero: Yup.number().required(),
                complemento: Yup.string().required(),
                cep: Yup.string().required(),
                cidade: Yup.string().required(),
                estado: Yup.string().required(),
                user_id: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const endereco = enderecoRepository.create(data);
        await enderecoRepository.save(endereco);
        return response.status(201).json(endereco);

        }
        catch(error) {
            return response.status(201).json(error);
        }
    },
    async listener (request: Request, response: Response) {
        const enderecoRepository = getRepository(Endereco);
        
        try{
            const enderecos = await enderecoRepository.find();

            return response.json(enderecos);

        }catch(error){
            return response.status(401).json('Tente novamente')
        }
    },

    async show (request: Request, response: Response) {
        const enderecoRepository = getRepository(Endereco);
        const { id } = request.params;
        try{
            const enderecos = await enderecoRepository.findOneOrFail(id);

            return response.json(enderecos);

        }catch(error){
            return response.status(401).json('Tente novamente')
        }
    },

    async updated (request: Request, response: Response) {
        const enderecoRepository = getRepository(Endereco);

        try {
            const {
                rua,
                numero,
                complemento,
                cep,
                cidade,
                estado,
                user_id
            } = request.body;

        const data = {
                rua,
                numero,
                complemento,
                cep,
                cidade,
                estado,
                user_id
            }
            
        
        const schema = Yup.object().shape({
                rua: Yup.string().required(),
                numero: Yup.number().required(),
                complemento: Yup.string().required(),
                cep: Yup.string().required(),
                cidade: Yup.string().required(),
                estado: Yup.string().required(),
                user_id: Yup.number().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });
        await enderecoRepository.update(data.user_id, {
                rua: rua,
                numero: numero,
                complemento: complemento,
                cep: cep,
                cidade: cep,
                estado: cep,
        });
        return response.status(201).json('Atualizado!');

        }catch (error) {
            return response.status(401).json('Tente novamente')
        }
    },

   async deleted (request: Request, response: Response){
        const enderecoRepository = getRepository(Endereco);
        const { id } = request.params;

        try{
            await enderecoRepository.delete(id);

            return response.json('Deletado');

        }catch(error){
            return response.status(401).json('Tente novamente')
        }
   }

}