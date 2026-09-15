const express = require('express');
const app = express();

// Permet de lire les données JSON envoyées par ton mod Minecraft
app.use(express.json());

// 1. Page d'accueil : s'affiche quand tu cliques sur ton lien Render dans un navigateur
app.get('/', (req, res) => {
    res.send('Le serveur de licence DonutAutoSell est en ligne !');
});

// 2. Ta liste de clés valides (ta Whitelist)
// C'est ici que tu ajoutes ou supprimes les clés de tes acheteurs/joueurs
const validKeys = [
    "DONUT-PRO-1234-5678",
    "AUTRE-CLE-VALIDE-9999"
];

// 3. Route de vérification contactée par ton mod Minecraft
app.post('/verify', (req, res) => {
    const { key } = req.body;

    // Si aucune clé n'est envoyée dans la requête
    if (!key) {
        return res.status(400).json({ valid: false });
    }

    // Vérifie si la clé est présente dans la liste blanche (whitelist)
    if (validKeys.includes(key)) {
        return res.json({ valid: true });
    } else {
        return res.json({ valid: false });
    }
});

// Démarrage du serveur sur le port attribué par Render ou par défaut sur le port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur actif sur le port ${PORT}`);
});
