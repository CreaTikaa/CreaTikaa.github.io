
$(document).on("click", ".edit", function () {
    const movieElement = $(this).closest(".movie-card");
    const movieId = movieElement.find(".delete-button").data("id");



    $('#edit-movie-id').val(movieId);
    $('#edit-nom').val(movieElement.find('.nom').text());
    $('#edit-dateDeSortie').val(movieElement.find('.dateDeSortie').text());
    $('#edit-realisateur').val(movieElement.find('.realisateur').text());
    $('#edit-note').val(movieElement.find('.note').text());
    $('#edit-notePublic').val(movieElement.find('.notePublic').text());
    $('#edit-compagnie').val(movieElement.find('.compagnie').text());
    $('#edit-description').val(movieElement.find('.description').text());
    $('#edit-lienImage').val(movieElement.find('.lienImage').attr('src'));
    $('#edit-origine').val(movieElement.find('.origine').text());

    $('#edit-movie-form').show();
});


$('#edit-form').submit(function (event) {
    event.preventDefault();

    const movieId = $('#edit-movie-id').val();
    const formData = {
        nom: $('#edit-nom').val(),
        realisateur: $('#edit-realisateur').val(),
        compagnie: $('#edit-compagnie').val(),
        dateDeSortie: $('#edit-dateDeSortie').val(),
        note: parseFloat($('#edit-note').val()),
        notePublic: parseFloat($('#edit-notePublic').val()),
        description: $('#edit-description').val(),
        lienImage: $('#edit-lienImage').val(),
        origine: $('#edit-origine').val()
    };

    $.ajax({
        url: `http://localhost:8080/movies/${movieId}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (response) {
            if (response.success) {
                alert("Film modifié avec succès !");
                $('#edit-movie-form').hide(); // Masquer le formulaire
                $('#load-movies-btn').click(); // Rafraîchir la liste des films
            } else {
                alert('Erreur lors de la modification du film : ' + response.error);
            }
        },
        error: function (xhr, status, error) {
            console.error("Erreur :", error);
            alert('Erreur lors de la modification du film.');
        }
    });
});

$('#cancel-edit').click(function () {
    $('#edit-movie-form').hide();
});
