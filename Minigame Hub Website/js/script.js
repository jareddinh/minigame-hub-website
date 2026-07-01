const pages = [
    {
        name: "Tic Tac Toe",
        url: "tic-tac-toe.html",
        img: "images/tic-tac-toe.png"
    },
    {
        name: "Memory Game",
        url: "memory-game.html",
        img: "images/memory-game.png"
    },
    {
        name: "Guess the Number",
        url: "guess-the-number.html",
        img: "images/guess-the-number.png"
    },
    {
        name: "Scissors Paper Rock",
        url: "scissors-paper-rock.html",
        img: "images/scissors-paper-rock.png"
    }
];

let searchInput;
let searchResults;

const contactForm = document.getElementById("contact-form");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formMessage = document.getElementById("form-message");

document.addEventListener("DOMContentLoaded", () => {
    // Search Bar
    searchInput = document.getElementById("search-input");
    searchResults = document.getElementById("search-results");

    searchInput.addEventListener("input", showResults);

    // Contact Form (Contact Page Only)
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            validateForm();
        });
    }
});

function showResults() {
    // Set input to lowercase
    const searchTerm = searchInput.value.toLowerCase();

    searchResults.innerHTML = "";

    // Empty input
    if (searchTerm === "") {
        searchResults.style.display = "none";
        return;
    }

    // Find games that include search input
    const pageMatches = [];

    for (let page of pages) {
        if (page.name.toLowerCase().includes(searchTerm)) {
            pageMatches.push(page);
        }
    }
   
    // No results if no game found
    if (pageMatches.length === 0) {
        searchResults.style.display = "none";
        return;
    }

    // Create a <li> element for each game that matches input
    for (let page of pageMatches) {
        const li = document.createElement("li");

        li.innerHTML = `
            <a href="${page.url}">
                <img src=${page.img}>${page.name}
            </a>
        `;

        searchResults.appendChild(li);
    }

    // Show results
    searchResults.style.display = "block";
}

function validateForm() {
    const email = emailInput.value;
    const emailMessage = messageInput.value;

    // Empty Email
    if (email === "") {
        formMessage.textContent = "Please enter your email.";
        formMessage.style.color = "#FF4E4E";
        emailInput.classList.add("invalid");
        return;
    }

    // No "@" in Email
    if (!email.includes("@")) {
        formMessage.textContent = "Please enter a valid email.";
        formMessage.style.color = "#FF4E4E";
        emailInput.classList.add("invalid");
        return;
    }

    // Empty Message
    if (emailMessage === "") {
        emailInput.classList.remove("invalid");
        formMessage.textContent = "Please enter a message.";
        formMessage.style.color = "#FF4E4E";
        messageInput.classList.add("invalid");
        return;
    }

    // Valid Inputs
    emailInput.classList.remove("invalid");
    messageInput.classList.remove("invalid");
    formMessage.textContent = "Message sent successfully!";
    formMessage.style.color = "#4CFF7A";

    // Reset Inputs
    contactForm.reset();
}