# 🍟 AirFryTime - Calculateur de Temps de Cuisson au Air Fryer

**AirFryTime** est une application web simple et rapide développée avec **Vue.js** et **Tailwind CSS**. Elle permet de déterminer automatiquement le **temps de cuisson optimal d’un aliment au Air Fryer**, en fonction :

- Du type d’aliment (ex. : frites, poulet, légumes…)
- De la quantité (en grammes ou en nombre de pièces)
- De l’état de l’aliment (cru ou congelé)

## 🚀 Site en ligne

> https://temps-cuisson-air-fryer.netlify.app

---

## 🧠 Fonctionnalités

- 🔍 Sélection d’un aliment à partir d’une liste (statique ou dynamique via API)
- 🧊 Option "congelé" ou "cru"
- ⚖️ Saisie de la quantité (g ou nombre de pièces)
- ⏱️ Calcul automatique du **temps de cuisson estimé**
- 📱 Interface responsive, rapide, et épurée

---

## 🛠️ Stack technique

- **Vue.js (Composition API)**
- **Tailwind CSS** pour le style
- **[Optionnel] API d’aliments** pour enrichir dynamiquement la liste
- Stockage local via `localStorage` (si nécessaire)

---

## 📦 Installation

```bash
# Clone du dépôt
git clone https://github.com/ton-utilisateur/airfrytime.git
cd airfrytime

# Installation des dépendances
npm install

# Lancement du serveur de dev
npm run dev


MIT © [Nom : jeremien6 - Email : contact@jeremiecode.fr]
