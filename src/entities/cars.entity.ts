import { 
    BeforeSoftRemove,
    Column, 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";
import { User } from "./users.entity";

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

    @Column({ length: 50 })
    fuel: string

    @Column({ length: 7 })
    km: string

    @Column({ length: 50 })
    color: string

    @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
    fipePrice: number | string

    @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
    sellPrice: number

    @Column({ type: "text" })
    description: string

    @Column({ type: "boolean", default: true })
    isActive: boolean
    
    @BeforeSoftRemove()
    updateStatus() {
        this.isActive = false
    }

    @ManyToOne(() => User, (user)=> user.cars)
    owner: User
}

export {
    Car
}