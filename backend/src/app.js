import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/users.routes.js'
import booksRoutes from './routes/books.routes.js'
import bookItemsRoutes from './routes/bookItems.routes.js'

import './config/db.js'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/books', booksRoutes)
app.use('/book-items', bookItemsRoutes)

app.get('/', (req, res) => {
  res.send('API Chapitre 2')
})

export default app
