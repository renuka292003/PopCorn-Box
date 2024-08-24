   // Validate Name done
   $(document).ready(function(){
    $("#fNameError").hide();
   let usernameError = true;
   $("#regFName").keyup(function () {
       validateFName();
   });
  
   function validateFName() {
       let usernameValue = $("#regFName").val();
       if (usernameValue.length == "") {
           $("#fNameError").show();
           $("#fNameError").text("**Please enter something");
           usernameError = false;
           return false;
       } else if (usernameValue.length < 3 || usernameValue.length > 10) {
           $("#fNameError").show();
           $("#fNameError").text("**length of username must be between 3 and 10");
           $("#fNameError").css("color", "red");
           usernameError = false;
           return false;
       } else {
           $("#fNameError").hide();
       }
   }
  })
   
  // Validate username done

    $(document).ready(function(){
    $("#userNameError").hide();
   let usernameError = true;
   $("#regUserName").keyup(function () {
       validateUser();
   });
  
   function validateUser() {
       let usernameValue = $("#regUserName").val();
       if (usernameValue.length == "") {
           $("#userNameError").show();
           $("#userNameError").text("**Please enter something");
           usernameError = false;
           return false;
       } else if (usernameValue.length < 3 || usernameValue.length > 10) {
           $("#userNameError").show();
           $("#userNameError").text("**length of username must be between 3 and 10");
           $("#userNameError").css("color", "red");
           usernameError = false;
           return false;
       } else {
           $("#userNameError").hide();
       }
   }
  })

 //  // validate password done

  $(document).ready(function(){
    $("#userPassError").hide();
   let usernameError = true;
   $("#regPassword").keyup(function () {
       validatePass();
   });
  
   function validatePass() {
    let regex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    let usernameValue = $("#regPassword").val();
    if(regex.test(usernameValue) != true) {
        $("#userPassError").show();
           $("#userPassError").text("Please enter the password with special char and digit");
           $("#userPassError").css("color", "red");
    } else {
        $("#userPassError").hide();
    }
}
  })

// validate Confirm password done

  $(document).ready(function(){
    $("#userConPassError").hide();
   let confirmPasswordError  = true;
   $("#regConfirmPassword").keyup(function () {
       validateConPass();
   });
  
 function validateConPass() {
     let confirmPasswordValue = $("#regConfirmPassword").val();
     let passwordValue = $("#regPassword").val();
     if (passwordValue != confirmPasswordValue) {
         $("#userConPassError").show();
         $("#userConPassError").html("**Password didn't Match");
         $("#userConPassError").css("color", "red");
         confirmPasswordError = false;
         return false;
     } else {
         $("#userConPassError").hide();
     }
 }
})

 //   // validate Email

 $(document).ready(function(){
    $("#userEmailError").hide();
   let usernameError = true;
   $("#regEmail").keyup(function () {
    validateEmail();
   });
function validateEmail() {
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let emailValue = $("#regEmail").val();
    if(regex.test(emailValue) != true) {
        $("#userEmailError").show();
           $("#userEmailError").text("Please enter the email in correct format");
           $("#userEmailError").css("color", "red");
    } else {
        $("#userEmailError").hide();
    }
}
  })
// validate Phone done

   $(document).ready(function(){
    $("#userMobileError").hide();
   let usernameError = true;
   $("#regMobile").keyup(function () {
       validatePhone();
   });
  
   function validatePhone() {
       let usernameValue = $("#regMobile").val();
       if (usernameValue.length == 10) {
           $("#userMobileError").hide();
           $("#userMobileError").text("**Please enter something");
           usernameError = false;
           return false;
       } else if (usernameValue.length < 3 || usernameValue.length > 10) {
           $("#userMobileError").show();
           $("#userMobileError").text("**length of Phone Number must be between 10");
           $("#userMobileError").css("color", "red");
           usernameError = false;
           return false;
       } else {
           $("#userMobileError").hide();
       }
   }
  })

 //   // Validate Submit button
 $("#SubBtn").click(function () {
   validateFName();
   validateUser();
   validatePass();
   validateConPass();
     validateEmail();
     validatePhone();
     if (
       fNameError == true &&
       userNameError == true &&
       userPassError == true &&
       userConPassError == true &&
       userMobileError == true
     ) {
         return true;
     } else {
         return false;
     }
 });