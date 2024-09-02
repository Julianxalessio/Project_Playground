//Variablen
let OnebOpen = 0;
let TwobOpen = 0;
let ThreebOpen = 0;
let GateNumber = 0;
let KeyCollected = false;

//Test Branches


//Functions für Fragen
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function FrageRichtig() {
    Rechnung.textContent = " ";
    TryOQ = 3;
    Infos.textContent = "Leben: " + Lives + " Versuche: " + TryOQ;
    Gate1b.style.display = 'none';
    Gate2b.style.display = 'none';
    Gate3b.style.display = 'none';

    const gateElement = document.getElementById(`Gate${GateNumber}`);
    if (gateElement) {
        gateElement.style.display = 'none';
    }
}

function getDataById(id) {
    const storedData = JSON.parse(localStorage.getItem('quizData'));
    return storedData.find(item => item.id === id);
}

function FrageFalsch() {
    TryOQ -= 1;
    Infos.textContent = "Leben: " + Lives + " Versuche: " + TryOQ;
    if (TryOQ === 0) {
        Lives -= 1;
        TryOQ = 3;
        Infos.textContent = "Leben: " + Lives + " Versuche: " + TryOQ;
        document.documentElement.style.setProperty('--top', '65px');
        document.documentElement.style.setProperty('--left', '600px');

        //Alle Tore werden zurückgesetzt
        Gate1b.style.display = 'none';
        OnebOpen = 0;
    }
}

function check() {
    const PlayerAntwort = document.getElementById("Answer").value.trim().toLowerCase(); // Eingabe des Benutzers in Kleinbuchstaben umwandeln und Leerzeichen entfernen
    const CheckAntwort = dataById.antwort; // Antwortmöglichkeiten abrufen
    document.getElementById("Answer").value = ""; // Eingabefeld leeren

    console.log(PlayerAntwort);

    if (Array.isArray(CheckAntwort)) {
        // Wenn CheckAntwort ein Array ist
        if (CheckAntwort.some(answer => answer.toLowerCase() === PlayerAntwort)) {
            console.log("Richtige Antwort!");
            FrageRichtig();
        } else {
            console.log("Falsche Antwort!");
            FrageFalsch();
        }
    } else {
        // Wenn CheckAntwort eine einzelne Antwort ist
        if (CheckAntwort.toLowerCase() === PlayerAntwort) {
            console.log("Richtige Antwort!");
            FrageRichtig();
        } else {
            console.log("Falsche Antwort!");
            FrageFalsch();
        }
    }
}

function neueFrage() {
    const randomNum = getRandomInt(1, 300);
    dataById = getDataById(randomNum);
    if (dataById) {
        const frage = dataById.frage;
        Rechnung.textContent = frage;
    }
}

function CheckQuestion() {
    const currentTopCQ = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--top'));
    const currentLeftCQ = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--left'));

    if (currentTopCQ == 65 && currentLeftCQ == 390) {
        if (OnebOpen == 0) {
            Gate1b.style.display = 'block';
            neueFrage();
        }
        GateNumber = 1;
        OnebOpen = 1;

    }
    if (currentTopCQ == 590 && currentLeftCQ == 540) {
        if (TwobOpen == 0) {
            Gate2b.style.display = 'block';
            neueFrage();
        }
        GateNumber = 2;
        TwobOpen = 1;

    }
    if (currentTopCQ == 515 && currentLeftCQ == 915) {
        if (ThreebOpen == 0) {
            Gate3b.style.display = 'block';
            neueFrage();
        }
        GateNumber = 3;
        ThreebOpen = 1;

    }
    //TP
    if (currentTopCQ >= 215 && currentTopCQ <= 290) {
        if (currentLeftCQ >= 540 && currentLeftCQ <= 615) {
            Key.style.display = 'none';
            SignKey.style.display = 'block';
            KeyCollected = true;

        }
    }
    //KeyDoor
    if (KeyCollected == true) {
        if (currentLeftCQ == 390) {
            if (currentTopCQ == 740) {
                KeyDoor.style.display = 'none';
                SignKey.style.display = 'none';
            }
        }
    }
}




//Functions für Hitbox

//Player Hitbox
function getRect(element) {
    return element.getBoundingClientRect();
}

function getReducedRect(element) {
    const rect = getRect(element);
    return {
        top: rect.top + blockPadding,
        bottom: rect.bottom - blockPadding - 10,
        left: rect.left + blockPadding + 10,
        right: rect.right - blockPadding - 10
    };
}

function checkCollision(player, blocks, gates) {
    const playerRect = getRect(player);

    // Combine both walls and gates into one array
    const allBlocks = [...blocks, ...gates];

    for (let block of allBlocks) {
        const blockRect = getReducedRect(block);

        if (
            playerRect.top <= blockRect.bottom && playerRect.bottom > blockRect.top &&
            playerRect.right > blockRect.left && playerRect.left < blockRect.right
        ) {
            return true;
        }
    }
    return false;
}


//Functions für Movement Player
function movePlayer(direction) {
    const player = document.getElementById('Player');
    const walls = document.getElementsByClassName('Walls');
    const gates = document.getElementsByClassName('Gates');
    const currentTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--top'));
    const currentLeft = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--left'));

    CheckQuestion();

    let newTop = currentTop;
    let newLeft = currentLeft;

    switch (direction) {
        case 'up':
            newTop -= 15;
            break;
        case 'down':
            newTop += 15;
            break;
        case 'left':
            newLeft -= 15;
            document.documentElement.style.setProperty('--transform', 'scaleX(-1)');
            break;
        case 'right':
            newLeft += 15;
            document.documentElement.style.setProperty('--transform', 'scaleX(1)');
            break;
    }

    document.documentElement.style.setProperty('--top', `${newTop}px`);
    document.documentElement.style.setProperty('--left', `${newLeft}px`);

    // Check for collision with both walls and gates
    const collision = checkCollision(player, walls, gates);

    if (collision) {
        // Revert to the previous position if there's a collision
        document.documentElement.style.setProperty('--top', `${currentTop}px`);
        document.documentElement.style.setProperty('--left', `${currentLeft}px`);
    }

}

document.addEventListener('keydown', function (event) {
    switch (event.key.toLowerCase()) {
        case 'w':
            movePlayer('up');
            break;
        case 'a':
            movePlayer('left');
            break;
        case 's':
            movePlayer('down');
            break;
        case 'd':
            movePlayer('right');
            break;
    }
});