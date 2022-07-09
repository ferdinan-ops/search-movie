$(".search-btn").on("click", function () {

    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=5a4f1348&s=' + $(".input-keyword").val(),
        success: results => {

            const movies = results.Search; // menghilangkan search pd object

            let card = "";
            movies.forEach(e => { // sama seperti while($MysqlifetchArray) pd php
                card += showCard(e);
            });

            // let listCard = document.querySelector(".list-movie");
            // listCard.innerHTML = card;

            $(".list-movie").html(card); // sama sperti diatas namun menggunakan JQuery

            $(".movie-detail-button").on("click", function () {
                $.ajax({
                    url: `http://www.omdbapi.com/?apikey=5a4f1348&i=${$(this).data("imdbid")}`, // => $(this).data("imdbid") mengambil data-imdbid
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

// function showCard
function showCard(dataMovies) {
    return `<div class="col-md-4 my-3 ">
    <!-- col-md-4 => grid = 12 untuk buat 3 kolom maka 12:3 = 4 maka col-md-4 -->
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

// function showDetailMovie
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