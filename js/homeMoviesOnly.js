
  
  

  
  // Function to create movie cards
  function createMovieCard(movie) {
    return `
      <div class="col-md-3 mb-4">
        <div class="card border-0" >
          <img src="${movie.image}" class="card-img-top" alt="..." >
          <div class="card-body" style="background-image: linear-gradient(black,rgb(50, 48, 48)); color:lightgray;">
            <h5 class="card-title">${movie.movie_name}</h5>
            <p class="card-text">Category: ${movie.category}<br>Year: ${movie.year}</p>
            <button class="btn btn-outline-warning add-favorite" data-index="${movie.movie_id}" onclick="window.location.href='/html/login1.html'">
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  function addToFavorites(movieId, userId) {
    axios.get(`http://localhost:3000/favorite_movies?user_id=${userId}&movie_id=${movieId}`)
      .then(response => {
        const existingFavorite = response.data;
        
        if (existingFavorite.length === 0) {
          axios.post('http://localhost:3000/favorite_movies', { user_id: userId, movie_id: movieId })
            .then(() => {
              console.log('Added to favorites.');
              
              // Optionally, you can trigger any UI updates or additional actions after a successful update
              fetchFavorites(userId);
              alert('Movie add to favorite')
            })
            .catch(error => {
              console.error('Error adding to favorites:', error);
              // Handle errors or display a message to the user
            });
        } else {
          alert('Movie already exists in favorites!');
          // You can display an alert or message indicating that the movie already exists in favorites
        }
      })
      .catch(error => {
        console.error('Error checking existing favorites:', error);
      });
  }
  
  
  
  
  // Event listeners for adding and removing from favorites
  $('#movieContainer').on('click', '.add-favorite', function() {
    //const movieId = $(this).data('index');
    //const userId = 1; 
    const userId = parseInt(sessionStorage.getItem("userId"));
    const movieId = parseInt($(this).attr('data-index'));
    addToFavorites(movieId,parseInt(userId));
  });
  
  
  
  
  // Function to remove a movie from favorites and update the JSON file
  function removeFromFavorites(favId) {
    axios.delete(`http://localhost:3000/favorite_movies/${favId}`)
      .then(() => {
        console.log("movie removed from favorite");
        fetchFavorites(); // Update favorites list after removing
       
      })
      .catch(error => {
        console.error('Error removing from favorites:', error);
      });
  }
  
  
  $('#favoritesList').on('click', '.remove-favorite', function() {
    const favId = parseInt($(this).attr('data-movie-id'));
   
    removeFromFavorites(favId);
  });
  
  
  
  
  function fetchFavorites(userId) {
    axios.get('../database/db.json')
      .then(response => {
        const data = response.data;
        //const userId = 1; //replace with login one
        //const favoritesList = $('#favoritesList');
        //favoritesList.empty(); // Clear previous content
        const favoriteMoviesContainer = $('#favoritesList');
        favoriteMoviesContainer.empty();
  
        // Filter favorite movies for the specified user
        const favoriteMovies = data.favorite_movies.filter(movie => movie.user_id === userId);
        
  
        // Display favorite movies as Bootstrap cards
   
    favoriteMovies.forEach(movie => {
      const movieData = data.movies_table.find(m => m.movie_id === movie.movie_id);
      const card = `
      <div class="col-md-3 mb-4">
      <div class="card border-0" >
        <img src="${movieData.image}" class="card-img-top" alt="..." >
        <div class="card-body" style="background-image: linear-gradient(black,rgb(50, 48, 48)); color:lightgray;">
          <h5 class="card-title">${movieData.movie_name}</h5>
          <p class="card-text">Category: ${movieData.category}<br>Year: ${movieData.year}</p>
          <button class="btn btn-outline-warning remove-favorite" data-movie-id="${movie.id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
          <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg>
          </button>
          <button class="btn btn-outline-danger open-video-modal" data-bs-toggle="modal" data-bs-target="#videoModal_${movieData.movie_id}" data-video-url="${movieData.video}" style="margin-left:24%;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
              <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
            </svg> Play
          </button>
        </div>
      </div>
    </div>
      `;
  
      favoriteMoviesContainer.append(card);
  
  
      const videoModal = `
          <div class="modal fade" id="videoModal_${movieData.movie_id}" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="videoModalLabel">${movieData.movie_name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <video controls id="modalVideoPlayer_${movieData.movie_id}" style="width: 100%;">
                    <source src="${movieData.video}" type="video/mp4">
                    </video>
                  </div>
                  <hr>
                  <div>
                    Movie Category: ${movieData.category} </br>  Year released: ${movieData.year} </br> Rating: ${movieData.rating}/5
                  </div>
                  <hr>
                  <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne_${movieData.movie_id}" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne_${movieData.movie_id}">
                          Description
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseOne_${movieData.movie_id}" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                          ${movieData.detail}
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
  
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
      });
  }
  
  
  fetchFavorites(userId);
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  