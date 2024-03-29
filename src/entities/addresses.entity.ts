import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

@Entity("address")
class Address {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({length: 9})
    cep: string

    @Column({length: 50})
    estate: string

    @Column({length: 50})
    city: string

    @Column({length: 50})
    street: string

    @Column({length: 7})
    number: string

    @Column()
    complement: string

    @OneToOne(() => User, (user)=> user.address)

    user: User;
}

export { Address }