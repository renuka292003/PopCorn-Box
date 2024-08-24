$(document).ready(function () {
  $('#registrationFormExample').submit(function (event) {
    event.preventDefault();

  //   const username = $('#regUsername').val();
  //   const password = $('#regPassword').val();
    const first_name = $('#regFName').val();
    const last_name = $('#regLName').val();

    const username = $('#regUserName').val();
    const password = $('#regPassword').val();
    const conPassword = $('#regConfirmPassword').val();
    const mobile = $('#regMobile').val();
    const email = $('#regEmail').val();
    var profile_image = "";
    var bio = "";

  //   const gender = $('#regGender').val();
  
    console.log(first_name,username,password, conPassword, mobile,email)
    const token = generateToken(); // Replace with your token generation logic

    // Save registration data in local storage
    
    axios.post('http://localhost:3000/user_table', {first_name, last_name, username, password , conPassword, mobile, email, profile_image, bio, token})
      .then(response => {
        console.log('Registration successful:', response.data);
        const userData = { first_name, last_name, username, password , conPassword, mobile, email, profile_image, bio, token };
        //console.log(userdata)
        localStorage.setItem('userData', JSON.stringify(userData));
      //   alert('Registration successful. Please log in.');
        window.location.replace('../html/login1.html')
      })
      
      .catch(error => {
        console.error('Registration failed:', error);
      });
  });
});
function generateToken() {
  // Replace this with your token generation logic
  return 'dummyToken';
}
