import { Connection, createConnection, Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from "typeorm";

interface IEntityTickerClass  {
    ttamp?: number
    price?: number
}

function createEntity(tableName: string): Function {
    @Entity({ name: tableName })
    class EntityTickerClass implements IEntityTickerClass {
        public static tableName = tableName;

        @PrimaryGeneratedColumn()
        id: number

        @PrimaryColumn()
        ttamp: number

        @Column({ type: 'float8' })
        price: number
    }
    return EntityTickerClass;
}

class ConnectionService {
    public static connections: Map<any, Promise<Connection>> = new Map();

    public static async getConnection(entityType: object) {
        const key = entityType;
        if (!ConnectionService.connections.has(key)) {
            const tableName = (entityType as any).tableName;
            const name = `table:${tableName}`;
            const connection = createConnection({
                type: 'postgres',
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                port: Number(process.env.POSTGRES_PORT),
                host: process.env.POSTGRES_HOST,
                database: process.env.POSTGRES_DATABASE,
                name: name,
                entities: [entityType] as any,
                synchronize: true,
            });
            ConnectionService.connections.set(key, connection);
        }
        return ConnectionService.connections.get(key) as Promise<Connection>;
    }
}

export { createEntity, ConnectionService, IEntityTickerClass };