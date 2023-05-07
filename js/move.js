// const element = document.getElementById("player1");
// const box = document.getElementById("box1");

let done = false;
let movable = true;
let winLevel = false;
let currkeypress;
let currX, currY;
let nextCurrX, nextCurrY;
// comptage et stockage des coord des blocks
let tCoordX = [];
let tCoordY = [];
let indexBlock = 0;
let player = PLAYER;



function playerFirstPos() {
    //console.log("dimension 1 : " + levels[nlevel].length);
    for (let i = 0; i < levels[nlevel].length; i++) {
        //console.log("dimension 2 " + i + " : " + levels[nlevel][i].length);
        for (let j = 0; j < levels[nlevel][i].length; j++) {
            if (levels[nlevel][i][j] === player) {
                // console.log("player trouvé : " + i + ", " + j);
                //initialisation des positions du joueur
                currX = j;
                currY = i;
                return true;
            }
        }
    }
}

function getPrevVal(prevCoordX, prevCoordY, prevVal) {
    // if (prevVal != PLAYER && prevVal != BOX) {
    for (let i = 1; i <= cordTargetX.length; i++) {
        if (prevCoordX == cordTargetX[i]) {
            if (prevCoordY == cordTargetY[i]) {
                return TARGET;
            }
        }
    }
    return EMPTY;
    // } else {
    // return prevVal;
}





function step(timestamp) {
    if (!done) {
        // mémoriser la précédente coord
        tCoordX[indexBlock] = nextCurrX;
        tCoordY[indexBlock] = nextCurrY;
        //console.log(tCoordX);
        //console.log(tCoordY);

        // prepare la prochaine case à verifier
        switch (currkeypress) {
            case "up":
                nextCurrY = nextCurrY - 1;
                break;
            case "down":
                nextCurrY = nextCurrY + 1;
                break;
            case "left":
                nextCurrX = nextCurrX - 1;
                break;
            case "right":
                nextCurrX = nextCurrX + 1;
                break;
        }

        let nextCellContent = currLevel[nextCurrY][nextCurrX];
        // console.log("[" + timestamp + "] En x=" + nextCurrX + " et y=" + nextCurrY + "; il y a un: " + nextCellContent);
        //console.log(" |-(etat done=" + done + " et movable=" + movable+")");
        var prevX, prevY;
        if (indexBlock > 0) {
            prevX = tCoordX[indexBlock - 1];
            prevY = tCoordY[indexBlock - 1];
            //console.log(" |-(previous x="+prevX+" et y="+prevY+")");
        }

        // vérif si case box
        if (nextCellContent === BOX) {
            if (indexBlock > 0) {
                let otherVal = currLevel[nextCurrY][nextCurrX];
                // console.log("otherVal = " + otherVal);
                if (otherVal === BOX) {

                    // console.log(" |-Une deuxieme box trouvé, je ne peux pas pousser en x=" + nextCurrX + " et y=" + nextCurrY);
                    movable = false;
                    done = true;
                }
            }
            // je teste la prochaine case pour voir si je peux déplacer le joueur et la box
            indexBlock++;
            tCoordX[indexBlock] = nextCurrX;
            tCoordY[indexBlock] = nextCurrY;
            // console.log(" |-J'essaye de pousser la boite de x=" + nextCurrX + " et y=" + nextCurrY);
        } else if ((nextCellContent === 0) || (nextCellContent === 2)) { // vérif si case vide ou point cible
            // Ok terminé, j'avance à la case suivante
            indexBlock++;
            tCoordX[indexBlock] = nextCurrX;
            tCoordY[indexBlock] = nextCurrY;
            // console.log(" |-Case dispo, je peux pousser en x=" + nextCurrX + " et y=" + nextCurrY);
            movable = true;
            done = true;
        } else if (nextCellContent === 1) { // vérif si la case est un mur
            //j'avance pas
            // console.log(" |-Un mur bloque le passage, je ne peux pas pousser en x=" + nextCurrX + " et y=" + nextCurrY);
            movable = false;
            done = true;
        }
        //console.log(" |-NEXT STEP: x="+nextCurrX+", y="+nextCurrY);

        // on continue a appeler Step() pour les objets sur le passage (Boite , ...)
        //console.log(" |- ==> GO NEXT BLOCK: appel recursif go to index "+indexBlock);
        step(timestamp + indexBlock);
    }

    // ================== cas du retour recursif
    if (done && movable) {
        if (indexBlock > 0) {
            prevX = tCoordX[indexBlock - 1];
            prevY = tCoordY[indexBlock - 1];
            // console.log(prevX + " X, " + prevY + " Y : " + indexBlock)
            //console.log(" |-PREV STEP: x="+prevX+", y="+prevY);
            prevVal = currLevel[prevY][prevX];
            // console.log("preval standard : " + prevVal)
            curVal = currLevel[tCoordY[indexBlock]][tCoordX[indexBlock]];
            // console.log(curVal + " curval, et preval " + prevVal)
            // vérifie si une box arrive sur une target
            if (prevVal == BOX && curVal == TARGET) {
                countTargetOk++;
                // console.log(countTargetOk + " cible trouvé")
            }
            // on vérifie si une box quitte une target
            prevSubVal = getPrevVal(prevX, prevY, "");
            // console.log("presubval de 0 ou 2 : " + prevSubVal);
            if (prevVal == BOX && prevSubVal == TARGET) {
                countTargetOk--;
                // console.log(countTargetOk + " cible quitté")
            }
            if (countTargetOk == countTarget) {
                // console.log(countTarget + " == " + countTargetOk)
                winLevel = true

            }
        } else {
            // fin de la récursivité on remplace l'ancienne case du player
            prevX = tCoordX[indexBlock];
            prevY = tCoordY[indexBlock];
            //console.log(" |-FINAL STEP: x="+prevX+", y="+prevY);
            prevVal = getPrevVal(prevX, prevY, EMPTY); // 0 ou 2
            moveTimes++;
            // console.log("mouvement fait " + moveTimes)
            if (winLevel) {
                winLevel = false;
                // console.log("c'est win")
                alert(" Félicitations, vous avez gagné! Vous avez passé ce niveau en " + moveTimes + " mouvement! Passons au niveau suivant! Attention il sera beaucoup plus difficile ! 😊  ");
                changeLevel(1)
            }
        }

        // modifie la matrice avec la nouvelle valeur de la case		
        nextX = tCoordX[indexBlock];
        nextY = tCoordY[indexBlock];
        // console.log("==> l'objet précédent " + prevVal + " bouge en x=" + nextX + " et y=" + nextY);
        currLevel[nextY][nextX] = prevVal;


        drawBlock(nextY, nextX, prevVal)


        if (indexBlock > 0) {
            // on mémorise la nouvelle position du joueur
            currX = nextX;
            currY = nextY;
            // console.log(currLevel);
            // console.log(levels[nlevel]);
            // console.log("... then new object curr pos: x = " + currX + ", y = " + currY);

            // terminé, on dépile les appels récursifs et on met à jour la position du joueur
            indexBlock--;
            //console.log(" |-COUNT BLOCK: return to "+indexBlock);
        }
        return true;


    } else if (indexBlock == 0) {
        // console.log("si movalbe = false");
        // console.log(currLevel);
    }

}

document.onkeydown = checkKey;
function checkKey(e) {
    // console.log("pos init player : " + currX + ", " + currY)
    e = e || window.event;
    // reinit les variables
    nextCurrX = currX;
    nextCurrY = currY;
    tCoordX = [];
    tCoordY = [];
    indexBlock = 0;

    if (e.keyCode == '38') {
        // up arrow
        currkeypress = "up";
        window.requestAnimationFrame(step);
    }
    else if (e.keyCode == '40') {
        // down arrow
        currkeypress = "down";
        window.requestAnimationFrame(step);
    }
    else if (e.keyCode == '37') {
        // left arrow
        currkeypress = "left";
        window.requestAnimationFrame(step);
    }
    else if (e.keyCode == '39') {
        // right arrow
        currkeypress = "right";
        window.requestAnimationFrame(step);
    }

    // console.log(" ===== Clavier Key pressed = " + currkeypress);
    done = false;
}


// console.log("Matrice level initial :");
// console.log(currLevel);

playerFirstPos()


//window.requestAnimationFrame(step);