import { 
    BeforeSoftRemove,
    Column, 
    Entity, 
    PrimaryGeneratedColumn 
} from "typeorm";

@Entity("cars")
class Car {

    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({ length: 50 })
    brand: string

    @Column({ length: 120 })
    model: string

    @Column({ type: "int" })
    year: number

    @Column({ type: "int" })
    fuel: number

    @Column({ type: "int" })
    km: number

    @Column({ length: 50 })
    color: string

    @Column({ type: "int"})
    fipePrice: number

    @Column({ type: "int"})
    sellPrice: number

    @Column({ type: "text" })
    description: string

    @Column({ type: "boolean", default: true })
    isActive: boolean
    
}

export {
    Car
}