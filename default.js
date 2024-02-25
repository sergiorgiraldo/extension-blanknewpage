    const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg"];
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];
    var element = document.querySelector("html");
    element.style.backgroundImage = "url(" + randomImage + ")";
  	element.style.backgroundRepeat = "no-repeat";
	element.style.backgroundPosition = "center center";
	element.style.backgroundAttachment = "fixed";  
	element.style.backgroundSize = "cover";

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        document.getElementById("wthru").innerHTML = this.responseText;
    }
    };
    xhr.open("GET", "https://wttr.in/Utrecht?format=%l:+%c+%t(%f)");
    xhr.send();

    const xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        document.getElementById("wthra").innerHTML = this.responseText;
    }
    };
    xhr2.open("GET", "https://wttr.in/Amsterdam?format=%l:+%c+%t(%f)");
    xhr2.send();

    function updateClock() {
        const now = new Date();
        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');
        let seconds = String(now.getSeconds()).padStart(2, '0');
        
        document.getElementById('clock').innerHTML = `${hours}:${minutes}:${seconds}<br/>${now.toLocaleDateString()} `;
        
        setTimeout(updateClock, 1000); // Update every second
    }
    
    window.onload = () => {
        updateClock();
    };