import {
    BeforeSoftRemove,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./users.entity";
import { Image } from "./images.entity"
import { Comment } from "./comments.entity";

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

    @Column({ type: "int" })
    fipePrice: number

    @Column({ type: "int" })
    sellPrice: number

    @Column({ type: "text" })
    description: string

    @Column({ type: "boolean", default: true })
    isActive: boolean

    @BeforeSoftRemove()
    updateStatus() {
        this.isActive = false
    }

    @ManyToOne(() => User, (user) => user.cars)
    user: User

    @OneToMany(() => Image, (image) => image.car)
    images: Image[]

    @OneToMany(() => Comment, (comment) => comment.car_id)
    comments: Comment[]
}

export {
    Car
}