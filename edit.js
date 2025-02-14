$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    if (!movieId) {
        alert("ID du film non trouvé !");
        window.location.href = "index.html";
        return;
    }

    // Charger les informations du film
    $.ajax({
        url: `http://localhost:3000/movies/${movieId}`,
        type: "GET",
        success: function (movie) {
            $("#nom").val(movie.nom);
            $("#dateDeSortie").val(movie.dateDeSortie);
            $("#realisateur").val(movie.realisateur);
            $("#note").val(movie.note);
            $("#notePublic").val(movie.notePublic);
            $("#compagnie").val(movie.compagnie);
            $("#origine").val(movie.origine);
            $("#lienImage").val(movie.lienImage);
            $("#description").val(movie.description);
        },
        error: function () {
            alert("Erreur lors du chargement du film !");
            window.location.href = "index.html";
        }
    });

    // Enregistrer les modifications
    $("#editMovieForm").on("submit", function (event) {
        event.preventDefault();

        const updatedMovie = {
            nom: $("#nom").val(),
            dateDeSortie: $("#dateDeSortie").val(),
            realisateur: $("#realisateur").val(),
            note: $("#note").val(),
            notePublic: $("#notePublic").val(),
            compagnie: $("#compagnie").val(),
            origine: $("#origine").val(),
            lienImage: $("#lienImage").val(),
            description: $("#description").val()
        };

        $.ajax({
            url: `http://localhost:3000/movies/${movieId}`,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(updatedMovie),
            success: function () {
                alert("Film mis à jour !");
                window.location.href = "index.html";
            },
            error: function () {
                alert("Erreur lors de la mise à jour !");
            }
        });
    });

    // Annuler et retourner à la page principale
    $("#cancelButton").on("click", function () {
        window.location.href = "index.html";
    });
});
