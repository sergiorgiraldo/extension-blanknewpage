document.getElementById("current-time").innerText = new Date().toLocaleString();

// Load settings from storage
chrome.storage.local.get(["timezones", "images", "showGUID"], (data) => {
    // Timezones
    const select = document.getElementById("timezone-select");
    const display = document.getElementById("timezone-display");
    
    if (data.timezones) {
        data.timezones.forEach(zone => {
            let option = document.createElement("option");
            option.value = zone;
            option.textContent = zone;
            select.appendChild(option);
        });

        let selectedZone = data.timezones[0] || "UTC"; // Default to UTC
        let date = new Intl.DateTimeFormat("en-US", { timeZone: selectedZone, timeStyle: "short" }).format(new Date());
        display.textContent = `${selectedZone}: ${date}`;
    }
    
    // GUID Toggle
    const guidContainer = document.getElementById("guid-container");
    guidContainer.style.display = data.showGUID ? "block" : "none";
    guidContainer.innerText = crypto.randomUUID();

    // Random Image
    const imgElement = document.getElementById("random-image");
    if (data.images && data.images.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.images.length);
        imgElement.src = data.images[randomIndex];
    }
});

// Fetch Movie Quote
fetch("https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY")
    .then(response => response.json())
    .then(data => {
        document.getElementById("quote").innerText = data.results[Math.floor(Math.random() * data.results.length)].overview;
    });
