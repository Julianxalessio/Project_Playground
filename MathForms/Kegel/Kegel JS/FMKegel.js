function SubmitGR() {
    let Grundfläche = document.getElementById("G").value.trim();
    let EinsRadius = document.getElementById("ER").value.trim();

    let leereFelder = 0;
    if (Grundfläche === "") leereFelder++;
    if (EinsRadius === "") leereFelder++;


    if (leereFelder > 1) {
        alert("Es gibt zu viele Unbekannte!");
    } else if (Grundfläche === "") {
        let ErgebnisGR = Math.PI * (parseFloat(EinsRadius) * parseFloat(EinsRadius));
        document.getElementById("G").value = ErgebnisGR.toFixed(2); // Auf zwei Dezimalstellen gerundet
    } else if (EinsRadius === "") {
        let ErgebnisGR = Math.sqrt(parseFloat(Grundfläche / Math.PI));
        document.getElementById("ER").value = ErgebnisGR.toFixed(2);
    }

}

function SubmitUR() {
    let Umfang = document.getElementById("U").value.trim();
    let ZweiRadius = document.getElementById("ZR").value.trim();

    let leereFelder = 0;
    if (Umfang === "") leereFelder++;
    if (ZweiRadius === "") leereFelder++;


    if (leereFelder > 1) {
        alert("Es gibt zu viele Unbekannte!");
    } else if (Umfang === "") {
        let ErgebnisUR = (parseFloat(2) * parseFloat(ZweiRadius)) * Math.PI;
        document.getElementById("U").value = ErgebnisUR.toFixed(2); // Auf zwei Dezimalstellen gerundet
    } else if (ZweiRadius === "") {
        let ErgebnisUR = parseFloat(Umfang) / Math.PI / 2;
        document.getElementById("ZR").value = ErgebnisUR.toFixed(2);
    }

}

function SubmitMRS() {
    let DreiRadius = document.getElementById("DR").value.trim();
    let Mantelfläche = document.getElementById("M").value.trim();
    let HöheS = document.getElementById("S").value.trim();


    let leereFelder = 0;
    if (DreiRadius === "") leereFelder++;
    if (Mantelfläche === "") leereFelder++;
    if (HöheS === "") leereFelder++;

    if (leereFelder > 1) {
        alert("Es gibt zu viele Unbekannte!");
    } else if (DreiRadius === "") {
        let ErgebnisMRS = parseFloat(Mantelfläche) / Math.PI / parseFloat(HöheS);
        document.getElementById("DR").value = ErgebnisMRS.toFixed(2); // Auf zwei Dezimalstellen gerundet
    } else if (Mantelfläche === "") {
        let ErgebnisMRS = parseFloat(DreiRadius) * Math.PI * parseFloat(HöheS);
        document.getElementById("M").value = ErgebnisMRS.toFixed(2);
    } else if (HöheS === "") {
        let ErgebnisMRS = parseFloat(Mantelfläche) / Math.PI / parseFloat(DreiRadius);
        document.getElementById("S").value = ErgebnisMRS.toFixed(2);
    }

}

function SubmitVGH() {
    let Volumen = document.getElementById("V").value.trim();
    let ZweiGrundfläche = document.getElementById("ZG").value.trim();
    let Höhe = document.getElementById("H").value.trim();

    let leereFelder = 0;
    if (Volumen === "") leereFelder++;
    if (ZweiGrundfläche === "") leereFelder++;
    if (Höhe === "") leereFelder++;


    if (leereFelder > 1) {
        alert("Es gibt zu viele Unbekannte!");
    } else if (Volumen === "") {
        let ErgebnisVGH = parseFloat(ZweiGrundfläche) * parseFloat(Höhe) / 3;
        document.getElementById("V").value = ErgebnisVGH.toFixed(2);
    } else if (ZweiGrundfläche === "") {
        let ErgebnisVGH = parseFloat(Volumen) * 3 / parseFloat(Höhe);
        document.getElementById("ZG").value = ErgebnisVGH.toFixed(2);
    } else if (Höhe === "") {
        let ErgebnisVGH = parseFloat(Volumen) * 3 / parseFloat(ZweiGrundfläche);
        document.getElementById("H").value = ErgebnisVGH.toFixed(2);
    }

}

function SubmitAlpha() {
    let Alpha = document.getElementById("A").value.trim();
    let VierRadius = document.getElementById("VR").value.trim();
    let ZweiHöheS = document.getElementById("ZS").value.trim();


    let leereFelder = 0;
    if (Alpha === "") leereFelder++;
    if (VierRadius === "") leereFelder++;
    if (ZweiHöheS === "") leereFelder++;


    if (leereFelder > 1) {
        alert("Es gibt zu viele Unbekannte!");
    } else if (Alpha === "") {
        let ErgebnisA = (parseFloat(VierRadius) * 360) / parseFloat(ZweiHöheS);
                document.getElementById("A").value = ErgebnisA.toFixed(2); // Auf zwei Dezimalstellen gerundet
    } else if (VierRadius === "") {
        let ErgebnisA = parseFloat(Alpha) / 360 * parseFloat(ZweiHöheS);
        document.getElementById("VR").value = ErgebnisA.toFixed(2);
    } else if (ZweiHöheS === "") {
        let ErgebnisA = (parseFloat(VierRadius) * 360) / parseFloat(Alpha);
        document.getElementById("ZS").value = ErgebnisA.toFixed(2);
    }
}