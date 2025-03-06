document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("city-input");
    const dropdown = document.getElementById("city-dropdown");
    const options = document.querySelectorAll(".city-option");
    const datePicker = document.getElementById("date-picker");

    
    flatpickr(datePicker, {
        mode: "range",
        dateFormat: "d M Y",
        minDate: "today",
        locale: "ua"
    });

    
    input.addEventListener("input", () => {
        dropdown.style.display = input.value.trim() ? "block" : "none";
    });

    
    options.forEach(option => {
        option.addEventListener("click", () => {
            input.value = option.getAttribute("data-city");
            dropdown.style.display = "none";
            datePicker.focus();
        });
    });

    
    document.addEventListener("click", (event) => {
        if (!input.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const cityInput = document.getElementById("city-input");
    const cityDropdown = document.getElementById("city-dropdown");
    const cityOptions = document.querySelectorAll(".city-option");
    const searchButton = document.querySelector(".search");

    
    cityOptions.forEach(option => {
        option.addEventListener("click", function () {
            cityInput.value = this.getAttribute("data-city");
            cityDropdown.style.display = "none";
            localStorage.setItem("selectedCity", cityInput.value);
        });
    });

    
    searchButton.addEventListener("click", function (event) {
        if (cityInput.value.trim() === "") {
            alert("Будь ласка, виберіть місто!");
            event.preventDefault();
        } else {
            localStorage.setItem("selectedCity", cityInput.value);
            setTimeout(() => {
                window.location.href = "catalog.html";
            }, 100); 
        }
    });

    
    if (window.location.pathname.includes("catalog.html")) {
        const selectedCity = localStorage.getItem("selectedCity");
        if (selectedCity) {
            const hotelCards = document.querySelectorAll(".card-container > div");
            hotelCards.forEach(card => {
                const location = card.querySelector(".location").textContent.trim();
                if (!location.includes(selectedCity)) {
                    card.style.display = "none";
                } else {
                    card.style.display = "flex";
                }
            });
        }
    }
});











