import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

import cors from'cors';
app.use(cors()); // Hier wird CORS aktiviert

const baseUrl = 'https://api.openf1.org/v1';

async function fetchDriverData() {
    try {
        const response = await fetch('https://api.openf1.org/v1/drivers');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Fehler beim Abrufen der Fahrer-Daten:', error);
    }
}
fetchDriverData();

// Route für `/api/position`
app.get('/api/position', async (req, res) => {
  console.log('➡️ Anfrage an: /api/position');
  try {
    const apiUrl = `${baseUrl}/position`;
    console.log(`🌍 Hole Daten von OpenF1: ${apiUrl}`);
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`❌ Fehler bei position: Status ${response.status}`);
      return res.status(response.status).json({ error: `Fehler von API: ${response.status}` });
    }

    const data = await response.json();
    console.log(`✅ Erfolgreich geladen: position (${data.length} Einträge)`);
    res.json(data);
  } catch (error) {
    console.error('🔥 Fehler bei /api/position:', error);
    res.status(500).json({ error: 'Serverfehler beim Abrufen der Daten' });
  }
});

// Route für `/api/laps`
app.get('/api/laps', async (req, res) => {
  console.log('➡️ Anfrage an: /api/laps');
  try {
    const apiUrl = `${baseUrl}/laps`;
    console.log(`🌍 Hole Daten von OpenF1: ${apiUrl}`);
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`❌ Fehler bei laps: Status ${response.status}`);
      return res.status(response.status).json({ error: `Fehler von API: ${response.status}` });
    }

    const data = await response.json();
    console.log(`✅ Erfolgreich geladen: laps (${data.length} Einträge)`);
    res.json(data);
  } catch (error) {
    console.error('🔥 Fehler bei /api/laps:', error);
    res.status(500).json({ error: 'Serverfehler beim Abrufen der Daten' });
  }
});

// Route für `/api/car_data`
app.get('/api/car_data', async (req, res) => {
  console.log('➡️ Anfrage an: /api/car_data');
  try {
    const apiUrl = `${baseUrl}/car_data`;
    console.log(`🌍 Hole Daten von OpenF1: ${apiUrl}`);
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`❌ Fehler bei car_data: Status ${response.status}`);
      return res.status(response.status).json({ error: `Fehler von API: ${response.status}` });
    }

    const data = await response.json();
    console.log(`✅ Erfolgreich geladen: car_data (${data.length} Einträge)`);
    res.json(data);
  } catch (error) {
    console.error('🔥 Fehler bei /api/car_data:', error);
    res.status(500).json({ error: 'Serverfehler beim Abrufen der Daten' });
  }
});

// Route für `/api/intervals`
app.get('/api/intervals', async (req, res) => {
  console.log('➡️ Anfrage an: /api/intervals');
  try {
    const apiUrl = `${baseUrl}/intervals`;
    console.log(`🌍 Hole Daten von OpenF1: ${apiUrl}`);
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`❌ Fehler bei intervals: Status ${response.status}`);
      return res.status(response.status).json({ error: `Fehler von API: ${response.status}` });
    }

    const data = await response.json();
    console.log(`✅ Erfolgreich geladen: intervals (${data.length} Einträge)`);
    res.json(data);
  } catch (error) {
    console.error('🔥 Fehler bei /api/intervals:', error);
    res.status(500).json({ error: 'Serverfehler beim Abrufen der Daten' });
  }
});

// Route für `/api/tyre_stints`
app.get('/api/tyre_stints', async (req, res) => {
  console.log('➡️ Anfrage an: /api/tyre_stints');
  try {
    const apiUrl = `${baseUrl}/tyre_stints`;
    console.log(`🌍 Hole Daten von OpenF1: ${apiUrl}`);
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`❌ Fehler bei tyre_stints: Status ${response.status}`);
      return res.status(response.status).json({ error: `Fehler von API: ${response.status}` });
    }

    const data = await response.json();
    console.log(`✅ Erfolgreich geladen: tyre_stints (${data.length} Einträge)`);
    res.json(data);
  } catch (error) {
    console.error('🔥 Fehler bei /api/tyre_stints:', error);
    res.status(500).json({ error: 'Serverfehler beim Abrufen der Daten' });
  }
});

// Route für `/api/race_control`
app.get('/api/race_control', async (req, res) => {
  console.log('➡️ Anfrage an: /api/race_control');
  try {
    const apiUrl = `${baseUrl}/race_control`;
    console.log(`🌍 Hole Daten von OpenF1: ${apiUrl}`);
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`❌ Fehler bei race_control: Status ${response.status}`);
      return res.status(response.status).json({ error: `Fehler von API: ${response.status}` });
    }

    const data = await response.json();
    console.log(`✅ Erfolgreich geladen: race_control (${data.length} Einträge)`);
    res.json(data);
  } catch (error) {
    console.error('🔥 Fehler bei /api/race_control:', error);
    res.status(500).json({ error: 'Serverfehler beim Abrufen der Daten' });
  }
});

console.log("Server startet...");

app.listen(PORT, () => {
    console.log(`✅ Proxy-Server läuft unter http://localhost:${PORT}`);
});

