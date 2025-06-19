// Load stored settings on page load
document.addEventListener("DOMContentLoaded", () => {
	chrome.storage.local.get(
		[
			"weathercurrent",
			"timezones",
			"timezonecurrent",
			"images",
			"showGUID"
		],
		(data) => {
			// Timezones
			if (data.timezones) {
				data.timezones.forEach((zone) => addTimezoneToList(zone));
			}
			if (data.timezonecurrent) {
				document.getElementById("timezone-current").innerText =
					data.timezonecurrent;
			}

			//Weather
			if (data.weathercurrent) {
				document.getElementById("weather-current").innerText =
					data.weathercurrent;
			}

			// Images
			if (data.images) {
				data.images.forEach((img) => addImageToList(img));
			}

			// GUID Toggle
			document.getElementById("toggle-guid").checked =
				data.showGUID || false;
		}
	);

    $(".js-example-basic-single").select2();
});

// Weather Management
document.getElementById("btnSetWeather").addEventListener("click", () => {
	let selectedWeather = document.getElementById("selWeather").value;
	chrome.storage.local.get("weathercurrent", (data) => {
		chrome.storage.local.set({ weathercurrent: selectedWeather });
	});
	document.getElementById("weather-current").innerText = selectedWeather;
});

// Timezone Management
document.getElementById("btnSetTimezone").addEventListener("click", () => {
	let selectedZone = document.getElementById("selSetTimezone").value;
	chrome.storage.local.get("timezonecurrent", (data) => {
		chrome.storage.local.set({ timezonecurrent: selectedZone });
	});
	document.getElementById("timezone-current").innerText = selectedZone;
});
document.getElementById("btnAddTimezone").addEventListener("click", () => {
	let selectedZone = document.getElementById("selAddTimezone").value;
	chrome.storage.local.get("timezones", (data) => {
		let timezones = data.timezones || [];
		if (!timezones.includes(selectedZone)) {
			timezones.push(selectedZone);
			chrome.storage.local.set({ timezones });
			addTimezoneToList(selectedZone);
		}
	});
});

function addTimezoneToList(zone) {
	let list = document.getElementById("timezone-list");
	let item = document.createElement("li");
	item.textContent = zone;
	item.addEventListener("click", (event) => {
		removeTimezone(event, zone);
	});
	list.appendChild(item);
}

function removeTimezone(event, zone) {
	event.target.remove();
	chrome.storage.local.get("timezones", (data) => {
		let timezones = data.timezones || [];
		let index = timezones.indexOf(zone);
		if (index !== -1) {
			timezones.splice(index, 1);
		}
		chrome.storage.local.set({ timezones });
	});
}


// Image Management
document.getElementById("upload-image").addEventListener("change", (event) => {
	let file = event.target.files[0];
	if (file) {
		let reader = new FileReader();
		reader.onload = () => {
			chrome.storage.local.get("images", (data) => {
				let images = data.images || [];
				images.push(reader.result);
				chrome.storage.local.set({ images });
				addImageToList(reader.result);
			});
		};
		reader.readAsDataURL(file);
	}
});

function addImageToList(imgSrc) {
	let list = document.getElementById("image-list");
	let item = document.createElement("li");
	let img = document.createElement("img");
	img.src = imgSrc;
	img.style.width = "50px";
	img.style.height = "50px";
	item.addEventListener("click", (event) => {
		removeImage(event, imgSrc);
	});
	item.appendChild(img);
	list.appendChild(item);
}

function removeImage(event, src) {
	event.target.remove();
	chrome.storage.local.get("images", (data) => {
		let images = data.images || [];
		let index = images.indexOf(src);
		if (index !== -1) {
			images.splice(index, 1);
		}
		chrome.storage.local.set({ images });
	});
}

// GUID Toggle
document.getElementById("toggle-guid").addEventListener("change", () => {
	let showGUID = document.getElementById("toggle-guid").checked;
	chrome.storage.local.set({ showGUID });
});
