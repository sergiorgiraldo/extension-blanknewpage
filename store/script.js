// Load settings from storage
chrome.storage.local.get(["timezones", "timezonecurrent", "images", "showGUID"], (data) => {

    // Timezones
    const displayToday = document.getElementById("current-time");
    if (data.timezonecurrent) {
            let date = new Intl.DateTimeFormat("en-US", { timeZone: data.timezonecurrent, timeStyle: "short", hour12: false}).format(new Date());
            displayToday.textContent += `${data.timezonecurrent}: ${date}\r\n`;
    }

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
        quote = data.movieQuotes[Math.floor(Math.random() * data.movieQuotes.length)].split("\"");        
        document.getElementById("quote").innerText = quote[1];
        document.getElementById("film").innerText = quote[2];
    });
