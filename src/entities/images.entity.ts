import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./cars.entity";

@Entity("images")
class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 20})
    name: string

    @Column()
    image: string

    @ManyToOne(() => Car, (car) => car.images)
    car: Car
}

export { Image } 