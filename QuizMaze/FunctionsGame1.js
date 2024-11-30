// Variablen
let OnebOpen = 0;
let TwobOpen = 0;
let ThreebOpen = 0;
let GateNumber = 0;
let KeyCollected = false;
let isEnterPressed = false;
let GameOver = false;
let controllerIndex = null;
let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;
let isControllerActive = false;
let moveTimeout = null;
let isMoving = false;

// Functions für Fragen
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function FrageRichtig() {
    Rechnung.textContent = " ";
    TryOQ = 3;
    Infos.textContent = "Leben: " + Lives + " ||" + " Versuche: " + TryOQ + " ||" + " neue Frage: " + Wechsel;
    Gate1b.style.display = 'none';
    Gate2b.style.display = 'none';
    Gate3b.style.display = 'none';
    document.getElementById("Answer").value = ""; // Eingabefeld leeren

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
    const PlayerAntwortF = document.getElementById("Answer").value.trim().toLowerCase();
    Infos.textContent = "Leben: " + Lives + " ||" + " Versuche: " + TryOQ + " ||" + " neue Frage: " + Wechsel;
    alert(PlayerAntwortF + " ist falsch\n\nRichtig wäre: " + dataById.antwort.join(", "));
    document.getElementById("Answer").value = ""; // Eingabefeld leeren
    neueFrage();

    if (TryOQ === 0) {
        Lives -= 1;
        if (Lives == 0) {
            GameOverF();
        }
        TryOQ = 3;
        Infos.textContent = "Leben: " + Lives + " ||" + " Versuche: " + TryOQ + " ||" + " neue Frage: " + Wechsel;
        document.documentElement.style.setProperty('--top', '65px');
        document.documentElement.style.setProperty('--left', '600px');

        // Alle Tore werden zurückgesetzt
        Gate1b.style.display = 'none';
        OnebOpen = 0;
        Gate2b.style.display = 'none';
        TwobOpen = 0;
        Gate3b.style.display = 'none';
        OnebOpen = 0;
        Gate1.style.display = 'block';
        Gate2.style.display = 'block';
        Gate3.style.display = 'block';
        document.getElementById("Answer").value = ""; // Eingabefeld leeren
        Rechnung.textContent = " ";

    }
}

function check() {
    const PlayerAntwort = document.getElementById("Answer").value.trim().toLowerCase(); // Eingabe des Benutzers in Kleinbuchstaben umwandeln und Leerzeichen entfernen
    const CheckAntwort = dataById.antwort; // Antwortmöglichkeiten abrufen

    console.log(PlayerAntwort);

    if (Array.isArray(CheckAntwort)) {
        if (CheckAntwort.some(answer => answer.toLowerCase() === PlayerAntwort)) {
            console.log("Richtige Antwort!");
            FrageRichtig();
        } else {
            console.log("Falsche Antwort!");
            FrageFalsch();
        }
    } else {
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

// Player Hitbox
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

function GameOverF() {
    GameOver = true;
    GameOverI.style.display = 'block';
}

function movePlayer(direction) {
    if (GameOver == false) {
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

        const collision = checkCollision(player, walls, gates);

        if (collision) {
            document.documentElement.style.setProperty('--top', `${currentTop}px`);
            document.documentElement.style.setProperty('--left', `${currentLeft}px`);
        }
    };
}

// Tasten-Event-Listener
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            movePlayer('up');
            break;
        case 'ArrowLeft':
            movePlayer('left');
            break;
        case 'ArrowDown':
            movePlayer('down');
            break;
        case 'ArrowRight':
            movePlayer('right');
            break;
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !isEnterPressed) {
        isEnterPressed = true; 
        check();
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        isEnterPressed = false;
    }
});

window.addEventListener("gamepadconnected", (event) => {
    controllerIndex = event.gamepad.index;
    console.log("Controller verbunden");
    isControllerActive = true;
    requestAnimationFrame(contollerMovement);
});

window.addEventListener("gamepaddisconnected", (event) => {
    controllerIndex = null;
    isControllerActive = false;
    console.log("Controller getrennt");
});

function controllerMoveWithDelay(direction) {
    if (isMoving) return; // Verhindert mehrfaches Starten

    isMoving = true;
    movePlayer(direction);

    moveTimeout = setTimeout(() => {
        isMoving = false;
    }, 40); // Zeit hier ebenfalls anpassen
}

function contollerMovement() {
    if (controllerIndex !== null && isControllerActive) {
        const gamepad = navigator.getGamepads()[controllerIndex];
        const buttons = gamepad.buttons;

        if (buttons[3].pressed) controllerMoveWithDelay('up');
        if (buttons[1].pressed) controllerMoveWithDelay('down');
        if (buttons[0].pressed) controllerMoveWithDelay('left');
        if (buttons[2].pressed) controllerMoveWithDelay('right');

        requestAnimationFrame(contollerMovement);
    }
}
