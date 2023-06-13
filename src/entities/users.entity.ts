import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./cars.entity";
import { getRounds, hashSync } from "bcryptjs";


@Entity("user")
class User{ 

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({length: 120})
    name: string

    @Column({length: 120, unique: true})
    email: string 

    @Column({length:11, unique: true})
    cpf: string 

    @Column({length:11})
    phone: string 

    @Column({type:"date"})
    birthDate: Date

    @Column({})
    description: string 

    @Column({default: false})
    admin: boolean

    @Column({length:120})
    password: string

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        const isIncrypted = getRounds(this.password)
        if(!isIncrypted){
            this.password = hashSync(this.password, 10)
        }
    }

    @OneToMany(() => Car, (car)=> car.owner )
    cars: Car[]
}


export { 
    User
}
