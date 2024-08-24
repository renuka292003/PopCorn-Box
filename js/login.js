

$(document).ready(function () {
    $("#loginPage").submit(function (event) {
      event.preventDefault();
        var username = $("#loginUsername").val();
        var password = $("#loginPassword").val();
        console.log(username, password)
        sessionStorage.setItem("name", username);
        $.ajax({
            url: "http://localhost:3000/user_table",
            type: "get",
            success: function (response) {
              var userId = null; // Initialize user ID variable
              // console.log(response)
                for (let i = 0; i < response.length; i++) {
                    let loginUsername = response[i].username;
                    let loginPassword = response[i].password;
  
                    console.log(loginUsername, loginPassword);
                    var ans = 0
                    if (username == loginUsername) {
                        if (password == loginPassword) {
                            ans = 1
                            userId = response[i].id; // Set the user ID if credentials match
                          //   sessionStorage.setItem("username", response[i].username)
                            sessionStorage.setItem("name", response[i].first_name)
                            sessionStorage.setItem("userId", userId); // Store the user ID in session storage
                            break;
                        }
                    }
                }
                if (ans == 1) {
                    alert("Login Successfull!!!!")
                    window.location.replace("../html/dashboard.html");
                   
                }
                else {
                    alert("Unauthorised User");
                    window.location.replace("registration.html");
                }
            },
            error: function () {
                alert("Error Occur");
            }
        })
    })
  })
  