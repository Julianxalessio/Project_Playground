function ActivateSafetyCar(){
    if(SafetyCar == false){SafetyCar = true;}
    else {SafetyCar = false;}
}
let SafetyCar = false;  

async function fetchLiveData() {
    try {
        // Simulierte lokale Datenbank (Mock-Daten)
        const data = {
            results: [{
                    name: "Max Verstappen",
                    team: "Red Bull Racing",
                    interval: null,
                    location: "PIT"
                },
                {
                    name: "Lewis Hamilton",
                    team: "Ferrari",
                    interval: "+10s",
                    location: "TRACK"

                },
                {
                    name: "Charles Leclerc",
                    team: "Ferrari",
                    interval: "+1.002s",
                    location: "TRACK"

                }
            ]
        };

        const lapData = {
            lapNumber: 5,
            maxLap: 55
        };

        const tyreData = {
            "Max Verstappen": {
                type: "Soft",
                age: 3
            },
            "Lewis Hamilton": {
                type: "Medium",
                age: 7
            },
            "Charles Leclerc": {
                type: "Hard",
                age: 12
            }
        };


        const carData = {
            "Max Verstappen": {
                drsActive: true,
                speed: 300
            },
            "Lewis Hamilton": {
                drsActive: false,
                speed: 295
            },
            "Charles Leclerc": {
                drsActive: true,
                speed: 310
            }
        };

        const lap = lapData.lapNumber ?? 0;
        const maxLaps = lapData.maxLap ??  0;

        let output = "<h2>Aktueller Rennstand:</h2><div>";
        output += `<h3>Lap: ${lap}/${maxLaps}</h3>`;

        const safetyCarOnTrack = SafetyCar;

        if (safetyCarOnTrack) {
            output += `<div class="safetycar-alert">🚨 Safety Car ist auf der Strecke!</div>`;
        }

        data.results.forEach((driver, index) => {
            const position = index + 1; // Platzierung hinzufügen
            const driverName = driver.name;
            const teamName = driver.team;

            // Zeitabstand abrufen
            const gap = driver.interval ? driver.interval : "Interval";

            // Fahrzeugdaten abrufen
            const drsStatus = carData[driverName] ? (carData[driverName].drsActive ? "Aktiv" : "Inaktiv") : "Unbekannt";
            const speed = carData[driverName] ? carData[driverName].speed : "Unbekannt";

            const pitStatus = driver.location === "PIT" ? "🔴 In der Box" : "🏎️ Auf der Strecke";

            const tyreType = tyreData[driverName] ?.type ?? "Unbekannt";
            const tyreAge = tyreData[driverName] ?.age ?? 0;

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
                    <div class="pit-status">${pitStatus}</div>
                    <div class="gap">${gap}</div>
                    <div class="speed">
                        Speed: ${speed} km/h
                    </div>
                    <div class="tyre-info">
                        Reifen: ${tyreType} (${tyreAge} Runden)
                    </div>
                </div>`;
        });

        output += "</div>";
        document.getElementById("race-data").innerHTML = output;
    } catch (error) {
        console.error("Fehler beim Abrufen der Renndaten:", error);
        document.getElementById("race-data").innerText = "Fehler beim Laden der Daten.";
    }
    setInterval(fetchLiveData, 2000);
}