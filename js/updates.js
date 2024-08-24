var latestMovies = [];
        var updateModel = document.getElementById("modal_body");

        const onToggleClick = () => {
            var description = document.getElementById('description');
            var toggleBtn = document.getElementById('toggle-btn');
            if (description.style.maxHeight) {
                description.style.maxHeight = null;
                toggleBtn.innerHTML = 'Show more';
            } else {
                description.style.maxHeight = description.scrollHeight + 'px';
                toggleBtn.innerHTML = 'Show less';
            }
        }

        function scrollLeft_cards(index) {
            console.log(index);
            let container = document.querySelectorAll(".card-container")[index];
            container.scrollLeft -= container.clientWidth;
        }

        function scrollRight(index) {
            let container = document.querySelectorAll(".card-container")[index];
            container.scrollLeft += container.clientWidth;
        }


        const fetchData = async () => {
            fetch('http://localhost:3000/tvshow_library')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Data from JSON Server:', data);
                    // Do something with the data
                    latestMovies = data;
                    displayData();
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }

        const clearModal = () => {
            setTimeout(() => {
                updateModel.innerHTML = '';
            }, 500);
        }

        const handleSelectedFromSuggetion = (id) => {
            document.getElementById('staticBackdrop').scrollTop = document.documentElement.scrollTop = 0;

            handleSelected(id);
        }

        const handleSelected = (id) => {
            updateModel.innerHTML = '';

            const movie = latestMovies.find((movie) => movie.tvshow_id === id);
            // console.log(movie);

            var modelHeader = document.createElement('div');
            var videoContainer = document.createElement('div');
            var iconContainer = document.createElement('div');
            var descContainer = document.createElement('div');
            var similarContainer = document.createElement('div');
            var text = document.createElement('h4')
            text.innerHTML = "Suggestions"
            text.style.marginTop = '1rem'
            similarContainer.className = 'corrousal'
            modelHeader.innerHTML =
                `<div class="modal_header">
                <h5>${movie.tvshow_name}</h5>
                <span class="material-symbols-outlined" data-bs-dismiss="modal"
                    onclick="clearModal()"
                >
                    close
                </span>
            </div>`
            videoContainer.innerHTML =
                `<div class="video_container">
                <video id='video' style="width: 100%; border-radius: 5px;" controls="controls"
                    preload='none' autoplay="true" muted="true">
                    <source id='mp4' src=${movie.video}
                        type='video/mp4' />
                </video>
            </div>` 
            
            // iconContainer.innerHTML =
            //     `<div class="icon_container">
            //     <div class="icon">
            //         <span class="material-symbols-outlined">
            //             thumb_up
            //         </span>
            //         <span>Like</span>
            //     </div>
            //     <div class="icon">
            //         <span class="material-symbols-outlined">
            //             thumb_down
            //         </span>
            //         <span>Dislike</span>
            //     </div>
            //     <div class="icon">
            //         <span class="material-symbols-outlined">
            //             share
            //         </span>
            //         <span>Share</span>
            //     </div>
            //     <div class="icon">
            //         <span class="material-symbols-outlined">
            //             add_to_queue
            //         </span>
            //         <span>Save</span>
            //     </div>
            //     <div class="icon">
            //         <span class="material-symbols-outlined">
            //             download
            //         </span>
            //         <span>Download</span>
            //     </div>
            // </div>`
            descContainer.innerHTML =
                `<div>

                <div id="description">
                    <p>
                        ${movie.description}
                    </p>
                </div>
                <div id="toggle-btn" onclick='onToggleClick()' >Show more</div>
            </div>`

            latestMovies.forEach((movie) => {
                var movieDiv = document.createElement("div");

                movieDiv.innerHTML = `
                <div class="col-md-4 mb-4">
                        <div class="card border-0" style="width: 16rem;">
                        <img src="${movie.image}" class="card-img-top" alt="..." height="300rem">
                        <div class="card-body" style="background-image: linear-gradient(black,rgb(50, 48, 48)); color:lightgray;">
                            <h5 class="card-title">${movie.tvshow_name}</h5>
                            <h5 class="card-title">${movie.tvshow_release}</h5>
                            <p class="card-text">Category: ${movie.category}<br>Year: ${movie.year}</p>
                            <div class="card_btn">
                            <button class="btn btn-outline-warning add-favorite" data-index="${movie.tvshow_id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16">
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
                                <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4"/>
                            </svg>
                            </button>
                            <button class="btn btn-outline-danger open-video-modal" onclick='handleSelectedFromSuggetion(${movie.tvshow_id})' data-video-url="${movie.video}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
                                <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                            </svg> Play
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    `;
                similarContainer.appendChild(movieDiv);
            })



            updateModel.appendChild(modelHeader)
            updateModel.appendChild(videoContainer)
            updateModel.appendChild(iconContainer)
            updateModel.appendChild(descContainer)
            updateModel.appendChild(text)
            updateModel.appendChild(similarContainer);
        }

        const displayData = () => {
            latestMovies.sort((a, b) => parseInt(b.year) - parseInt(a.year));
            const moviesByYear = {};
            latestMovies.forEach(movie => {
                const year = movie.year;

                if (!moviesByYear[year]) {
                    moviesByYear[year] = [];
                }

                moviesByYear[year].push(movie);
            });

            const moviesArrayByYear = Object.values(moviesByYear).reverse();

            console.log(moviesArrayByYear);

            const d = new Date();
            let year = d.getFullYear();

            var updateContainer = document.getElementById("update_container");
            moviesArrayByYear.forEach(function (movieArray, index) {
                var yearMovies = document.createElement('div')
                yearMovies.className = "year_movie"
                var yearHeader = document.createElement('h5')
                yearHeader.innerHTML = "Released Year : " + movieArray[0].year
                yearMovies.appendChild(yearHeader);
                var yearMovieContianer = document.createElement('div')
                yearMovieContianer.className = "year_movie_contianer"
                var pre_btn = document.createElement('button')
                var nxt_btn = document.createElement('button')
                pre_btn.innerHTML = `<button class="pre-btn" onclick="scrollLeft_cards(${index})"><img src="../images/pre.png" alt=""></button>`
                nxt_btn.innerHTML = `<button class="nxt-btn" onclick="scrollRight(${index})"><img src="../images/nxt.png" alt=""></button>`
                yearMovieContianer.appendChild(pre_btn)
                yearMovieContianer.appendChild(nxt_btn)
                var cardContainer = document.createElement('div')
                cardContainer.className = 'card-container';
                movieArray.forEach((movie) => {
                    var movieDiv = document.createElement("div");

                    // movieDiv.innerHTML = `
                    // <div class="card" onclick='handleSelected(${movie.tvshow_id})' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    //     <img src=${movie.image} alt="" class="card-img">
                    //     <div class="card-body">
                    //         <h2 class="name">${movie.tvshow_name}</h2>
                    //         <h6 class="des">${movie.description}</h6>
                    //         <button class="watchlist-btn">add to watchlist</button>
                    //     </div>
                    // </div>
                    // `;
                    movieDiv.innerHTML = `
                    <div class="col-md-4 mb-4">
                        <div class="card border-0" style="width: 16rem;">
                        <img src="${movie.image}" class="card-img-top" alt="..." height="300rem">
                        <div class="card-body" style="background-image: linear-gradient(black,rgb(50, 48, 48)); color:lightgray;">
                            <h5 class="card-title">${movie.tvshow_name}</h5>
                            <h5 class="card-title">${movie.tvshow_release}</h5>
                            <p class="card-text">Category: ${movie.category}<br>Year: ${movie.year}</p>
                            <div class="card_btn">
                           
                            <button class="btn btn-outline-danger open-video-modal" onclick='handleSelected(${movie.tvshow_id})' data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-video-url="${movie.video}">
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
                                <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                            </svg> Play
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    `;

                    cardContainer.appendChild(movieDiv);
                })
                yearMovieContianer.appendChild(cardContainer);
                yearMovies.appendChild(yearMovieContianer)
                updateContainer.appendChild(yearMovies)
            });




        }

        fetchData();