import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/users.routes.js'
import booksRoutes from './routes/books.routes.js'
import bookItemsRoutes from './routes/bookItems.routes.js'
import buybacksRoutes from './routes/buybacks.routes.js'
import adminBuybacksRoutes from './routes/admin.buybacks.routes.js'
import adminBooksRoutes from './routes/admin.books.routes.js'
import adminBookItemsRoutes from './routes/admin.bookItems.routes.js'
import ordersRoutes from './routes/orders.routes.js'
import adminOrdersRoutes from './routes/admin.orders.routes.js'
import paymentsRoutes from './routes/payments.routes.js'

import './config/db.js'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/books', booksRoutes)
app.use('/book-items', bookItemsRoutes)
app.use('/buybacks', buybacksRoutes)
app.use('/admin/buybacks', adminBuybacksRoutes)
app.use('/admin/books', adminBooksRoutes)
app.use('/admin/book-items', adminBookItemsRoutes)
app.use('/orders', ordersRoutes)
app.use('/admin/orders', adminOrdersRoutes)
app.use('/payments', paymentsRoutes)

app.get('/', (req, res) => {
  res.send('API Chapitre 2')
})

export default app

