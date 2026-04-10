const express = require('express');
const app = express();
app.use(express.static('public'));

app.use(express.json());

// Route d'accueil
app.get('/', (req, res) => {
    res.send("<h1>Karamabus Beni Mellal</h1><p>Le serveur est en ligne !</p>");
});

// Liste des trajets simplifiée
app.get('/api/trajets', (req, res) => {
    res.json([
        { ligne: "Ligne 01", itineraire: "Riad Salam - Ecole Superiure de Technologie" },
        { ligne: "Ligne 17", itineraire: "Beni Mellal - Kasba Tadla" },
        { ligne: "Ligne 14", itineraire: "Beni Mellal - Foum Oudi" },
        { ligne: "Ligne 25", itineraire: "Agropole - M'ghila" },
        { ligne: "Ligne 16", itineraire: "Beni Mellal - Igherm Laalam" },
        { ligne: "Ligne 24", itineraire: "Ait Tisslit - M'ghila" },
        { ligne: "Ligne 13", itineraire: "Beni Mellal - Afourer" },
        { ligne: "Ligne 07", itineraire: "Beni Mellal - Ouled Ismail" },
        { ligne: "Ligne 18", itineraire: "Beni Mellal - Elksibah" },
        { ligne: "Ligne 19", itineraire: "Beni Mellal - El Fkih Ben Salah" },
        { ligne: "Ligne 02", itineraire: "Beni Mellal - Kssar Daroua" },
        { ligne: "Ligne 12", itineraire: "Beni Mellal - Ouled Nader" },
        { ligne: "Ligne 10", itineraire: "Beni Mellal - Takhmisst" },
        { ligne: "Ligne 09", itineraire: "Beni Mellal - Tanferda" },
        { ligne: "Ligne 26", itineraire: "Beni Mellal - Zaouiat Cheikh - Oum Elbekht" },
        { ligne: "Ligne 22", itineraire: "Beni Mellal - Ouled Ayad" },
        { ligne: "Ligne 08", itineraire: "Feryata - Ourbie" },
        { ligne: "Ligne 15", itineraire: "Beni Mellal - Timoulit" },
        { ligne: "Ligne 04", itineraire: "Beni Mellal - Elhlalma" },
        { ligne: "Ligne 03", itineraire: "Beni Mellal - Foum El Anceur - Igherm Laalam" },
    ]);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});