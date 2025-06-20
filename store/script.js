// Load settings from storage
chrome.storage.local.get(["weathercurrent", "timezones", "timezonecurrent", "images", "showGUID"], (data) => {

    // Timezones
    const displayToday = document.getElementById("current-time");
    if (data.timezonecurrent) {
            let date = new Intl.DateTimeFormat("en-US", { timeZone: data.timezonecurrent, timeStyle: "short", hour12: false}).format(new Date());
            displayToday.textContent += `${data.timezonecurrent}: ${date}\r\n`;
    }
    else{
        document.getElementById("reminder").style.display = "block";
    }

    const display = document.getElementById("timezone-display");
    
    if (data.timezones) {
        data.timezones.forEach(zone => {
            let date = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeStyle: "short", hour12: false}).format(new Date());
            display.textContent += `${zone}: ${date}\r\n`;
        });
    }
    
    if (data.weathercurrent){
        let zone = data.weathercurrent.split('/')[1];
        fetch(`https://wttr.in/${zone}?format=%l:+%C+%t(%f)`)
            .then((response) => response.text())
            .then((data) => {
                document.getElementById("wthr").innerHTML += "<br />" + data;
            })
            .catch((error) => {
                console.error(error);
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
