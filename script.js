$(".search-btn").on("click", function () {

    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=5a4f1348&s=' + $(".input-keyword").val(),
        success: results => {

            const movies = results.Search;

            let card = "";
            movies.forEach(e => {
                card += showCard(e);
            });

            $(".list-movie").html(card);

            $(".movie-detail-button").on("click", function () {
                $.ajax({
                    url: `http://www.omdbapi.com/?apikey=5a4f1348&i=${$(this).data("imdbid")}`,
                    success: e => {
                        let movieDetail = showDetailMovie(e);
                        $(".modal-body").html(movieDetail);
                    },
                    error: err => console.log(err.responseText)
                });
            });
        },
        error: err => console.log(err.responseText)
    })
});

// function
function showCard(dataMovies) {
    return `<div class="col-md-4 my-3 ">
    <div class="card">
        <img src="${dataMovies.Poster}" class="card-img-top">
        <div class="card-body">
            <h5 class="card-title">${dataMovies.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${dataMovies.Year}</h6>
            <a href="#" class="btn btn-primary movie-detail-button" data-toggle="modal" data-target="#movieDetailModal" data-imdbid="${dataMovies.imdbID}">Show Details</a>
        </div>
    </div>
</div>`;
}

function showDetailMovie(dataDetailMovies) {
    return `
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
                <img src="${dataDetailMovies.Poster}" class="img-fluid">
            </div>
            <div class="col-md">
                <ul class="list-group">
                    <li class="list-group-item">
                        <h4>${dataDetailMovies.Title} (${dataDetailMovies.Year})</h4>
                    </li>
                    <li class="list-group-item"><strong>Director: </strong>${dataDetailMovies.Director}</li>
                    <li class="list-group-item"><strong>Actors: </strong> ${dataDetailMovies.Actors}</li>
                    <li class="list-group-item"><strong>Writer: </strong> ${dataDetailMovies.Writer}</li>
                    <li class="list-group-item"><strong>Plot: </strong> <br> ${dataDetailMovies.Plot}</li>
                </ul>
            </div>
        </div>
    </div>`;
}
