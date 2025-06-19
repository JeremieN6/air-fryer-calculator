const { OpenAI } = require("openai");
require('dotenv').config({ path: '.env.local' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Liste blanche des domaines autorisés
const allowedOrigins = [
  "https://sassify.fr",
  "https://temps-cuisson-air-fryer.netlify.app"
];

exports.handler = async function(event) {
  const origin = event.headers.origin;

  // Gestion des pré-requêtes CORS (OPTIONS)
  if (event.httpMethod === "OPTIONS") {
    if (allowedOrigins.includes(origin)) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: "",
      };
    } else {
      return {
        statusCode: 403,
        body: "Origin non autorisée",
      };
    }
  }

  try {
    const body = JSON.parse(event.body);

    // Sécurisation des entrées
    const aliment = String(body.aliment || "").trim();
    const poids = String(body.poids || "").trim();
    const quantite = String(body.quantite || "").trim();
    const etat = String(body.etat || "").trim();
    const typeCuisson = String(body.typeCuisson || "").trim();
    const modele = String(body.modele || "").trim();

    let poidsOuQuantite = "";
    if (poids) poidsOuQuantite += ` - Poids : ${poids}`;
    if (quantite) {
      if (poidsOuQuantite !== "") poidsOuQuantite += ", ";
      poidsOuQuantite += ` - Quantité : ${quantite}`;
    }
    if (!poidsOuQuantite) poidsOuQuantite = " - Poids ou Quantité : non spécifié(s)";

    const prompt = `
        Tu es un expert en cuisson avec un air fryer. Voici les caractéristiques :
        - Aliment : ${aliment}
        - Poids : ${poids}
        - Quantité : ${quantite}
        - État : ${etat}
        - Type de cuisson souhaitée : ${typeCuisson}
        - Modèle d'air fryer : ${modele || "non précisé"}

        Donne-moi uniquement ce bloc :
        ---
        Aliment : ${aliment} (${etat})
        Temps de cuisson : XX minutes
        Température : XXX°C
        Préparation : ...
        ---
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Tu es un expert en cuisson avec un air fryer." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ result }),
    };
  } catch (error) {
    console.error("Erreur OpenAI :", error.message);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "Erreur serveur" }),
    };
  }
};
