const omdbApiKey = '4a3b711b'; // Public OMDb API key for testing
const tmdbApiKey = '5792da9b9c1f34d3bb9f6a7ab26910d5'; // Public TMDb API key

function searchMovie() {
    const query = document.getElementById('searchInput').value;
    const omdbUrl = `https://www.omdbapi.com/?t=${query}&apikey=${omdbApiKey}`;

    fetch(omdbUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                const movieDetails = document.getElementById('movieDetails');
                movieDetails.innerHTML = `
                    <h3>${data.Title} (${data.Year})</h3>
                    <p><strong>IMDb Rating:</strong> ${data.imdbRating}</p>
                    <p><strong>Genre:</strong> ${data.Genre}</p>
                    <p><strong>Director:</strong> ${data.Director}</p>
                    <p><strong>Actors:</strong> ${data.Actors}</p>
                    <p><strong>Plot:</strong> ${data.Plot}</p>
                    <img src="${data.Poster}" alt="${data.Title} Poster">
                `;

                // Fetch cast details from TMDb
                fetchCastDetails(data.imdbID);
            } else {
                document.getElementById('movieDetails').innerHTML = `<p>Movie not found!</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
            document.getElementById('movieDetails').innerHTML = `<p>Error fetching movie data!</p>`;
        });
}

function fetchCastDetails(imdbID) {
    const tmdbUrl = `https://api.themoviedb.org/3/find/${imdbID}?external_source=imdb_id&api_key=${tmdbApiKey}`;

    fetch(tmdbUrl)
        .then(response => response.json())
        .then(data => {
            const movie = data.movie_results[0];
            const movieId = movie.id;
            const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${tmdbApiKey}`;

            fetch(castUrl)
                .then(response => response.json())
                .then(data => {
                    const castList = document.createElement('div');
                    castList.className = 'cast-list';
                    data.cast.forEach(member => {
                        const castItem = document.createElement('div');
                        castItem.className = 'cast-item';
                        castItem.innerHTML = `
                            <img src="https://image.tmdb.org/t/p/w185${member.profile_path}" alt="${member.name}">
                            <p>${member.name}</p>
                        `;
                        castList.appendChild(castItem);
                    });
                    document.getElementById('movieDetails').appendChild(castList);
                });
        })
        .catch(error => {
            console.error('Error fetching cast details:', error);
        });
}

function getMovieSuggestions() {
    const suggestionsList = document.getElementById('suggestionsList');
    const suggestions = [
        { title: 'Inception', language: 'English', link: 'https://www.netflix.com/in/title/70131314', img: 'https://image.tmdb.org/t/p/w500//9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg' },
        { title: 'The Matrix', language: 'English', link: 'https://www.netflix.com/in/title/20557937', img: 'https://image.tmdb.org/t/p/w500//aIYsjQM0piKc0ibPBCTWv3sqshj.jpg' },
        { title: 'Interstellar', language: 'English', link: 'https://www.netflix.com/in/title/70305903', img: 'https://image.tmdb.org/t/p/w500//gEU2QniE6E77NI6lCU6MxlNBvIx.jpg' },
        { title: 'The Dark Knight', language: 'English', link: 'https://www.netflix.com/in/title/70079583', img: 'https://image.tmdb.org/t/p/w500//1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg' },
        { title: 'Parasite', language: 'Korean', link: 'https://www.hulu.com/movie/parasite-2ec2a06d-4ea5-4666-93ff-49f0cb5f600d', img: 'https://image.tmdb.org/t/p/w500//7IiTTgloJzvGI1TAYymCfbfl3vT.jpg' },
        { title: 'The Avengers', language: 'English', link: 'https://www.amazon.com/dp/B0083SBJXS', img: 'https://image.tmdb.org/t/p/w500//RYMX2wcKCBAr24UyPD7xwmjaTn.jpg' },
        { title: 'Spider-Man: Homecoming', language: 'English', link: 'https://www.amazon.com/dp/B073RW6NGL', img: 'https://image.tmdb.org/t/p/w500//vc8bCGjdVp0UbMNLzHnHSLRbBWQ.jpg' },
        { title: 'Coco', language: 'English', link: 'https://www.amazon.com/dp/B0771Y8Z7C', img: 'https://image.tmdb.org/t/p/w500//eKi8dIrr8voobbaGzDpe8w0PVbC.jpg' },
        { title: 'The Shawshank Redemption', language: 'English', link: 'https://www.netflix.com/in/title/70005379', img: 'https://image.tmdb.org/t/p/w500//q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
        { title: 'Joker', language: 'English', link: 'https://www.netflix.com/in/title/80991420', img: 'https://image.tmdb.org/t/p/w500//udDclJoHjfjb8Ekgsd4FDteOkCU.jpg' },
        { title: 'The Godfather', language: 'English', link: 'https://www.netflix.com/in/title/60011152', img: 'https://image.tmdb.org/t/p/w500//rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg' },
        { title: 'Toy Story', language: 'English', link: 'https://www.disneyplus.com/movies/toy-story/1Hn7W46fYsCR', img: 'https://image.tmdb.org/t/p/w500//uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg' },
        { title: 'The Lion King', language: 'English', link: 'https://www.disneyplus.com/movies/the-lion-king-1994/3JRWUgV5eAQ', img: 'https://image.tmdb.org/t/p/w500//sKCr78MXSLixwmZ8DyJLrpMsd15.jpg' },
        { title: 'Shawshank Redemption', language: 'English', link: 'https://www.netflix.com/in/title/70005379', img: 'https://image.tmdb.org/t/p/w500//q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
        { title: 'Inglourious Basterds', language: 'English', link: 'https://www.netflix.com/in/title/70108777', img: 'https://image.tmdb.org/t/p/w500//7sf9CgJz30aXDvrg7DYYUQ2U91T.jpg' }
    ];


    suggestionsList.innerHTML = suggestions.map(movie => `
        <div class="suggestion-item">
            <a href="${movie.link}" target="_blank">
                <img src="${movie.img}" alt="${movie.title}">
                <p>${movie.title}</p>
            </a>
        </div>
    `).join('');
}

function buyPremiumSubscription1() {
    // Replace with actual subscription purchase page or link
    const subscriptionLink = 'https://www.primevideo.com/signup';
    window.open(subscriptionLink, '_blank');
}

function buyPremiumSubscription() {
    // Replace with actual subscription purchase page or link
    const subscriptionLink = 'https://www.netflix.com/signup';
    window.open(subscriptionLink, '_blank');
}
function buyPremiumSubscription2() {
    // Replace with actual subscription purchase page or link
    const subscriptionLink = 'https://www.disneyplus.com/signup';
    window.open(subscriptionLink, '_blank');
}

// Initialize suggestions on page load
window.onload = getMovieSuggestions;






