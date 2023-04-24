/* eslint-disable prettier/prettier */
import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import { User } from './User';

@Entity({ name: 'user_post' })
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string

    @ManyToOne(() => User, (user) => user.posts)
    user: User;
}