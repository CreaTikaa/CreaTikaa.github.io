$(document).ready(function() {
    function loadMovies(niveau, noteMin, noteMax, origineFilm) {
        $('#movies-container').empty();
        

        $.ajax({
            url: 'http://localhost:3000/movies',
            type: 'GET',
            dataType: 'json',
            data: {
                niveau: niveau,
                noteMin: noteMin,
                noteMax: noteMax,
                origine: origineFilm
            },
            success: function(moviesData) {
                const container = $('#movies-container');
                
                $.each(moviesData, function(i, movie) {
                    let templateId;

                    if (niveau === 'Banger') {
                        templateId = 'banger';
                    } else if (niveau === 'Navet') {
                        templateId = 'navets';
                    } else {
                        templateId = 'movie-template';
                    }

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
                        
                        currentMovieId = movie.id;
                        $('#edit-nom').val(movie.nom);
                        $('#edit-realisateur').val(movie.realisateur);
                        $('#edit-note').val(movie.note);
                        $('#edit-notePublic').val(movie.notePublic);
                        $('#edit-compagnie').val(movie.compagnie);
                        $('#edit-description').val(movie.description);
                        $('#edit-lienImage').val(movie.lienImage);

                        $('#edit-movie-form').show();
                    });

                    container.append(instance);
                });
            },
            error: function(xhr, status, error) {
                console.error("Erreur " + error);
            }
        });
    }

    $('#form-edit-movie').on('submit', function(event) {
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
            url: `http://localhost:3000/movies/${currentMovieId}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedMovie),
            success: function(response) {
                alert('Film modifié avec succès!');
                $('#edit-movie-form').hide();
                loadMovies('all', null, null, null);
            },
            error: function(xhr, status, error) {
                alert('Erreur lors de la modification du film.');
            }
        });
    });

    $('#close-edit-form').on('click', function() {
        $('#edit-movie-form').hide();
    });



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
        const niveau = 'all';
        const noteMin = $('#goodNote').val();
        const noteMax = $('#badNote').val();
        const origineFilm = $('#FiltrePays').val();
        loadMovies(niveau, noteMin, noteMax, origineFilm);
    });

    $('#importBanger').on('click', function() {
        const noteMin = $('#goodNote').val();
        loadMovies('Banger', noteMin, null, $('#FiltrePays').val());
    });

    $('#importNavets').on('click', function() {
        const noteMax = $('#badNote').val();
        loadMovies('Navet', null, noteMax, $('#FiltrePays').val());
    });

    $('#clearButton').on('click', function() {
        $('#goodNote').parent().show();
        $('#badNote').parent().show();
        $('#movies-container').empty();
    });
});
