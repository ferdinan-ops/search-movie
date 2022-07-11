const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", async function () {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUICard(movies);
});

document.addEventListener("click", async function (e) {
    if (e.target.classList.contains("movie-detail-button")) {
        const imdbID = e.target.dataset.imdbid;
        const movieDetail = await getMoviesDetail(imdbID);
        setUIModal(movieDetail);
    }
})

function getMovies(keyword) {
    return fetch("http://www.omdbapi.com/?apikey=5a4f1348&s=" + keyword)
        .then(response => response.json())
        .then(results => results.Search);
}

function updateUICard(movies) {
    let card = "";
    movies.forEach(e => card += showCard(e));
    const listMovie = document.querySelector(".list-movie");
    listMovie.innerHTML = card;
}

function getMoviesDetail(id) {
    return fetch("http://www.omdbapi.com/?apikey=5a4f1348&i=" + id)
        .then(response => response.json())
        .then(results => results);
}

function setUIModal(detail) {
    let movieDetail = showDetailMovie(detail);
    const modal = document.querySelector(".modal-body");
    modal.innerHTML = movieDetail;
}

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
