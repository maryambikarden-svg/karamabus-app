const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname));
app.use(express.json());

// Route d'accueil : C'est ici qu'on envoie ton fichier HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Liste des trajets pour l'application
app.get('/api/trajets', (req, res) => {
    res.json([
        { ligne: "Ligne 01", itineraire: "Riad Salam - Ecole Superieure de Technologie" },
        { ligne: "Ligne 17", itineraire: "Beni Mellal - Kasba Tadla" },
        { ligne: "Ligne 14", itineraire: "Beni Mellal - Foum Oudi" }
    ]);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur prêt sur le port ${PORT}`));
