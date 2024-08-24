

// Function to create movie cards
function createMovieCard(movie) {
    return `
      <div class="col-md-3 mb-4">
        <div class="card border-0" >
          <img src="${movie.image}" class="card-img-top" alt="..." >
          <div class="card-body" style="background-image: linear-gradient(black,rgb(50, 48, 48)); color:lightgray;">
            <h5 class="card-title">${movie.movie_name}</h5>
            <p class="card-text">Category: ${movie.category}<br>Year: ${movie.year}</p>
            <button class="btn btn-outline-warning add-favorite" data-index="${movie.movie_id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4"/>
              </svg>
            </button>
            <button class="btn btn-outline-danger open-video-modal" data-bs-toggle="modal" data-bs-target="#videoModal_${movie.movie_id}" data-video-url="${movie.video}" style="margin-left:24%;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
                <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
              </svg> Play
            </button>
          </div>
        </div>
      </div>
    `;
  }
  
 
  
  // Function to create TV show cards
  function createTvShowCard(tvshow) {
    return `
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${tvshow.tvshow_name}</h5>
            <p class="card-text">Category: ${tvshow.category}<br>Year: ${tvshow.year}  <br>Rating:${tvshow.rating}/5</p>
            <button class="btn btn-primary add-favorite" data-index="${tvshow.tvshow_id}">Add to Favorites</button>
          </div>
        </div>
      </div>
    `;
  }
  
  // Function to create song cards
  function createSongCard(song) {
    return `
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${song.song_name}</h5>
            <p class="card-text">Director: ${song.category}<br>Year: ${song.year}</p>
            <button class="btn btn-primary add-favorite" data-index="${song.song_id}">Add to Favorites</button>
          </div>
        </div>
      </div>
    `;
  }
  
  
  
  
  
  
  
  // Function to fetch movies
  function fetchMovies() {
    axios.get('http://localhost:3000/movies_table')
      .then(response => {
        const moviesData = response.data; // Store movies data for search
        const movieContainer = $('#movieContainer');
        movieContainer.empty(); // Clear previous content
  
        moviesData.forEach(movie => {
          const card = createMovieCard(movie);
          movieContainer.append(card);
  
  
          const videoModal = `
          <div class="modal fade" id="videoModal_${movie.movie_id}" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="videoModalLabel">${movie.movie_name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <video controls id="modalVideoPlayer_${movie.movie_id}" style="width: 100%;">
                    <source src="${movie.video}" type="video/mp4">
                    </video>
                  </div>
                  <hr>
                  <div>
                    Movie Category: ${movie.category} </br>  Year released: ${movie.year} </br> Rating: ${movie.rating}/5
                  </div>
                  <hr>
                  <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne_${movie.movie_id}" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne_${movie.movie_id}">
                          Description
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseOne_${movie.movie_id}" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                          ${movie.detail}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
          `;
          $('body').append(videoModal);
        });
  
        // Pass moviesData to the search function
        $('#searchBtn').on('click', function () {
          const searchTerm = $('#searchInput').val();
          performSearch(searchTerm, moviesData);
        });
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }
  
  // Function to perform search across movies
  function performSearch(searchTerm, moviesData) {
    const filteredMovies = moviesData.filter(movie =>
      movie.movie_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Display filtered movies
    const movieContainer = $('#movieContainer');
    movieContainer.empty();
    filteredMovies.forEach(movie => {
      const card = createMovieCard(movie);
      movieContainer.append(card);
    });
  }
  
  
  fetchMovies();














  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  