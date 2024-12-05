document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("formulaireAdoption");

	 form.addEventListener("submit", function(event) {
        let isValid = true;

        // Validation du nom
        const nom = document.getElementById("nom");
        const nomErreur = document.getElementById("nomErreur");
        if (nom.value.length < 3 || nom.value.length > 20 || nom.value.includes(",")) {
            nomErreur.style.display = 'inline';
            isValid = false;
        } else {
            nomErreur.style.display = 'none';
    	}

    	// Validation de l'espèce
        const espece = document.getElementById("espece");
        const especeErreur = document.getElementById("especeErreur");
        if (espece.value.includes(",")) {
            especeErreur.style.display = 'inline';
            isValid = false;
        } else {
            especeErreur.style.display = 'none';
        }

        // Validation de la race
        const race = document.getElementById("race");
        const raceErreur = document.getElementById("raceErreur");
        if (race.value.includes(",")) {
            raceErreur.style.display = 'inline';
            isValid = false;
        } else {
            raceErreur.style.display = 'none';
        }

        // Validation de l'âge
        const age = document.getElementById("age");
        const ageErreur = document.getElementById("ageErreur");
        if (age.value < 0 || age.value > 30) {
            ageErreur.style.display = 'inline';
            isValid = false;
        } else {
            ageErreur.style.display = 'none';
        }

        // Validation de la description
        const description = document.getElementById("description");
        const descriptionErreur = document.getElementById("descriptionErreur");
        if (description.value.length < 1 || description.value.includes(",")) {
            descriptionErreur.style.display = 'inline';
            isValid = false;
        } else {
            descriptionErreur.style.display = 'none';
        }

        // Validation du courriel
        const courriel = document.getElementById("courriel");
        const courrielErreur = document.getElementById("courrielErreur");
        const courrielFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!courrielFormat.test(courriel.value)) {
            courrielErreur.style.display = 'inline';
            isValid = false;
        } else {
            courrielErreur.style.display = 'none';
        }

        // Validation de l'adresse
        const adresse = document.getElementById("adresse");
        const adresseErreur = document.getElementById("adresseErreur");
        const adresseFormat = /^\d+\s+[A-Za-z0-9\s]+$/;
        if (adresse.value.includes(",") || !adresseFormat.test(adresse.value)) {
            adresseErreur.style.display = 'inline';
            isValid = false;
        } else {
            adresseErreur.style.display = 'none';
        }

        // Validation de la ville
        const ville = document.getElementById("ville");
        const villeErreur = document.getElementById("villeErreur");
        if (ville.value.includes(",")) {
            villeErreur.style.display = 'inline';
            isValid = false;
        } else {
            villeErreur.style.display = 'none';
        }

        // Validation du code postal
        const cp = document.getElementById("cp");
        const cpErreur = document.getElementById("cpErreur");
        const cpFormat = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
        if (!cpFormat.test(cp.value) || cp.value.includes(",")) {
            cpErreur.style.display = 'inline';
            isValid = false;
        } else {
            cpErreur.style.display = 'none';
        }
    	 

        if (!isValid) {
            event.preventDefault();  // Empêche l'envoi du formulaire si au moins une case n'est pas valide
        }
    });
});