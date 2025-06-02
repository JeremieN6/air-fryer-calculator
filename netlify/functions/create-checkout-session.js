import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Méthode non autorisée' }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1RVSxpDcigxHe4yWeeGtJNoz', // ← remplace par l'ID de ton abonnement Stripe
          quantity: 1
        }
      ],
      success_url: 'https://temps-cuisson-air-fryer.netlify.app/success',
      cancel_url: 'https://temps-cuisson-air-fryer.netlify.app/cancel'
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url })
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}
