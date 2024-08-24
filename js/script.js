const apiUrl = 'http://localhost:3000/user_table';

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
    let userId = sessionStorage.getItem("userId");
    console.log(personName);

    document.getElementById("displayUserName").innerHTML = "HI " +  personName.toLocaleUpperCase();
    if (userId) {
        console.log("userID: "+userId);
    //    document.getElementById("id").innerHTML = "Hi " +  userId;

        // You can use the userId variable as needed
      }
    getUserDetails(); // Fetch user details on page load
});
// Session clear when we copy the url and [paste in another browser
function clearSessionStorage(){
    sessionStorage.clear();
    window.open("../html/home.html");
}