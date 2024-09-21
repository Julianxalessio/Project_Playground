var Close = document.createElement("button");
    Close.id = "closeButton"; // Neu hinzugefügte ID für die Positionierung
    Close.innerHTML = "Close";
    document.body.appendChild(Close);
    Close.onclick = Closer;

function Closer() {
    window.location.replace("../Hauptseite.html");
}