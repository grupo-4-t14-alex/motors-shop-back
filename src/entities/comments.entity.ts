import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";
import { Car } from "./cars.entity";


@Entity("comments")
class Comment {
    @PrimaryGeneratedColumn()
    id: string

    @ManyToOne(() => User, (user) => user.comment)
    user_id: User

    @ManyToOne(() => Car, (car) => car.comments)
    car_id: Car

    @Column()
    comment: string

    @CreateDateColumn({ type: 'date'})
    createdAt: string;
}

export { Comment }