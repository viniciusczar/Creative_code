import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import User from './User';


@Entity("enderecos")
export default class Enderecos {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    rua: string;

    @Column()
    numero: number;

    @Column()
    complemento: string;

    @Column()
    cep: string;

    @Column()
    cidade: string;

    @Column()
    estado: string;

    @ManyToOne(() => User, users => users.enderecos, {
        cascade:['insert', 'update']
    })
    @JoinColumn({ name: 'user_id' })
    users: User;

}