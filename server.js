const express = require('express');
const app = express();
app.use(express.json());

// Simulation d'une base de données de clés
const database = {
    "DONUT-AAAA-BBBB-CCCC": { active: true, hwid: null },
    "DONUT-XXXX-YYYY-ZZZZ": { active: true, hwid: null }
};

app.get('/verify', (req, res) => {
    const key = req.query.key;
    const uuid = req.query.uuid;

    if (!key || !database[key]) {
        return res.status(403).send("INVALID");
    }
    if (!database[key].active) {
        return res.status(403).send("EXPIRED");
    }
    if (database[key].hwid === null) {
        database[key].hwid = uuid;
    } else if (database[key].hwid !== uuid) {
        return res.status(403).send("ALREADY_USED");
    }
    res.send("VALID");
});

// Utilise le port fourni par l'hébergeur ou le port 3000 par défaut
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Serveur actif sur le port " + PORT));