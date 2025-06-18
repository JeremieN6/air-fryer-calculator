import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function handler(event) {
    const headers = {
    'Access-Control-Allow-Origin': 'https://sassify.fr', // remplacer le domaine par ->  event.headers.origin || '*'  pour autoriser tous les domaines
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: 'Preflight CORS ok',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Méthode non autorisée' };
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1RY1KHDcigxHe4yWLi8bfy2r',
          quantity: 1
        }
      ],
      success_url: 'https://temps-cuisson-air-fryer.netlify.app/success',
      cancel_url: 'https://temps-cuisson-air-fryer.netlify.app/cancel'
      // success_url: 'http://localhost:8888/success',
      // cancel_url: 'http://localhost:8888/cancel'
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url })
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    }
  }
}
