/**
 * Created by Touliro on 29/11/2017.
 */




//╔═════════════════════════════════════════════╗
//║            BLOC DE TEST                	    ║
//╚═════════════════════════════════════════════╝



/*var empty = new Array(9);
var ligne = 0;
var colonne;


for (var i = 0; i < empty.length; i++) {
    lineIndex = Math.floor(i/3);
    empty[i] = new Array(lineIndex, " ");
}

empty.forEach(function(item){
//     for (var ligne = 0; ligne < 3; ligne ++){
//       console.log(ligne);
//     }
    console.log(item);


})
var token = 0;

while (token < empty.length) {
    empty[token][1] = ligne;
    if (ligne >= 2) {
        ligne = 0;
    } else {
        ligne ++;
    }

    token ++;
}
// empty[0] = [0,0];
// empty[1] = [0,1];

console.log(empty);*/


// ---------------------------------------------------------------------------------------------------------- //


// var grid;
// var line;
var playerCross = "x";
var playerCircle = "o";
var separator = "---+---+---";
var empty = new Array(9);
var nextPlayer = "x";
var state;
var winner;
var ligne = 0;

// var grid = [
//     ["b","b","b"],
//     ["b","b","b"],
//     ["b","b","b"]
// ];
//╔═════════════════════════════════════════════════════════════════════════════════╗
//║                          AFFICHAGE DE LA GRILLE                                 ║
//╚═════════════════════════════════════════════════════════════════════════════════╝

// for (var i = 0; i < grid.length; i ++) {
//     if (i < 2) {
//         console.log(" "+ grid[i][0] + " | " + grid[i][1] + " | " + grid[i][2]);
//         console.log(separator);
//     } else {
//         console.log(" "+ grid[i][0] + " | " + grid[i][1] + " | " + grid[i][2]);
//     }
// }
// console.log(grid);

// console.log(" "+ grid[i][0] + " | " + grid[i][1] + " | " + grid[i][2]);
//     console.log(separator);




//╔═════════════════════════════════════════════════════════════════════════════════╗
//║                         INITIALISATION DES VARIABLES                            ║
//╚═════════════════════════════════════════════════════════════════════════════════╝

function gameInitialization() {
    separator = "---+---+---";
    emptyInit = function() {
        empty = new Array(9);
        for (var i = 0; i < empty.length; i++){
            // console.log("tour " +i);
            lineIndex = Math.floor(i/3);
            empty[i] = new Array(lineIndex, " ");
        }
        var token = 0;
        while (token < empty.length) {
            empty[token][1] = ligne;
            if (ligne >= 2) {
                ligne = 0;
            } else {
                ligne ++;
            }

            token ++;
        }
        console.log(empty);
        return empty;
    };

    gridInit = function() {
        grid = [
            [null,null,null],
            [null,null,null],
            [null,null,null]
        ];
        return grid;
    };
    gridDisplay = function(){
        console.clear();
        for (var i = 0; i < grid.length; i ++) {
            if (i < 2) {
                console.log(" "+ grid[i][0] + " | " + grid[i][1] + " | " + grid[i][2]);
                console.log(separator);
            } else {
                console.log(" "+ grid[i][0] + " | " + grid[i][1] + " | " + grid[i][2]);
            }
        }
        return grid;

    }
}

function trouverCaseJouee(x,y) {
    var pos;
    for (pos = 0; pos < empty.length; pos++) {
        if(empty[pos][0] == x && empty[pos][1] == y) {
            return pos;
        }
    }
}

function enleverCaseJouee(x,y){
    empty.splice(trouverCaseJouee(x,y), 1);
    console.log(empty);
}

function jouerCoup() {
    // while (empty.length > 0){
    // }
    var x = parseInt(prompt('C\'est au tour du joueur '+ nextPlayer +'\nSur quelle ligne voulez placer votre symbole'));
    var y = parseInt(prompt('C\'est au tour du joueur '+ nextPlayer +'\nSur quelle colonne voulez placer votre symbole'));
    if (x > 2 || y > 2) {
        alert('Tu ne peux pas jouer de coups hors grille !\n PETIT MALIN !')
        jouerCoup();
    }
    if (trouverCaseJouee(x,y) === undefined) {
        alert('Il y a déjà un symbole placé sur cette case');
        jouerCoup();
    } else {
        grid[x][y] = nextPlayer;
        console.log(grid);
        enleverCaseJouee(x,y);
        gridDisplay();
    }
    if(nextPlayer === playerCross) {
        nextPlayer = playerCircle;
    } else {
        nextPlayer = playerCross;
    }
}

gameInitialization();
emptyInit();
gridInit();

gameInitialization.gridInit;



gridDisplay();
//jouerCoup();

