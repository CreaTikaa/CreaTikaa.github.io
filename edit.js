$(document).ready(function() {
    // Récupérer l'ID du film depuis l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (!movieId) {
        alert("Aucun film sélectionné pour l'édition.");
        window.location.href = "index.html";
        return;
    }

    // Charger les infos du film dans le formulaire
    $.ajax({
        url: `http://localhost:3000/movies/${movieId}`,
        type: 'GET',
        dataType: 'json',
        success: function(movie) {
            $('#nom').val(movie.nom);
            $('#dateDeSortie').val(movie.dateDeSortie);
            $('#realisateur').val(movie.realisateur);
            $('#note').val(movie.note);
            $('#notePublic').val(movie.notePublic);
            $('#compagnie').val(movie.compagnie);
            $('#description').val(movie.description);
            $('#origine').val(movie.origine);
            $('#lienImage').val(movie.lienImage);
        },
        error: function() {
            alert("Erreur : Impossible de charger les informations du film.");
            window.location.href = "index.html";
        }
    });

    // Sauvegarder les modifications
    $('#edit-form').on('submit', function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        const updatedMovie = {
            nom: $('#nom').val(),
            dateDeSortie: $('#dateDeSortie').val(),
            realisateur: $('#realisateur').val(),
            note: parseFloat($('#note').val()),
            notePublic: parseFloat($('#notePublic').val()),
            compagnie: $('#compagnie').val(),
            description: $('#description').val(),
            origine: $('#origine').val(),
            lienImage: $('#lienImage').val()
        };

        $.ajax({
            url: `http://localhost:3000/movies/${movieId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedMovie),
            success: function(response) {
                alert("Modifications enregistrées !");
                window.location.href = "index.html"; // Retour à l'accueil
            },
            error: function() {
                alert("Erreur lors de la mise à jour du film.");
            }
        });
    });

    // Annuler : Retour à l'accueil sans sauvegarder
    $('#cancelButton').on('click', function() {
        window.location.href = "index.html";
    });
});
