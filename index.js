const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const BUS_FILE = path.join(__dirname, 'bus.json');

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// Créer bus.json s'il n'existe pas
if (!fs.existsSync(BUS_FILE)) {
    const defaultBus = [
        { "id": 1, "ligne": "Ligne 01", "itineraire": "Riad Salam - EST" },
        { "id": 2, "ligne": "Ligne 05", "itineraire": "Centre Ville - Gare" },
        { "id": 3, "ligne": "Ligne 06", "itineraire": "Centre Ville - Université Mghila" },
        { "id": 4, "ligne": "Ligne 14", "itineraire": "Beni Mellal - Foum Oudi" },
        { "id": 5, "ligne": "Ligne 17", "itineraire": "Beni Mellal - Kasba Tadla" }
    ];
    fs.writeFileSync(BUS_FILE, JSON.stringify(defaultBus, null, 2));
    console.log("✓ Fichier bus.json créé");
}

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route API - Récupérer tous les trajets
app.get('/api/trajets', (req, res) => {
    fs.readFile(BUS_FILE, 'utf8', (err, data) => {
        if (err) {
            console.error("Erreur lecture bus.json:", err);
            return res.status(500).json({ error: "Erreur lecture fichier" });
        }
        res.json(JSON.parse(data));
    });
});

// Route API - Ajouter une nouvelle ligne
app.post('/api/trajets', (req, res) => {
    const { ligne, itineraire } = req.body;
    
    if (!ligne || !itineraire) {
        return res.status(400).json({ error: "Données manquantes" });
    }

    fs.readFile(BUS_FILE, 'utf8', (err, data) => {
        let trajets = JSON.parse(data);
        const newId = trajets.length > 0 ? Math.max(...trajets.map(t => t.id)) + 1 : 1;
        trajets.push({ id: newId, ligne, itineraire });
        
        fs.writeFile(BUS_FILE, JSON.stringify(trajets, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Erreur sauvegarde" });
            res.json({ success: true, message: "Ligne ajoutée" });
        });
    });
});

// Route API - Modifier une ligne
app.put('/api/trajets/:id', (req, res) => {
    const { ligne, itineraire } = req.body;
    const id = parseInt(req.params.id);

    fs.readFile(BUS_FILE, 'utf8', (err, data) => {
        let trajets = JSON.parse(data);
        const index = trajets.findIndex(t => t.id === id);
        
        if (index === -1) {
            return res.status(404).json({ error: "Ligne non trouvée" });
        }

        trajets[index] = { id, ligne, itineraire };
        
        fs.writeFile(BUS_FILE, JSON.stringify(trajets, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Erreur sauvegarde" });
            res.json({ success: true, message: "Ligne modifiée" });
        });
    });
});

// Route API - Supprimer une ligne
app.delete('/api/trajets/:id', (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile(BUS_FILE, 'utf8', (err, data) => {
        let trajets = JSON.parse(data);
        trajets = trajets.filter(t => t.id !== id);
        
        fs.writeFile(BUS_FILE, JSON.stringify(trajets, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Erreur sauvegarde" });
            res.json({ success: true, message: "Ligne supprimée" });
        });
    });
});

// Gestion des erreurs 404
app.use((req, res) => {
    res.status(404).json({ error: "Route non trouvée" });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚌 Serveur Karamabus démarré sur http://localhost:${PORT}`);
});
