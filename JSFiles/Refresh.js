var Refresh = document.createElement("button");
    Refresh.id = "Refresh";
    Refresh.innerHTML = "Clear";
    document.body.appendChild(Refresh);
    Refresh.onclick = refresh;

function refresh() {
    location.reload();
}