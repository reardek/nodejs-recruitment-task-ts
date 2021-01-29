import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from "typeorm";
import { User } from "./User";
@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  title: string;

  @Column()
  released: Date;

  @Column()
  genre: string;

  @Column()
  directory: string;

  @ManyToOne(() => User, (user) => user.movies, {onDelete: "CASCADE"})
  user: User;
}
