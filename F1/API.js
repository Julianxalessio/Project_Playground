async function fetchLiveData() {
    try {
        // Daten direkt von der OpenF1 API abrufen
        const [
            intervalData, positionData, carData, driverData, lapData, tyreData, raceData
        ] = await Promise.all([
            fetch('https://api.openf1.org/v1/intervals').then(res => res.json()),
            fetch('https://api.openf1.org/v1/position').then(res => res.json()),
            fetch('https://api.openf1.org/v1/car_data').then(res => res.json()),
            fetch('https://api.openf1.org/v1/drivers').then(res => res.json()),
            fetch('https://api.openf1.org/v1/laps').then(res => res.json()),
            fetch('https://api.openf1.org/v1/tyres').then(res => res.json()),
            fetch('https://api.openf1.org/v1/races').then(res => res.json())
        ]);

        const lap = lapData[0]?.lap_number ?? 0;
        const maxLaps = lapData[0]?.lap_max ?? 0;

        let output = "<h2>Aktueller Rennstand:</h2><div>";
        output += `<h3>Lap: ${lap}/${maxLaps}</h3>`;

        positionData.forEach((driver, index) => {
            const position = index + 1;
            const driverInfo = driverData.find(d => d.driver_number === driver.driver_number) ?? {};
            const driverName = driverInfo.driver_name ?? "Unbekannt";
            const teamName = driverInfo.team_name ?? "Unbekannt";

            const tyreInfo = tyreData.find(d => d.driver_number === driver.driver_number) ?? {};
            const tyreType = tyreInfo.type ?? "Unbekannt";
            const tyreAge = tyreInfo.age ?? 0;

            const pitStatus = driver.location === "PIT" ? "🔴 In der Box" : "🏎️ Auf der Strecke";

            const interval = intervalData.find(d => d.driver_number === driver.driver_number) ?? {};
            const gap = interval.interval_value ?? "Interval";

            const carInfo = carData.find(d => d.driver_number === driver.driver_number) ?? {};
            const drsStatus = carInfo.drs_status ? "Aktiv" : "Inaktiv";
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
}
