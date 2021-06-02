import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    JoinColumn,
    BeforeInsert,
    BeforeUpdate
} from "typeorm";

import Enderecos from './Enderecos';
import bcrypt from 'bcryptjs';

@Entity("users")
export default class User {
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    nome: string;

    @Column()
    telefone: string;

    @Column()
    email: string;

    @Column()
    idade: number;

    @Column()
    password: string;

    @Column()
    peso: number;

    @Column()
    etinia: number;

    @OneToMany(() => Enderecos, enderecos => enderecos.users, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'user_id' })
    enderecos: Enderecos;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 4);
    }

}