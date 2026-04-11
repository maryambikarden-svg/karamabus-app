const express = require('express');
const app = express();
const path = require('path');

// Permet au serveur de lire les fichiers (HTML, JSON, etc.) à la racine
app.use(express.static(__dirname));
app.use(express.json());

// ROUTE 1 : Envoie l'interface visuelle (ton index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ROUTE 2 : Envoie les données des bus à l'interface
app.get('/api/trajets', (req, res) => {
    res.json([
        { ligne: "Ligne 01", itineraire: "Riad Salam - EST" },
        { ligne: "Ligne 17", itineraire: "Beni Mellal - Kasba Tadla" },
        { ligne: "Ligne 14", itineraire: "Beni Mellal - Foum Oudi" },
        { ligne: "Ligne 06", itineraire: "Centre Ville - Université Mghila" }
    ]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur prêt sur le port ${PORT}`));
