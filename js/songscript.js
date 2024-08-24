// my script

// const apiUrl = 'http://localhost:3000/user_table';

//Get the data
function getUserDetails(){
    axios.get(apiUrl)
    .then(response => {
       // displayUserDetails(response.data)
    })
    .catch(error => {
        console.error('Error fetching user details:', error);
    });
}



$(document).ready(() => {
    let personName = sessionStorage.getItem("name");
    // let name = sessionStorage.getItem("fname");
    const userId = parseInt(sessionStorage.getItem("userId"));
    console.log(personName);
    console.log(userId);
    // document.getElementById("demo").innerHTML = "Hi " +  personName.toLocaleUpperCase();
    // if (userId) {
    //     console.log("userID: "+userId);
    // //    document.getElementById("id").innerHTML = "Hi " +  userId;

    //     // You can use the userId variable as needed
    //   }
    getUserDetails(); // Fetch user details on page load

// // Session clear when we copy the url and [paste in another browser
// function clearSessionStorage(){
//     sessionStorage.clear();
//     window.open("#");
// }
 
 
 






function createSongCard(song) {
    return `
      <div class="col-md-4 mb-4">
        <div class="card" style="background-image: url('/images/slider 1.jpg'); background-size: cover; color: white;">
          <div class="card-body">
            <h5 class="card-title">${song.song_name}</h5>
            <p class="card-text">Director: ${song.category}<br>Singer: ${song.singer}</p>
            <button class="btn btn-outline-warning add-favorite" data-index="${song.song_id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4"/>
          </svg>
        </button>
        <button class="btn btn-outline-danger open-video-modal" data-bs-toggle="modal" data-bs-target="#videoModal_${song.song_id}" data-video-url="${song.video}" style="margin-left:44%;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
            <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
          </svg> Play
        </button>
          </div>
        </div>
      </div>
    `;
}

// Function to fetch songs
function fetchSongs() {
    axios.get('http://localhost:3000/songs_table')
      .then(response => {
        const songsData = response.data; // Store songs data for search
        const songContainer = $('#songContainer');
        songContainer.empty(); // Clear previous content
  
        songsData.forEach(song => {
          const card = createSongCard(song);
          songContainer.append(card);

          const videoModal = `


          <div class="modal fade" id="videoModal_${song.song_id}" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
<div class="modal-dialog modal-md modal-dialog-centered">

  <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="videoModalLabel">${song.song_name}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

       


  <div class="player">
  <div class="imgBx">
    <img src="${song.image}" alt="Luka Chuppi">
  </div>
  <audio controls>
    <source src="${song.audio}" type="audio/mpeg">
  </audio>
</div>

<div >
<hr>
song Category: ${song.category} </br> Singer: ${song.singer}  </br> Rating: ${song.rating}/5
</div>

</div>
</div>
</div>
</div>


  
          `;
          $('body').append(videoModal);
        });
  
        // Pass songsData to the search function
        $('#searchBtn').on('click', function () {
          const searchTerm = $('#searchInput').val();
          performSearch(searchTerm, songsData);
        });
      })
      .catch(error => {
        console.error('Error fetching songs:', error);
      });
}


  // Function to perform search across movies
  function performSearch(searchTerm, songsData) {
    const filteredSongs = songsData.filter(song =>
      song.song_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Display filtered movies
    const songContainer = $('#songContainer');
    songContainer.empty();
    filteredSongs.forEach(song => {
      const card = createSongCard(song);
      songContainer.append(card);
    });
  }
  

  // Fetch movies when the page loads
fetchSongs();



  







function addToFavorites(songId, userId) {
  axios.get(`http://localhost:3000/favorite_songs?user_id=${userId}&song_id=${songId}`)
    .then(response => {
      const existingFavorite = response.data;
      
      if (existingFavorite.length === 0) {
        axios.post('http://localhost:3000/favorite_songs', {user_id: userId, song_id: songId })
          .then(() => {
            console.log('Added to favorites.');
            
            // Optionally, you can trigger any UI updates or additional actions after a successful update
            fetchFavorites(userId);
            alert('Song added to favorite')
          })
          .catch(error => {
            console.error('Error adding to favorites:', error);
            // Handle errors or display a message to the user
          });
      } else {
        alert('This song already exists in favorites!');
        // You can display an alert or message indicating that the movie already exists in favorites
      }
    })
    .catch(error => {
      console.error('Error checking existing favorites:', error);
    });
}






// Event listeners for adding and removing from favorites
$('#songContainer').on('click', '.add-favorite', function() {
  //const movieId = $(this).data('index');
  const userId = parseInt(sessionStorage.getItem("userId")); 
  const songId = parseInt($(this).attr('data-index'));
  addToFavorites(songId,parseInt(userId));
});





// Function to remove a movie from favorites and update the JSON file
function removeFromFavorites(favId) {
  axios.delete(`http://localhost:3000/favorite_songs/${favId}`)
    .then(() => {
      console.log("Song removed from favorite");
      fetchFavorites(); // Update favorites list after removing
     
    })
    .catch(error => {
      console.error('Error removing from favorites:', error);
    });
}


$('#favoritesList').on('click', '.remove-favorite', function() {
  const favId = parseInt($(this).attr('data-movie-id'));
  const userId = 1;
  removeFromFavorites(favId, parseInt(userId));
});








function fetchFavorites(userId) {
  axios.get('../database/db.json')
    .then(response => {
      const data = response.data;
      //const userId = 1; //replace with login one
      const favoriteMoviesContainer = $('#favoritesList');
      favoriteMoviesContainer.empty();

      // Filter favorite movies for the specified user
      const favoriteMovies = data.favorite_songs.filter(movie => movie.user_id === userId);
      

      // Display favorite movies as Bootstrap cards
 
  favoriteMovies.forEach(movie => {
    const movieData = data.songs_table.find(m => m.song_id === movie.song_id);
    const card = `
    <div class="col-md-4 mb-4">
    <div class="card" style="background-image: url('/images/slider 1.jpg'); background-size: cover; color: white;");">
      <div class="card-body">
        <h5 class="card-title">${movieData.song_name}</h5>
        <p class="card-text">Director: ${movieData.category}<br>Singer: ${movieData.singer}</p>
        <button class="btn btn-outline-warning remove-favorite" data-movie-id="${movie.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
      </svg>
        </button>
    <button class="btn btn-outline-danger open-video-modal" data-bs-toggle="modal" data-bs-target="#videoModal_${movieData.song_id}" data-video-url="${movieData.audio}" style="margin-left:44%;">
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


    <div class="modal fade" id="videoModal_${movieData.song_id}" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
<div class="modal-dialog modal-md modal-dialog-centered">

<div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title" id="videoModalLabel">${movieData.song_name}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>

 


<div class="player">
<div class="imgBx">
<img src="${movieData.image}" alt="Luka Chuppi">
</div>
<audio controls>
<source src="${movieData.audio}" type="audio/mpeg">
</audio>
</div>

<div >
<hr>
song Category: ${movieData.category} </br> Singer: ${movieData.singer}  </br> Rating: ${movieData.rating}/5
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













});
