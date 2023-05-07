let countPlayer = 0;
let countBox = 0;
let countTarget = 0;
let countTargetOk = 0;
let cordTargetX = []
let cordTargetY = []
let moveTimes = 0;
let currLevel = [];


function initMap() {
    let map1 = document.getElementById('map1');
    currLevel = JSON.parse(JSON.stringify(levels[nlevel]));
    // console.log("initmap")
    // tout remettre a 0
    map1.innerHtml = '';
    while (map1.firstChild) {
        map1.removeChild(map1.firstChild)
    }

    cordTargetX = [];
    cordTargetY = [];
    countTarget = 0;
    countBox = 0;
    countPlayer = 0;
    countTargetOk = 0;
    moveTimes = 0;

    // rechargement de la map
    for (let i = 0; i < 16; i++) {
        // injection html ligne
        let col = document.createElement("div");
        col.id = "col" + i;
        map1.appendChild(col);
        for (let j = 0; j < 16; j++) {
            // injection html cellule d'une colonne
            let cellule = document.createElement("div");
            cellule.className = "colcase";
            cellule.id = "cell" + j + "-" + i;

            let imageFileName;

            switch (levels[nlevel][j][i]) {
                case EMPTY:
                    imageFileName = "images/block.gif";
                    break;
                case WALL:
                    imageFileName = "images/wall.png";
                    break;
                case TARGET:
                    countTarget++;
                    imageFileName = "images/ball.png";
                    cordTargetX[countTarget] = i;
                    // console.log("coord X" + cordTargetX);
                    cordTargetY[countTarget] = j;
                    // console.log("coord Y" + cordTargetY);
                    break;
                case BOX:
                    countBox++;
                    imageFileName = "images/box.png";
                    break;
                case PLAYER:
                    countPlayer++;
                    // console.log("player " + countPlayer)
                    imageFileName = "images/down.png";
                    break;
            }


            let image1 = new Image();
            // console.log(i + ", " + j + " donne le chiffre = " + levels[nlevel][i][j]);
            image1.src = imageFileName;
            cellule.appendChild(image1);

            col.appendChild(cellule);

        }
    }
    if ((countBox != countTarget) || (countPlayer != 1)) {
        map1.innerHtml = '';
        while (map1.firstChild) {
            map1.removeChild(map1.firstChild)
        }

        let messageError = document.createElement("div");
        messageError.className = "msgerr";
        if (countBox != countTarget) {
            messageError.innerHTML = "Problem on this level, you have " + countBox + " boxes and " + countTarget + " targets. <br/>";
        }
        if (countPlayer != 1) {
            messageError.innerHTML = messageError.innerHTML + "Problem on this level, you have " + countPlayer + " player, You must just have one player.";
        }
        map1.appendChild(messageError);
    }
}


function drawBlock(nextY, nextX, prevVal) {
    let cellule = document.getElementById('cell' + nextY + "-" + nextX);
    // console.log("je move " + prevVal + " en " + nextY + ", " + nextX)
    cellule.innerHTML = "";

    switch (prevVal) {
        case EMPTY:
            imageFileName = "images/block.gif";
            break;
        case WALL:
            imageFileName = "images/wall.png";
            break;
        case TARGET:
            imageFileName = "images/ball.png";
            break;
        case BOX:
            imageFileName = "images/box.png";
            break;
        case PLAYER:
            imageFileName = "images/down.png";
            break;
    }

    let image1 = new Image();
    //console.log(i + ", " + j + " donne le chiffre = " + levels[nlevel][i][j]);
    image1.src = imageFileName;
    cellule.appendChild(image1);
}


//Fonction permet de passer au niveau suivant ou précédent du jeu
function changeLevel(i) {

    nlevel = nlevel + i;
    // console.log("change level : " + nlevel)
    if (nlevel < 0) {
        nlevel = 0;
        return;
    }
    let len = levels.length;
    if (nlevel > len - 1) {
        nlevel = len - 1;
    }
    initMap();
    playerFirstPos();
    // moveTimes = 0;
    // showMoveInfo();
}

// Initialisation de la variable showhelp à false
let showhelp = false;

// Définition de la fonction showHelp()
function showHelp() {
    // Inversion de la valeur de showhelp à chaque appel de la fonction
    showhelp = !showhelp;
    if (showhelp) {
        // Si showhelp est true, affichage d'un message d'aide
        msg.innerHTML = " Utilisez les flèches ⬅,⬆,⬇,➡️ pour déplacer le joueur et pousser toutes les boîtes là où se trouvent les balles. La boîte ne peut être poussée que vers l'avant, pas tirée en arrière, et le joueur ne peut déplacer qu'une boîte à la fois.";
    }
}


// console.log("initMap");
initMap();