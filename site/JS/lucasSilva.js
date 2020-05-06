"use strict"
/**
    Fonction pour ajouter un animé à la base de donnée
 **/
function ajouterAnim(form){
    let resultat= refElem('resultat');

    fetch('/add_anim?' + getParams(form))
        .then(r => r.json())
        .then(data => {
            data = data[0];
            if(!data.success) {
                resultat.classList.add('erreur');
                resultat.innerHTML = 'L\'anime que vous avez choisi est déjà dans notre base de donnée'
            }
            else {
                resultat.classList.remove('erreur');
                resultat.innerHTML = `Bonjour ${form.titAnime.value} ${form.gender.value} !`;
            }

        }).catch(err => {
            resultat.classList.add('erreur');
            resultat.innerHTML = `Une erreur est survenue: ${err}`;
    });
    return false;

}

/**
 * Fonction pour ajouter un anime à sa base personnelle et le noter.
 **/

function add_Mylist(form){
    let resultat = refElem('resultat');

    fetch('/add_mylist?' + getParams(form))
        .then(r => r.json())
        .then(data => {
            data= data[0];
            if(!data.success) {
                resultat.classList.add('erreur');
                resultat.innerHTML = "Une erreur est survenue, êtes-vous bien connecter ? <br> " +
                    "Ou alors l'animé est déjà dans votre liste personnelle";
            }
            else {
                resultat.classList.remove('erreur');
                resultat.innerHTML = `Vous avez noté ${form.titre.value}
                    avec une note de ${form.notelist.value} <br>`+ `Il a été rajouté à votre liste personnelle d'animés!`
            }
        }).catch(err => {
            resultat.classList.add('erreur');
            resultat.innerHTML = `Une erreur est survenue: ${err}`;
    });

    return false;
}