let ctrlOfAdminLogin = document.getElementById("admin-login");
console.log(ctrlOfAdminLogin);
function showAdminLogin() {
    ctrlOfAdminLogin.style.display = "block";
}

//admin login section
let controlOfAdminForm = document.getElementById("admin-form");
let controlOfUserResponses = document.getElementById("user-responses");
controlOfAdminForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let storedUsername = "vijay";
    let storedPassword = "1234";

    let username = document.getElementById("usrname").value;
    let password = document.getElementById("pswd").value;

    if (password == storedPassword && username == storedUsername) {
        alert("Acess granted");
        ctrlOfAdminLogin.style.display = "none";
        controlOfUserResponses.style.display = "block";
        showUserResponses(); //calling of function
    } else {
        alert("Acess denied!");
    }
});

//contact me section

let controlOfContactForm = document.getElementById("contact-form");
controlOfContactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    let date = new Date().toLocaleString(); 

    let response = {
        name,
        email,
        message,
        date,
    };

    let dummyDB = JSON.parse(localStorage.getItem("tempDB")) || [];
    dummyDB.push(response);

    localStorage.setItem("tempDB", JSON.stringify(dummyDB));
    alert("Your response is submitted.");
});

function showUserResponses() {
    let controlOfUserResponses = document.getElementById("user-responses");
    let dummyDB = JSON.parse(localStorage.getItem("tempDB")) || [];
    // dummyDB.push(response);
    console.log("All data:", dummyDB);

    dummyDB.forEach((responses) => {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `
    <p>Name : ${responses.name}</p>
    <p>Email :${responses.email}</p>
    <p>Message: ${responses.message}</p>
    <p>Date: ${responses.date}</p>
    <hr>`;

        controlOfUserResponses.append(newDiv);
    });
}
