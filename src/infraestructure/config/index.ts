const config = {
  server: {
    port: 3000,
    logger: process.env.NODE_ENV === 'production'
  },
  jwt: {
    secret: process.env.JWT_SECRET
  },
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD
  }
}

export { config }
