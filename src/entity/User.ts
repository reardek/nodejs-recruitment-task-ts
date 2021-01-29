import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Movie } from "./Movie";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  moviesUploaded: number;

  @OneToMany(() => Movie, (movie) => movie.user, {onDelete: "CASCADE"})
  movies: Movie[];
}
