document.getElementById("GR").addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        SubmitGR();
    }
    if (event.ctrlKey && event.key === "d") {
        event.preventDefault();
        document.getElementById("G").value = ""; // Eingabefeld leeren
        document.getElementById("ER").value = ""; // Eingabefeld leeren
    }
});
document.getElementById("UR").addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        SubmitUR();
    }
    if (event.ctrlKey && event.key === "d") {
        event.preventDefault();
        document.getElementById("R").value = ""; // Eingabefeld leeren
        document.getElementById("ZU").value = ""; // Eingabefeld leeren
    }
});
document.getElementById("MRS").addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        SubmitMRS();
    }
    if (event.ctrlKey && event.key === "d") {
        event.preventDefault();
        document.getElementById("DR").value = ""; // Eingabefeld leeren
        document.getElementById("M").value = ""; // Eingabefeld leeren
        document.getElementById("S").value = ""; // Eingabefeld leeren
    }
});
document.getElementById("VGH").addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        SubmitVGH();
    }
    if (event.ctrlKey && event.key === "d") {
        event.preventDefault();
        document.getElementById("V").value = ""; // Eingabefeld leeren
        document.getElementById("ZG").value = ""; // Eingabefeld leeren
        document.getElementById("H").value = ""; // Eingabefeld leeren
    }
});
document.getElementById("Alpha").addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        SubmitAlpha();
    }
    if (event.ctrlKey && event.key === "d") {
        event.preventDefault();
        document.getElementById("A").value = ""; // Eingabefeld leeren
        document.getElementById("VR").value = ""; // Eingabefeld leeren
        document.getElementById("ZS").value = ""; // Eingabefeld leeren
    }
});