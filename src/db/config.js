let database = {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'somewordpress',
        database: process.env.DB_DATABASE || 'wordpress',
        host: process.env.DB_HOST || 'localhost'
}

module.exports ={
    database
    
}