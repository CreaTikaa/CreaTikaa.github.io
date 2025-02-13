$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id'); 


    $.ajax({
        url: `http://localhost:3000/movies/${movieId}`,
        type: 'GET',
        dataType: 'json',
        success: function(movie) {

            $('#edit-nom').val(movie.nom);
            $('#edit-realisateur').val(movie.realisateur);
            $('#edit-note').val(movie.note);
            $('#edit-notePublic').val(movie.notePublic);
            $('#edit-compagnie').val(movie.compagnie);
            $('#edit-description').val(movie.description);
            $('#edit-lienImage').val(movie.lienImage);
        },
        error: function(xhr, status, error) {
            console.error("Erreur lors du chargement du film : " + error);
            alert("Film introuvable !");
            window.location.href = "index.html";
        }
    });

    $('#edit-movie-form').on('submit', function(event) {
        event.preventDefault();

        const updatedMovie = {
            nom: $('#edit-nom').val(),
            realisateur: $('#edit-realisateur').val(),
            note: $('#edit-note').val(),
            notePublic: $('#edit-notePublic').val(),
            compagnie: $('#edit-compagnie').val(),
            description: $('#edit-description').val(),
            lienImage: $('#edit-lienImage').val()
        };

        $.ajax({
            url: `http://localhost:3000/movies/${movieId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedMovie),
            success: function(response) {
                alert('Film modifié avec succès!');
                window.location.href = "index.html"; 
            },
            error: function(xhr, status, error) {
                alert('Erreur lors de la modification du film.');
            }
        });
    });

    $('#cancel-button').on('click', function() {
        window.location.href = "index.html";
    });
});
