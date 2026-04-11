const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Route principale - Servir l'interface HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route API - Retourner les trajets des bus
app.get('/api/trajets', (req, res) => {
    const trajets = [
        { ligne: "Ligne 01", itineraire: "Riad Salam - EST" },
        { ligne: "Ligne 05", itineraire: "Centre Ville - Gare" },
        { ligne: "Ligne 06", itineraire: "Centre Ville - Université Mghila" },
        { ligne: "Ligne 14", itineraire: "Beni Mellal - Foum Oudi" },
        { ligne: "Ligne 17", itineraire: "Beni Mellal - Kasba Tadla" }
    ];
    res.json(trajets);
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée" });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚌 Serveur Karamabus démarré sur http://localhost:${PORT}`);
});
