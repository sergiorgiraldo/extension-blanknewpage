function getWeather() {
	fetch("https://wttr.in/Utrecht?format=%l:+%C+%t(%f)")
		.then((response) => response.text())
		.then((data) => {
			document.getElementById("wthru").innerHTML = data;
		})
		.catch((error) => {
			console.error(error);
		});

	fetch("https://wttr.in/Amsterdam?format=%l:+%C+%t(%f)")
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
		"16.jpg",
		"17.jpg",
		"18.jpg",
		"19.jpg",
		"20.jpg",
		"21.jpg",
		"22.jpg",
		"23.jpg",
		"24.jpg",
		"25.jpg",
		"26.jpg",
		"27.jpg",
		"28.jpg",
		"29.jpg"
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

	document.getElementById(
		"clock"
	).innerHTML = `${now.toLocaleDateString()}<br/>${hours}:${minutes}:${seconds} | CET`;

	let options = {
		timeZone: "America/Los_Angeles",
		hour12: false,
		hour: "numeric",
		minute: "numeric",
		second: "numeric"
	};
	const timeInLA = now.toLocaleString("en-US", options);
	document.getElementById("zones").innerHTML = `LA: ${timeInLA} | PST`;

	options = {
		timeZone: "America/New_York",
		hour12: false,
		hour: "numeric",
		minute: "numeric",
		second: "numeric"
	};
	const timeInNY = now.toLocaleString("en-US", options);
	document.getElementById("zones").innerHTML += `<br/>NY: ${timeInNY} | EST`;

	options = {
		timeZone: "America/Sao_Paulo",
		hour12: false,
		hour: "numeric",
		minute: "numeric",
		second: "numeric"
	};
	const timeInSP = now.toLocaleString("en-US", options);
	document.getElementById("zones").innerHTML += `<br/>SP: ${timeInSP} `;

	options = {
		timeZone: "Europe/London",
		hour12: false,
		hour: "numeric",
		minute: "numeric",
		second: "numeric"
	};
	const timeInUCT = now.toLocaleString("en-US", options);
	document.getElementById("zones").innerHTML += `<br/>UK: ${timeInUCT} | GMT`;

	options = {
		timeZone: "Asia/Kolkata",
		hour12: false,
		hour: "numeric",
		minute: "numeric",
		second: "numeric"
	};
	const timeInMumbai = now.toLocaleString("en-US", options);
	document.getElementById("zones").innerHTML += `<br/>IN: ${timeInMumbai} `;

	options = {
		timeZone: "Asia/Manila",
		hour12: false,
		hour: "numeric",
		minute: "numeric",
		second: "numeric"
	};
	const timeInManilla = now.toLocaleString("en-US", options);
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

function getGuid() {
	const g = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			var r = (Math.random() * 16) | 0,
				v = c == "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		}
	);
	document.getElementById("guid").innerHTML = g;
}

window.onload = () => {
	getWeather();
	getQuote();
	getImage();
	updateClock();
	getGuid();
};
