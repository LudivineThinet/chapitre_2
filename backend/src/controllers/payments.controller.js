import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createCheckoutSession = async (req, res) => {
  const { items } = req.body

  if (!items || items.length === 0) {
    return res.status(400).json({
      message: 'Items are required'
    })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',

      line_items: items.map((item) => ({
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.title
          },
          unit_amount: Math.round(item.price * 100)
        },
        quantity: item.quantity
      })),

      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel'
    })

    res.json({
      url: session.url
    })
  } catch (error) {
    console.error('Stripe error:', error)

    res.status(500).json({
      message: 'Stripe checkout session failed'
    })
  }
}
