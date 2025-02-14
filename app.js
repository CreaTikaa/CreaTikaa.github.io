$(document).ready(function() {
    function loadMovies(niveau = null, noteMin = null, noteMax = null, origineFilm = null) {
        $('#movies-container').empty();

        const data = {};
        if (niveau) data.niveau = niveau;
        if (noteMin) data.noteMin = noteMin;
        if (noteMax) data.noteMax = noteMax;
        if (origineFilm) data.origine = origineFilm;

        $.ajax({
            url: 'http://localhost:3000/movies',
            type: 'GET',
            dataType: 'json',
            data: data,
            success: function(moviesData) {
                const container = $('#movies-container');
                console.log("Films reçus: ", moviesData);

                $.each(moviesData, function(i, movie) {
                    let templateId = 'movie-template';
                    if (niveau === 'Banger') templateId = 'banger';
                    if (niveau === 'Navet') templateId = 'navets';

                    const template = document.getElementById(templateId);
                    const instance = document.importNode(template.content, true);

                    $(instance).find('.nom').text(movie.nom);
                    $(instance).find('.dateDeSortie').text(movie.dateDeSortie);
                    $(instance).find('.realisateur').text(movie.realisateur);
                    $(instance).find('.note').text(movie.note);
                    $(instance).find('.notePublic').text(movie.notePublic || 'N/A');
                    $(instance).find('.compagnie').text(movie.compagnie);
                    $(instance).find('.description').text(movie.description);
                    $(instance).find('.lienImage').attr('src', movie.lienImage);

                    if (movie.notePublic > 0) {
                        const difference = Math.abs(movie.note - movie.notePublic).toFixed(1);
                        $(instance).find('.noteDifference').text(difference);
                    } else {
                        $(instance).find('.noteDifference').text('Note public indisponible');
                    }

                    $(instance).find('.delete-button').on('click', function() {
                        deleteMovie(movie.id, instance);
                    });

                    $(instance).find('.edit-button').on('click', function() {
                        window.location.href = `edit.html?id=${movie.id}`;
                    });

                    container.append(instance);
                });
            },
            error: function(xhr, status, error) {
                console.error("Erreur " + error);
            }
        });
    }

    function deleteMovie(id, instance) {
        $.ajax({
            url: `http://localhost:3000/movies/${id}`,
            type: 'DELETE',
            success: function(response) {
                alert(response.message);
                $(instance).remove();
            },
            error: function(xhr, status, error) {
                alert("Erreur lors de la suppression du film");
            }
        });
    }

    $('#loadMoviesButton').on('click', function() {
        loadMovies();
    });

    $('#importBanger').on('click', function() {
        loadMovies('Banger', $('#goodNote').val(), null, $('#FiltrePays').val());
    });

    $('#importNavets').on('click', function() {
        loadMovies('Navet', null, $('#badNote').val(), $('#FiltrePays').val());
    });


    $('#clearButton').on('click', function() {
        $('#goodNote').parent().show();
        $('#badNote').parent().show();
        $('#movies-container').empty();
    });
});
