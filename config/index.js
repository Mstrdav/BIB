module.exports = {
    port: process.env.PORT || 3000,
    instance: process.env.INSTANCE || 'localhost',
    version: process.env.VERSION || '0.0.1',
    software: process.env.SOFTWARE || 'Node.js',
    contact: process.env.CONTACT || 'admin@localhost',
    description: process.env.DESCRIPTION || 'BIB is a selfhosted tool that enables communities to creates shared libraries for books, games or any objects.',
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || 'api'
    }
};