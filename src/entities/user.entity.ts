import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    slug: string

    @Column()
    name: string

    @Column()
    passHash: string

    @Column({ default: true })
    isActive: boolean
}