// Load stored settings on page load
document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["timezones", "images", "showGUID"], (data) => {
        // Timezones
        if (data.timezones) {
            data.timezones.forEach(zone => addTimezoneToList(zone));
        }

        // Images
        if (data.images) {
            data.images.forEach(img => addImageToList(img));
        }

        // GUID Toggle
        document.getElementById("toggle-guid").checked = data.showGUID || false;
    });
});

// Timezone Management
document.getElementById("add-timezone").addEventListener("click", () => {
    let selectedZone = document.getElementById("timezone-select").value;
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
    list.appendChild(item);
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

document.getElementById("delete-image").addEventListener("click", () => {
    chrome.storage.local.set({ images: [] });
    document.getElementById("image-list").innerHTML = "";
});

function addImageToList(imgSrc) {
    let list = document.getElementById("image-list");
    let item = document.createElement("li");
    let img = document.createElement("img");
    img.src = imgSrc;
    img.style.width = "50px";
    img.style.height = "50px";
    item.appendChild(img);
    list.appendChild(item);
}

// GUID Toggle
document.getElementById("toggle-guid").addEventListener("change", () => {
    let showGUID = document.getElementById("toggle-guid").checked;
    chrome.storage.local.set({ showGUID });
});
