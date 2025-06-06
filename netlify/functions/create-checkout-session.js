import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Méthode non autorisée' }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: 'price_1RVSxpDcigxHe4yWeeGtJNoz',
          quantity: 1
        }
      ],
      success_url: 'https://temps-cuisson-air-fryer.netlify.app/success',
      cancel_url: 'https://temps-cuisson-air-fryer.netlify.app/cancel'
    })

    const userData = JSON.parse(event.body);
    const tokenResponse = await fetch('/.netlify/functions/createToken', {
      method: 'POST',
      body: JSON.stringify({
        ua: userData.ua
      })
    });

    const { token } = await tokenResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        url: session.url,
        token: token
      })
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    }
  }
}
