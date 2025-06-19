const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

// Fonction pour générer un token aléatoire
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Fonction pour sauvegarder le token
async function saveToken(token, userData) {
  const tokensPath = path.join(__dirname, '.netlify', 'tokens.json');
  
  try {
    let tokens = {};
    try {
      const data = await fs.readFile(tokensPath, 'utf8');
      tokens = JSON.parse(data);
    } catch (error) {
      // Le fichier n'existe pas encore, on continue avec un objet vide
    }

    tokens[token] = {
      ua: userData.ua,
      ip: userData.ip,
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 heures
    };

    await fs.writeFile(tokensPath, JSON.stringify(tokens, null, 2));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du token:', error);
    return false;
  }
}

exports.handler = async function(event) {
  const allowedOrigins = [
    'https://sassify.fr',
    'https://temps-cuisson-air-fryer.netlify.app'
  ];

  const origin = event.headers.origin;
  const corsOrigin = allowedOrigins.includes(origin) ? origin : 'null';

  const headers = {
    'Access-Control-Allow-Origin': corsOrigin,
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
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Méthode non autorisée' }),
    };
  }

  try {
    const userData = JSON.parse(event.body);
    const token = generateToken();
    
    const saved = await saveToken(token, {
      ua: userData.ua,
      ip: event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'unknown'
    });

    if (!saved) {
      throw new Error('Erreur lors de la sauvegarde du token');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ token })
    };
  } catch (error) {
    console.error('Erreur:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erreur lors de la création du token' })
    };
  }
};
