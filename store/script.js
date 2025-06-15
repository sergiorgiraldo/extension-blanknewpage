document.getElementById("current-time").innerText = new Date().toLocaleString();
// Load settings from storage
chrome.storage.local.get(["timezones", "images", "showGUID"], (data) => {

    // Timezones
    const display = document.getElementById("timezone-display");
    
    if (data.timezones) {
        data.timezones.forEach(zone => {
            let date = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeStyle: "short", hour12: false}).format(new Date());
            display.textContent += `${zone}: ${date}\r\n`;
        });
    }
    
    // GUID Toggle
    console.log(data.showGUID);
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
fetch("movies.json")
    .then(response => response.json())
    .then(data => {
        document.getElementById("quote").innerText = data.movieQuotes[Math.floor(Math.random() * data.movieQuotes.length)];
    });
