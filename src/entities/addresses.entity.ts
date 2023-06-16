import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";

@Entity("address")
class Address{
    @PrimaryGeneratedColumn("increment")
    id: number

    @OneToOne(() => User, (user) => user.id)
    user_id: () => User

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
}

export { Address }