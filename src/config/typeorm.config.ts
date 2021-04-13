import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'democracy4ever',
    autoLoadEntities: true,
    synchronize: true,
}