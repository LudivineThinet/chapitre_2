import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chapitre_2',
  password: 'RenardNoir',
  port: 5432
})




export default pool

