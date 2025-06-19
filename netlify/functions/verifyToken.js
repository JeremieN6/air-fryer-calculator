const fs = require('fs').promises;
const path = require('path');

async function verifyToken(token, userData) {
  const tokensPath = path.join(__dirname, '.netlify', 'tokens.json');

  try {
    const data = await fs.readFile(tokensPath, 'utf8');
    const tokens = JSON.parse(data);

    if (!tokens[token]) {
      return false;
    }

    const tokenData = tokens[token];

    if (Date.now() > tokenData.exp) {
      delete tokens[token];
      await fs.writeFile(tokensPath, JSON.stringify(tokens, null, 2));
      return false;
    }

    if (tokenData.ua !== userData.ua) {
      return false;
    }

    if (userData.ip && tokenData.ip !== 'unknown' && tokenData.ip !== userData.ip) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
    return false;
  }
}

exports.handler = async function (event) {
  const allowedOrigins = [
    'https://sassify.fr',
    'https://temps-cuisson-air-fryer.netlify.app'
  ];
  const origin = event.headers.origin;
  const corsOrigin = allowedOrigins.includes(origin) ? origin : 'null';

  const headers = {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // OPTIONS (preflight CORS)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Méthode non autorisée' }),
    };
  }

  try {
    const { token, ua, ip } = JSON.parse(event.body);

    if (!token || !ua) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Token et User-Agent requis' }),
      };
    }

    const isValid = await verifyToken(token, {
      ua,
      ip: ip || event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown'
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ authorized: isValid }),
    };
  } catch (error) {
    console.error('Erreur:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur lors de la vérification du token' }),
    };
  }
};
