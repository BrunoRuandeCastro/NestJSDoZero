module.exports = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'coursenestjs',
    entities: ['dist/**/*.entity.js'],
    //entities e migration apontam para a dist pois é visto os arquivos que são compilados
    migrations: ['dist/migrations/*.js'],
    cli: {
        migrationsDir: 'src/migrations'
    },
}