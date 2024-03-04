function getWeather() {
	fetch("https://wttr.in/Utrecht?format=%l:+%c+%t(%f)")
		.then((response) => response.text())
		.then((data) => {
			document.getElementById("wthru").innerHTML = data;
		})
		.catch((error) => {
			console.error(error);
		});

	fetch("https://wttr.in/Amsterdam?format=%l:+%c+%t(%f)")
		.then((response) => response.text())
		.then((data) => {
			document.getElementById("wthru").innerHTML += "<br />" + data;
		})
		.catch((error) => {
			console.error(error);
		});
}

function getImage() {
	const images = [
		"1.jpg",
		"2.jpg",
		"3.jpg",
		"4.jpg",
		"5.jpg",
		"6.jpg",
		"7.jpg",
		"8.jpg",
		"9.jpg",
		"10.jpg",
		"11.jpg",
		"12.jpg",
		"13.jpg",
		"14.jpg",
		"15.jpg",
		"16.jpg"
	];

	const randomIndex = Math.floor(Math.random() * images.length);
	const randomImage = images[randomIndex];

	let el = document.querySelector("#k");
	el.src = randomImage;
}

function updateClock() {
	const now = new Date();

	let hours = String(now.getHours()).padStart(2, "0");
	let minutes = String(now.getMinutes()).padStart(2, "0");
	let seconds = String(now.getSeconds()).padStart(2, "0");

	document.getElementById("clock").innerHTML = `${now.toLocaleDateString()}<br/>${hours}:${minutes}:${seconds} `;
    
    let options = {timeZone: 'America/Los_Angeles', hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'};
    const timeInLA = now.toLocaleString('en-US', options);
    document.getElementById("zones").innerHTML = `LA: ${timeInLA} `;

    options = {timeZone: 'America/New_York', hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'};
    const timeInNY = now.toLocaleString('en-US', options);
    document.getElementById("zones").innerHTML += `<br/>NY: ${timeInNY} `;

    options = {timeZone: 'America/Sao_Paulo', hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'};
    const timeInSP = now.toLocaleString('en-US', options);
    document.getElementById("zones").innerHTML += `<br/>SP: ${timeInSP} `;
    
    options = {timeZone: 'Europe/London', hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'};
    const timeInUCT = now.toLocaleString('en-US', options);
    document.getElementById("zones").innerHTML += `<br/>GMT: ${timeInUCT} `;

    options = {timeZone: 'Asia/Kolkata', hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'};
    const timeInMumbai = now.toLocaleString('en-US', options);
    document.getElementById("zones").innerHTML += `<br/>IN: ${timeInMumbai} `;

    options = {timeZone: 'Asia/Manila', hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric'};
    const timeInManilla = now.toLocaleString('en-US', options);
    document.getElementById("zones").innerHTML += `<br/>PH: ${timeInManilla} `;


	setTimeout(updateClock, 1000); // Update every second
}

function getQuote() {
	fetch("./quotes.json")
		.then((response) => response.json())
		.then((data) => {
			const movies = data.movieQuotes;
			const randomMovie = Math.floor(Math.random() * movies.length);
			const movie = movies[randomMovie];

			const quotes = movie.quotes;
			const title = movie.title + " (" + movie.year + ")";
			const randomQuote = Math.floor(Math.random() * quotes.length);
			const quote = quotes[randomQuote];

			document.getElementById("title").innerHTML = title;
			document.getElementById("quote").innerHTML = quote;
		})
		.catch((error) => {
			console.error(error);
		});
}

window.onload = () => {
	getWeather();
	getQuote();
	getImage();
	updateClock();
};
