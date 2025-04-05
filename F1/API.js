async function fetchLiveData() {
    try {
        // Funktion zur sicheren Verarbeitung von JSON-Antworten
        const checkAndParse = async (res) => {
            const contentType = res.headers.get("content-type");
            if (res.ok && contentType && contentType.includes("application/json")) {
                return res.json();
            } else {
                console.error("Ungültige Antwort, kein JSON oder Fehlerstatus:", res.status, await res.text());
                return [];
            }
        };

        // API-Daten abrufen
        const [
            intervalData, positionData, carData, driverData, lapData, tyreData
        ] = await Promise.all([
            fetch('https://api.openf1.org/v1/intervals').then(checkAndParse),
            fetch('https://api.openf1.org/v1/position').then(checkAndParse),
            fetch('https://api.openf1.org/v1/car_data').then(checkAndParse),
            fetch('https://api.openf1.org/v1/drivers').then(checkAndParse),
            fetch('https://api.openf1.org/v1/laps').then(checkAndParse),
            fetch('https://api.openf1.org/v1/tyres').then(checkAndParse),
        ]);

        // Rundeninformationen prüfen
        const lapInfo = lapData[0] ?? {};
        const lap = lapInfo.lap_number ?? 0;
        const maxLaps = lapInfo.lap_max ?? 0;

        let output = "<h2>Aktueller Rennstand:</h2><div>";
        output += `<h3>Lap: ${lap > 0 ? `${lap}/${maxLaps}` : "Keine Rundeninformationen"}</h3>`;

        positionData.forEach((driver, index) => {
            const position = index + 1;
            const driverInfo = driverData?.find(d => d.driver_number === driver.driver_number) ?? {};
            const driverName = driverInfo.driver_name ?? "Unbekannt";
            const teamName = driverInfo.team_name ?? driver.team_name ?? "Unbekannt";

            const tyreInfo = tyreData?.find(d => d.driver_number === driver.driver_number) ?? {};
            const tyreType = tyreInfo.type ?? "Unbekannt";
            const tyreAge = tyreInfo.age ?? 0;

            const pitStatus = driver.location === "PIT" ? "🔴 In der Box" : "🏎️ Auf der Strecke";

            const safetyCarOnTrack = positionData.some(d => d.location === "SAFETY_CAR");

            if (safetyCarOnTrack) {
                output += `<div class="safetycar-alert">🚨 Safety Car ist auf der Strecke!</div>`;
            }

            const interval = intervalData?.find(d => d.driver_number === driver.driver_number) ?? {};
            const gap = interval.interval_value ?? "Interval";

            const carInfo = carData?.find(d => d.driver_number === driver.driver_number) ?? {};
            const drsStatus = carInfo.drs_status === undefined
                ? "Unbekannt"
                : (carInfo.drs_status ? "Aktiv" : "Inaktiv");
            const speed = carInfo.speed ?? "Unbekannt";

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
                    <div class="gap">Abstand: ${gap}</div>
                    <div class="speed">
                        Speed: ${speed} km/h
                    </div>
                    <div class="tyre-info">
                        Reifen: ${tyreType !== "Unbekannt" ? `${tyreType} (${tyreAge} Runden)` : "Keine Daten"}
                    </div>
                </div>`;
        });

        output += "</div>";
        document.getElementById("race-data").innerHTML = output;
    } catch (error) {
        console.error("Fehler beim Abrufen der Renndaten:", error);
        document.getElementById("race-data").innerText = "Fehler beim Laden der Daten.";
    }

    // Automatisches Aktualisieren bei Bedarf aktivieren:
    // setInterval(fetchLiveData, 1500);
}
