async function fetchLiveData() {
    try {
        // Simulierte lokale Datenbank (Mock-Daten)
        const data = {
            results: [
                { name: "Max Verstappen", team: "Red Bull Racing", interval: null },
                { name: "Lewis Hamilton", team: "Mercedes", interval: "+10s" },
                { name: "Charles Leclerc", team: "Ferrari", interval: "+1.002s" }
            ]
        };

        const carData = {
            "Max Verstappen": { drsActive: true, speed: 300 },
            "Lewis Hamilton": { drsActive: false, speed: 295 },
            "Charles Leclerc": { drsActive: true, speed: 310 }
        };

        let output = "<h2>Aktueller Rennstand:</h2><div>";

        data.results.forEach((driver, index) => {
            const position = index + 1; // Platzierung hinzufügen
            const driverName = driver.name;
            const teamName = driver.team;

            // Zeitabstand abrufen
            const gap = driver.interval ? driver.interval : "0.0s";

            // Fahrzeugdaten abrufen
            const drsStatus = carData[driverName] ? (carData[driverName].drsActive ? "Aktiv" : "Inaktiv") : "Unbekannt";
            const speed = carData[driverName] ? carData[driverName].speed : "Unbekannt";

            output += `
                <div class="race-item">
                    <div class="driver-info">
                        <span class="position">#${position}</span>
                        <span class="driver-name">${driverName}</span>
                        <span class="team-name">(${teamName})</span>
                    </div>
                    <div class="status ${drsStatus.toLowerCase()}">
                        DRS: ${drsStatus}
                    </div>
                    <div class="gap">${gap}</div>
                    <div class="speed">
                        Speed: ${speed} km/h
                    </div>
                </div>`;
        });

        output += "</div>";
        document.getElementById("race-data").innerHTML = output;
    } catch (error) {
        console.error("Fehler beim Abrufen der Renndaten:", error);
        document.getElementById("race-data").innerText = "Fehler beim Laden der Daten.";
    }
}
