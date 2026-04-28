 
const themeToggle = document.getElementById("theme-toggle");
const contactForm = document.getElementById("contact-form");
const adminForm = document.getElementById("admin-form");
const adminSection = document.getElementById("admin-login");
const userResponsesSection = document.getElementById("user-responses");
const messagesList = document.getElementById("messages-list");
const emailError = document.getElementById("email-error");

 
const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);

themeToggle.addEventListener("click", () => {
    let theme = document.documentElement.getAttribute("data-theme");
    let newTheme = theme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateButtonText(newTheme);
});

function updateButtonText(theme) {
    themeToggle.textContent =
        theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
}

updateButtonText(currentTheme);

contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = "❌ Please enter a valid email address.";
        return;
    } else {
        emailError.textContent = "";
    }

    const newResponse = {
        name: name,
        email: email,
        message: message,
        date: new Date().toLocaleString(),
    };

    let dummyDB = JSON.parse(localStorage.getItem("tempDB")) || [];
    dummyDB.push(newResponse);
    localStorage.setItem("tempDB", JSON.stringify(dummyDB));

    alert("Success! Your message has been saved.");
    contactForm.reset();
});
function showAdminLogin() {
    if (adminSection.style.display === "block") {
        adminSection.style.display = "none";
    } else {
        adminSection.style.display = "block";
        adminSection.scrollIntoView({ behavior: "smooth" });
    }
}

adminForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.getElementById("usrname").value;
    const pass = document.getElementById("pswd").value;

    if (user === "vijay" && pass === "1234") {
        alert("Access Granted!");
        adminSection.style.display = "none";
        userResponsesSection.style.display = "block";
        renderResponses();
    } else {
        alert("Invalid Username or Password!");
    }
});

function renderResponses() {
    messagesList.innerHTML = ""; 
    let dummyDB = JSON.parse(localStorage.getItem("tempDB")) || [];

    if (dummyDB.length === 0) {
        messagesList.innerHTML = "<p>No messages found.</p>";
        return;
    }

    dummyDB.forEach((item) => {
        const card = document.createElement("div");
        card.className = "block-item";  
        card.style.marginTop = "10px";
        card.innerHTML = `
            <p><strong>Date:</strong> ${item.date}</p>
            <p><strong>Name:</strong> ${item.name}</p>
            <p><strong>Email:</strong> ${item.email}</p>
            <p><strong>Message:</strong> ${item.message}</p>
        `;
        messagesList.appendChild(card);
    });
}

document.getElementById("logout-btn").addEventListener("click", () => {
    userResponsesSection.style.display = "none";
    adminForm.reset();
    alert("Logged out successfully.");
});
