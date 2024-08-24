// my script

//const apiUrl = 'http://localhost:3000/user_table';

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
 
 
 
 
 
 
 
 function createTvShowCard(tvshow) {
    return `
    <div class="col-md-3 mb-4">
    <div class="card border-0" >
      <img src="${tvshow.image}" class="card-img-top" alt="..." >
      <div class="card-body" style="background-image: linear-gradient(black,rgb(50, 48, 48)); color:lightgray;">
        <h5 class="card-title">${tvshow.tvshow_name}</h5>
        <p class="card-text">Category: ${tvshow.category}<br>Year: ${tvshow.year}</p>
        <button class="btn btn-outline-warning add-favorite" data-index="${tvshow.tvshow_id}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4"/>
          </svg>
        </button>
        <button class="btn btn-outline-danger open-video-modal" data-bs-toggle="modal" data-bs-target="#videoModal_${tvshow.tvshow_id}" data-video-url="${tvshow.video}" style="margin-left:24%;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
            <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
          </svg> Play
        </button>
      </div>
    </div>
  </div>
    `;
  }



 


  
// Function to fetch TV shows
function fetchTvShows() {
    axios.get('http://localhost:3000/tvshow_table')
      .then(response => {
        const tvShowsData = response.data; // Store TV shows data for search
        const tvContainer = $('#tvContainer');
        tvContainer.empty(); // Clear previous content
  
        tvShowsData.forEach(tvshow => {
          const card = createTvShowCard(tvshow);
          tvContainer.append(card);

          
          const videoModal = `
          <div class="modal fade" id="videoModal_${tvshow.tvshow_id}" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="videoModalLabel">${tvshow.tvshow_name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <video controls id="modalVideoPlayer_${tvshow.tvshow_id}" style="width: 100%;">
                    <source src="${tvshow.video}" type="video/mp4">
                    </video>
                  </div>
                  <hr>
                  <div>
                    Movie Category: ${tvshow.category} </br>  Year released: ${tvshow.year} </br> Rating: ${tvshow.rating}/5
                  </div>
                  <hr>
                  <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne_${tvshow.tvshow_id}" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne_${tvshow.tvshow_id}">
                          Description
                        </button>
                      </h2>
                      <div id="panelsStayOpen-collapseOne_${tvshow.tvshow_id}" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                          ${tvshow.detail}
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
  
        // Pass tvShowsData to the search function
        $('#searchBtn').on('click', function () {
          const searchTerm = $('#searchInput').val();
          performSearch(searchTerm, tvShowsData);
        });
      })
      .catch(error => {
        console.error('Error fetching TV shows:', error);
      });
  }
  
  
  // Function to perform search across movies
  function performSearch(searchTerm, tvShowsData) {
    const filteredTvShows = tvShowsData.filter(tvshow =>
      tvshow.tvshow_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Display filtered movies
    const tvContainer = $('#tvContainer');
    tvContainer.empty();
    filteredTvShows.forEach(tvshow => {
      const card = createTvShowCard(tvshow);
      tvContainer.append(card);
    });
  }
  

  // Fetch movies when the page loads
  fetchTvShows();





// // Event listener for category dropdown
// $('#categoryDropdown .dropdown-menu').on('click', function (e) {
//     const selectedCategory = $(e.target).data('category');
//     $('#categoryDropdown .btn').text(selectedCategory); // Change button text to selected category
//     filterByCategory(selectedCategory, tvShowsData);
//   });
  
//   // Function to filter TV shows by category
//   function filterByCategory(category, tvShowsData) {
//     if (category === 'All') {
//       displayTvShows(tvShowsData);
//     } else {
//       const filteredByCategory = tvShowsData.filter(tvshow =>
//         tvshow.category.toLowerCase() === category.toLowerCase()
//       );
//       displayTvShows(filteredByCategory);
//     }
//   }




function addToFavorites(tvshowId, userId) {
  axios.get(`http://localhost:3000/favorite_tvshows?user_id=${userId}&tvshow_id=${tvshowId}`)
    .then(response => {
      if(userId===null){
        alert("please login");
      }
      const existingFavorite = response.data;
      console.log("type asdfg user : " + userId);
      
      if (existingFavorite.length === 0) {
        axios.post('http://localhost:3000/favorite_tvshows', {user_id: userId, tvshow_id: tvshowId })
          .then(() => {
            console.log('Added to favorites.');
            
            // Optionally, you can trigger any UI updates or additional actions after a successful update
            fetchFavorites(userId);
            alert('TV Show add to favorite')
          })
          .catch(error => {
            console.error('Error adding to favorites:', error);
            // Handle errors or display a message to the user
          });
      } else {
        alert('This TV Show already exists in favorites!');
        // You can display an alert or message indicating that the movie already exists in favorites
      }
    })
    .catch(error => {
      console.error('Error checking existing favorites:', error);
    });
}




// Event listeners for adding and removing from favorites
$('#tvContainer').on('click', '.add-favorite', function() {
  //const movieId = $(this).data('index');
  // const user_Id = 1; 
  const userId = parseInt(sessionStorage.getItem("userId"));
  const tvshowId = parseInt($(this).attr('data-index'));
  addToFavorites(tvshowId,parseInt(userId));
});





// Function to remove a movie from favorites and update the JSON file
function removeFromFavorites(favId) {
  axios.delete(`http://localhost:3000/favorite_tvshows/${favId}`)
    .then(() => {
      console.log("TV Show removed from favorite");
      fetchFavorites(); // Update favorites list after removing
     
    })
    .catch(error => {
      console.error('Error removing from favorites:', error);
    });
}


$('#favoritesList').on('click', '.remove-favorite', function() {
  const favId = parseInt($(this).attr('data-movie-id'));
  // const userId = 1;
  // const userId = parseInt(sessionStorage.getItem("userId"));
  removeFromFavorites(favId);
});








function fetchFavorites(userId) {
  axios.get('../database/db.json')
    .then(response => {
      const data = response.data;
      // const userId = userId; //replace with login one
      const favoriteMoviesContainer = $('#favoritesList');
      favoriteMoviesContainer.empty();

      // Filter favorite movies for the specified user
      const favoriteMovies = data.favorite_tvshows.filter(movie => movie.user_id === userId);
      

      // Display favorite movies as Bootstrap cards
 
  favoriteMovies.forEach(movie => {
    const movieData = data.tvshow_table.find(m => m.tvshow_id === movie.tvshow_id);
    const card = `
    <div class="col-md-3 mb-4">
    <div class="card border-0" >
      <img src="${movieData.image}" class="card-img-top" alt="..." >
      <div class="card-body" style="background-image: linear-gradient(black,rgb(50, 48, 48)); color:lightgray;">
        <h5 class="card-title">${movieData.tvshow_name}</h5>
        <p class="card-text">Category: ${movieData.category}<br>Year: ${movieData.year}</p>
        <button class="btn btn-outline-warning remove-favorite" data-movie-id="${movie.id}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
      </svg>
        </button>
        <button class="btn btn-outline-danger open-video-modal" data-bs-toggle="modal" data-bs-target="#videoModal_${movieData.tvshow_id}" data-video-url="${movieData.video}" style="margin-left:24%;">
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
        <div class="modal fade" id="videoModal_${movieData.tvshow_id}" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="videoModalLabel">${movieData.tvshow_name}</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <video controls id="modalVideoPlayer_${movieData.tvshow_id}" style="width: 100%;">
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
                      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne_${movieData.tvshow_id}" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne_${movieData.tvshow_id}">
                        Description
                      </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne_${movieData.tvshow_id}" class="accordion-collapse collapse show">
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







// function fetchFavorites() {
//   axios.get('../database/db.json')
//     .then(response => {
//       const data = response.data;
//       const userId = 1; //replace with login one
//       //const favoritesList = $('#favoritesList');
//       //favoritesList.empty(); // Clear previous content
//       const favoriteMoviesContainer = $('#favoritesList');
//       favoriteMoviesContainer.empty();

//       // Filter favorite movies for the specified user
//       const favoriteMovies = data.favorite_movies.filter(movie => movie.user_id === userId);
      

//       // Display favorite movies as Bootstrap cards
 
//   favoriteMovies.forEach(movie => {
//     const movieData = data.movies_table.find(m => m.movie_id === movie.movie_id);
//     const card = `
//     <div class="col-md-3 mb-4">
//     <div class="card border-0" >
//       <img src="${movieData.image}" class="card-img-top" alt="..." >
//       <div class="card-body" style="background-image: linear-gradient(black,rgb(50, 48, 48)); color:lightgray;">
//         <h5 class="card-title">${movieData.movie_name}</h5>
//         <p class="card-text">Category: ${movieData.category}<br>Year: ${movieData.year}</p>
//         <button class="btn btn-outline-warning remove-favorite" data-movie-id="${movie.id}">
//         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
//         <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
//         <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
//       </svg>
//         </button>
//         <button class="btn btn-outline-danger open-video-modal" data-bs-toggle="modal" data-bs-target="#videoModal_${movieData.movie_id}" data-video-url="${movieData.video}" style="margin-left:24%;">
//           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
//             <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
//           </svg> Play
//         </button>
//       </div>
//     </div>
//   </div>
//     `;

//     favoriteMoviesContainer.append(card);


//     const videoModal = `
//         <div class="modal fade" id="videoModal_${movieData.movie_id}" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
//             <div class="modal-dialog modal-xl modal-dialog-centered">
//               <div class="modal-content">
//                 <div class="modal-header">
//                   <h5 class="modal-title" id="videoModalLabel">${movieData.movie_name}</h5>
//                   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                 </div>
//                 <div class="modal-body">
//                   <video controls id="modalVideoPlayer_${movieData.movie_id}" style="width: 100%;">
//                   <source src="${movieData.video}" type="video/mp4">
//                   </video>
//                 </div>
//                 <hr>
//                 <div>
//                   Movie Category: ${movieData.category} </br>  Year released: ${movieData.year} </br> Rating: ${movieData.rating}/5
//                 </div>
//                 <hr>
//                 <div class="accordion" id="accordionPanelsStayOpenExample">
//                   <div class="accordion-item">
//                     <h2 class="accordion-header">
//                       <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne_${movieData.movie_id}" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne_${movieData.movie_id}">
//                         Description
//                       </button>
//                     </h2>
//                     <div id="panelsStayOpen-collapseOne_${movieData.movie_id}" class="accordion-collapse collapse show">
//                       <div class="accordion-body">
//                         ${movieData.detail}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//         `;
//         $('body').append(videoModal);
//   });

//     })
//     .catch(error => {
//       console.error('Error fetching favorites:', error);
//     });
// }


// fetchFavorites();






});
