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
        { ligne: "Ligne 02", itineraire: "Beni Mellal - Kssar Daroua" },
        { ligne: "Ligne 03", itineraire: "Beni Mellal - Igherm Laalam" },
        { ligne: "Ligne 04", itineraire: "Beni Mellal - Elhlalma" },
        { ligne: "Ligne 07", itineraire: "Beni Mellal - Ouled Ismail" },
        { ligne: "Ligne 08", itineraire: "Feryata - Ourbie" },
        { ligne: "Ligne 09", itineraire: "Beni Mellal - Tanferda" },
        { ligne: "Ligne 10", itineraire: "Beni Mellal - Takhmisst" },
        { ligne: "Ligne 12", itineraire: "Beni Mellal - Ouled Nader" },
        { ligne: "Ligne 13", itineraire: "Beni Mellal - Afourer" },
        { ligne: "Ligne 14", itineraire: "Beni Mellal - Foum Oudi" },
        { ligne: "Ligne 15", itineraire: "Beni Mellal - Timoulit" },
        { ligne: "Ligne 16", itineraire: "Beni Mellal - Igherm Laalam" },
        { ligne: "Ligne 17", itineraire: "Beni Mellal - Kasba Tadla" },
        { ligne: "Ligne 18", itineraire: "Beni Mellal - Elksibah" },
        { ligne: "Ligne 19", itineraire: "Beni Mellal - Elfkih Ben Salah" },
        { ligne: "Ligne 22", itineraire: "Beni Mellal - Ouled Ayad" },
        { ligne: "Ligne 24", itineraire: "Ait Tisslit - Mghila" },
        { ligne: "Ligne 25", itineraire: "Agropole - Mghila" },
        { ligne: "Ligne 26", itineraire: "Beni Mellal - Oum Elbekht" }
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
