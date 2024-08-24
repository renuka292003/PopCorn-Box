const fetchProfileData = async () => {
    const userId = sessionStorage.getItem('userId');       
    fetch(`http://localhost:3000/user_table/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data from JSON Server:', data);
            let id=parseInt(sessionStorage.getItem("userId"));
            // const user = data[id-1];
            const user = data;
            setUserInfo(user)
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    
}



fetchProfileData();

const setUserInfo = (user) => {
    
    var profile = document.getElementById('profile_info_image');
    var name = document.getElementById('user_name')
    // var phone = document.getElementById('user_phone')
    var email = document.getElementById('user_email')
    var bio = document.getElementById('user_bio')
    profile.src = user.profile_image || '../images/user.png';
    name.innerHTML = user.first_name + " " + user.last_name;
    // phone.innerHTML = user.phone;
    email.innerHTML = user.email;
    bio.innerHTML = user.bio;

    console.log(user.first_name);
    
    const fname = document.getElementById('fname');
    const lname = document.getElementById('lname');
    const editbio = document.getElementById('bio');
    var image = document.getElementById('profile_image')
    fname.value = user.first_name;
    lname.value = user.last_name;
    editbio.value = user.bio;
    image.src = user.profile_image || '../images/user.png';

}

var myForm = document.getElementById("edit_form");

myForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const bio = document.getElementById('bio').value;
    var image = document.getElementById('profile_image').src
    // console.log(image);
    image = image.includes('images/user.png') ? "" : image
    // console.log(fname, lname, bio, image);

    const updatedData = {
        "first_name": fname,
        "last_name": lname,
        "bio": bio,
        "profile_image": image
    };

    const userId = parseInt(sessionStorage.getItem('userId'));

    const api = `http://localhost:3000/user_table/${userId}`;

    fetch(api, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Updated data:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

});


const uploadFile = () => {
    const fileInput = document.getElementById('icon-button-file');
    if (fileInput.files.length > 0) {
        var selectedFile = fileInput.files[0];
        relativePath = selectedFile.webkitRelativePath;
        console.log(relativePath);
        console.log(selectedFile);
        var fileName = document.getElementById('profile_file_name')
        fileName.innerHTML = selectedFile.name;
        var reader = new FileReader();
        reader.onload = function (e) {
            var fileUrl = e.target.result;
            // console.log(fileUrl);
            var profile = document.getElementById('profile_image')
            profile.src = fileUrl;
        };

        reader.readAsDataURL(selectedFile);
    } else {
        alert("Please select a file.");
    }
};