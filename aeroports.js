var AIRPORTS = [
    "Seattle",       // 0
    "San Francisco", // 1
    "New York",      // 2
    "Rio",           // 3
    "Madrid",        // 4
    "London",        // 5
    "Paris",         // 6
    "Roma",          // 7
    "Athens",        // 8,
    "Abidjan",       // 9
    "Pekin",         // 10
    "Mumbaï",        // 11
    "St Petersburg", // 12
    "Vladivostok",   // 13
    "Tokyo"          // 14
];


var FLIGHTS = [
    [0, 1],
    [0, 13],
    [0, 2],
    [1, 10],
    [1, 2],
    [2, 3],
    [2, 5],
    [2, 6],
    [3, 4],
    [4, 6],
    [4, 7],
    [5, 12],
    [5, 7],
    [6, 12],
    [6, 5],
    [6, 9],
    [7, 6],
    [7, 8],
    [9, 11],
    [12, 10],
    [12, 11],
    [13, 14],
    [11, 14],
    [14, 1]
];



// On  doit retourner le nom en toutes lettres issu de listesVilles grâce à son numéro numVille
function villeAffiche(listeVilles, numVille) {
    return listeVilles[numVille];
}

/* ****************** TEST ************** */
// console.log(villeAffiche(AIRPORTS, 3)); // Rio
// console.log(villeAffiche(AIRPORTS, 0)); // Seattle
// console.log(villeAffiche(AIRPORTS, 8)); // Athens

/* ************************************** */


// à partir de la liste des vols d'un numéro de départ et d'un numéro d'arrivée
// on doit retourner true si il existe un vol direct, et false sinon
function volDirectExiste(listeVols, numDepart, numArrivee) {
    var index;
    for (index = 0; index < listeVols.length; index += 1) {
        if ((listeVols[index][0] === numDepart && listeVols[index][1] === numArrivee) || (listeVols[index][1] === numDepart && listeVols[index][0] === numArrivee)) {
            return true;
        }
    }
    return false;
}

/* ****************** TEST ************** */
// console.log(volDirectExiste(FLIGHTS, 0, 4)); // false
// console.log(volDirectExiste(FLIGHTS, 0, 2)); // true
// console.log(volDirectExiste(FLIGHTS, 8, 7)); // true
/* ************************************** */






function volDirectAccessible(listeVols, numDepart, affichage) {
    var listeVolDirect = [], index;
    //quand on passe en paramètre 0 la fonction retourne le numéro de la ville
    if (affichage === 0) {
        for (index = 0; index < listeVols.length; index += 1) {
            if (listeVols[index][0] === numDepart) {
                listeVolDirect.push(listeVols[index][1]);
            }
            if (listeVols[index][1] === numDepart) {
                listeVolDirect.push(listeVols[index][0]);
            }
        }
        return listeVolDirect;
    // quand on passe en paramètre 1 la fonction retourne le nom de la ville
    }
    if (affichage === 1) {
        for (index = 0; index < listeVols.length; index += 1) {
            if (listeVols[index][0] === numDepart) {
                listeVolDirect.push(villeAffiche(AIRPORTS, listeVols[index][1]));
            }
        } // TODO : Implémenter le if si l'aéroport est présent à l'index 1 plutôt que 0
        return listeVolDirect;
    }


}
/* ****************** TEST ************** */
// console.log(volDirectAccessible(FLIGHTS, 0, 1)); // [San Francisco, Vladivostok, New York]
// console.log(volDirectAccessible(FLIGHTS, 0, 0)); // [1, 13, 2]
/* ************************************** */



function trouveSources(listeVols, numDepart, numDestination) {
    // TODO : La fonction recherche un moyen d'atteindre la ville numDestination
    var num = numDestination, villesSuivantes, villesDejaVisitees = [], villePrecedente = [], index;
    // TEST VARS
    var listeVilles = AIRPORTS;
    // On démarre à la ville numDepart : on cherche les villes connectées
    villesSuivantes = volDirectAccessible(listeVols, numDepart, 0);
    // pour chacun des résultats on push le numéro dans la liste des villes déjà visitées
    for (index = 0; index < villesSuivantes.length; index += 1) {
        // console.log("test: " + volDirectAccessible(FLIGHTS, villesSuivantes[index], 0));
        villesDejaVisitees.push(villesSuivantes[index]);
        console.log("On push: " + villesSuivantes[index] + " " + villeAffiche(listeVilles, villesSuivantes[index]) + " dans l\'array villesDejaVisitées\n");
    }

    for (index = 0; index < villesDejaVisitees.length; index += 1) {
        // pour chacun des resultats on push dans la liste SEULEMENT si il n'est pas présent
        villesSuivantes.push(volDirectAccessible(listeVols, villesDejaVisitees[index], 0));
        console.log("Les vols possibles à partir de: " + villeAffiche(listeVilles, villesSuivantes[index]) + " sont: " +  volDirectAccessible(listeVols, villesDejaVisitees[index], 0));
    }
    console.log("Liste des villes suivantes: " + villesSuivantes);
    villesSuivantes.forEach(function (element) {
        if (villePrecedente.indexOf(element) === -1) {
            villePrecedente.push(element);
        }
        console.log(villePrecedente.indexOf(element));
    });
    console.log('Il faut donc relancer la fonction sur :' + villePrecedente);
    return villesDejaVisitees;
}


/* ****************** TEST ************** */
console.log("Depart saint petersbourg: " + trouveSources(FLIGHTS, 12, 3)); // [10,11]
console.log("--------------");
console.log("Depart Abidjan: " + trouveSources(FLIGHTS, 9, 3)); // [11]
/* ************************************** */

