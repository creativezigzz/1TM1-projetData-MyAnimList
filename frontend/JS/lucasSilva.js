"use strict"

/**
 * Récupère les informations du formulaire @form permettant d'ajouter un animé dans la base de donnée
 * @param @form : le formulaire en question
 * @author: Lucas Silva HE201892
 */
function ajouterAnim(form){
    let resultat= refElem('resultat');

    fetch('/add_anime?' + getParams(form))
        .then(r => r.json())
        .then(data => {
            data = data[0];
            if(!data.success) {
                resultat.classList.add('erreur');
                resultat.innerHTML = 'L\'anime que vous avez choisi est déjà dans notre base de donnée'
            }
            else {
                resultat.classList.remove('erreur');
                resultat.innerHTML = `L'anime ${form.titre.value} de genre : ${form.genre.selectedOptions[0].innerHTML} <br>a été rajouté à notre BDD!`;
            }

        }).catch(err => {
            resultat.classList.add('erreur');
            resultat.innerHTML = `Une erreur est survenue: ${err}`;
    });
    return false;

}

/**
 * Fonction récupère des données d'un formulaire pour ensuite ajouter un anime à sa base personnelle et µ
 * le noter sur une échelle de 1 à 5.
 *
 * @param: @form Le formulaire où l'on rentre les différentes informations
 * @author Lucas Silva HE201892
 **/

function add_Mylist(form){
    let resultat = refElem('resultat');

    fetch('/add_mylist?' +'token=' +getCookie('token')+'&' + getParams(form))
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
                resultat.innerHTML = `Vous avez noté ${form.titre.selectedOptions[0].innerHTML}
                    avec une note de ${form.note.value} <br>`+ `Il a été rajouté à votre liste personnelle d'animés!`
            }
        }).catch(err => {
            resultat.classList.add('erreur');
            resultat.innerHTML = `Une erreur est survenue: ${err}`;
    });

    return false;
}