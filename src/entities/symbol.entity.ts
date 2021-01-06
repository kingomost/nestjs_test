import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('symbol')
class Symbol {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    coingeckoId: string

    @Column({ unique: true })
    symbol: string

    @Column({ unique: true })
    name: string

    @Column({ default: 0 })
    priority: number

    @Column({ default: true })
    isActive: boolean

    @Column({ default: null })
    tickTableName: string

    @Column({ default: null })
    loadedFromTtamp: number

    @Column({ default: null })
    loadedToTtamp: number

    @Column({ default: 0 })
    lastTicksRequestTtamp: number

    @Column({ default: null })
    logo?: string

    @Column({ default: null })
    homepage?: string

    @Column({ type: 'text', default: null })
    description: string
}

export { Symbol };