"use strict";

/* auteur : étudiant 2 Walravens Mathieu HE201799 */

/**
 * Connecte l'utilisateur à son compte.
 *
 * @param {HTMLFormElement} form - Le formulaire de connexion
 *
 */
function connexion(form) {
	let resultat = refElem('resultat');

	fetch('/login?' + getParams(form))
		.then(r => r.json())
		.then(data => {
			data = data[0];
			setCookie("token", data.token);
			if (data.token === null) {
				resultat.classList.add('erreur');
				resultat.innerHTML = "Nom d'utilisateur ou mot de passe incorrect.";
			} else {
				resultat.classList.remove('erreur');
				resultat.innerHTML = `Bonjour ${data.prenom} ${data.nom} !<br>Vous allez être redirigé automatiquement.`;
				setTimeout(() => {
					window.location = '/site/myAnimeList.html';
				}, 2000);
			}
		}).catch(err => {
			resultat.classList.add('erreur');
			resultat.innerHTML = `Une erreur est survenue: ${err}`;
		});

	return false;
}

/**
 * Crée un nouveau compte dans la base de donnée.
 *
 * @param {HTMLFormElement} form - Le formulaire d'inscription
 *
 */
function inscription(form) {
	let resultat = refElem('resultat');

	fetch('/add_user?' + getParams(form))
		.then(r => r.json())
		.then(data => {
			data = data[0];
			setCookie("token", data.token);
			if (!data.success) {
				resultat.classList.add('erreur');
				resultat.innerHTML = data.message;
			} else {
				resultat.classList.remove('erreur');
				resultat.innerHTML = `Bonjour ${form.prenom.value} ${form.nom.value} !<br>Vous allez être redirigé automatiquement.`;
				setTimeout(() => {
					window.location = '/site/myAnimeList.html';
				}, 2000);
			}
		}).catch(err => {
			resultat.classList.add('erreur');
			resultat.innerHTML = `Une erreur est survenue: ${err}`;
		});

	return false;
}

/**
 * Initialise la page d'accueil avec la note moyenne des animes.
 *
 */
function initTop() {
	let table = refElem('top');

	fetch('/get_top')
		.then(r => r.json())
		.then(animes => {
			table.innerHTML = animes.map(anime =>
				`<tr>
					<td>${anime.titre}</td>
					<td>${anime.genre}</td>
					<td>${anime.note}</td>
				</tr>`
			).join('');
		}).catch(err => {
			table.parentNode.outerHTML = `<div class="erreur">Une erreur est survenue: ${err}</div>`;
		});

	return false;
}