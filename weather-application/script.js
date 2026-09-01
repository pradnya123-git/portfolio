let apiKey = "5c99d6b802a441e3b8360710260805";


/* Live Date & Time */

function updateTime(){

    let now = new Date();

    document.getElementById("dateTime").innerText =
        now.toLocaleString();
}

setInterval(updateTime,1000);



/* Get Weather */

async function getWeather(cityName = null){

    let city;

    if(cityName){

        city = cityName;
    }
    else{

        city = document.getElementById("city").value;
    }


    document.getElementById("loading").style.display =
    "block";


    let url =
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`;


    let response = await fetch(url);

    let data = await response.json();


    document.getElementById("loading").style.display =
    "none";


    if(data.error){

        alert(data.error.message);

        return;
    }


    /* Weather Condition */

    let condition =
    data.current.condition.text.toLowerCase();


    /* Suggestions */

    let suggestion = "";


    if(condition.includes("sunny")){

        suggestion =
        "😎 Wear sunglasses and stay hydrated.";
    }

    else if(condition.includes("rain")){

        suggestion =
        "☔ Carry an umbrella today.";
    }

    else if(condition.includes("cloud")){

        suggestion =
        "☁ Pleasant weather for a walk.";
    }

    else if(condition.includes("snow")){

        suggestion =
        "❄ Wear warm clothes.";
    }

    else{

        suggestion =
        "🌤 Have a great day.";
    }


    document.getElementById("suggestion").innerText =
    suggestion;



    /* Current Weather */

    document.getElementById("cityName").innerText =
    `${data.location.name}, ${data.location.country}`;

    document.getElementById("temperature").innerText =
    `${data.current.temp_c}°C`;

    document.getElementById("description").innerText =
    data.current.condition.text;

    document.getElementById("humidity").innerText =
    `💧 Humidity: ${data.current.humidity}%`;

    document.getElementById("wind").innerText =
    `🌬 Wind: ${data.current.wind_kph} kph`;

    document.getElementById("weatherIcon").src =
    "https:" + data.current.condition.icon;



    /* Forecast */

    let forecastHTML = "";


    data.forecast.forecastday.forEach(day => {

        forecastHTML += `

        <div class="forecast-card">

            <h4>${day.date}</h4>

            <img src="https:${day.day.condition.icon}">

            <p>${day.day.avgtemp_c}°C</p>

        </div>
        `;
    });


    document.getElementById("forecastBox").innerHTML =
    forecastHTML;
}



/* Enter Key Search */

document.getElementById("city")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        getWeather();
    }
});



/* Current Location */

function getLocationWeather(){

    navigator.geolocation.getCurrentPosition(

        async(position)=>{

            let lat = position.coords.latitude;

            let lon = position.coords.longitude;

            getWeather(`${lat},${lon}`);
        }
    );
}



/* Dark Mode */

document.getElementById("themeBtn")
.addEventListener("click", function(){

    document.body.classList.toggle("dark");
});