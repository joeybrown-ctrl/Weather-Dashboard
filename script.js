$(document).ready(function () {
    //console.log("document ready");

    let location = "Tucson";
    let apiKey = "ad17440b66c552dbcec2d851d01b43a3";
    let queryURl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;


    $.ajax({
        url: queryURl,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $("#city").text(response.name);
        $("#wind").text("Wind Speed: " + response.wind.speed + " km/h");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");

        let temp = (response.main.temp - 273.15) * 1.80 + 32;
        $("#temp").html("Temperature " + temp.toFixed(2) + " &#176; F");

        let uvQuery = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon

        console.log(uvQuery)

        $.ajax({
            url: uvQuery,
            method: "GET"
        }).then(function (uv) {
            console.log(uv);

            $("#uv").text("UV Index: " + uv.value);
        })

        let forecastQuery = "http://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + apiKey;

        console.log(forecastQuery);

        $.ajax({
            url: forecastQuery,
            method: "GET"
        }).then(function (forecast) {

            console.log(forecast);

            let list = forecast.list

            for (let i = 7; i < list.length; i + 8) {

            }

            //write in date, humidity, icon
            // let title = $("<h6>").addClass("card-text").text("Temp: " + forecast.list[0].main.temp_max)
            // let p1 = $("<p>").addClass("card-text").text("Date: " + forecast.list[0].main.temp_max)
            // let p2 = $("<p>").addClass("card-text").text("Humidity: " + forecast.list[0].main.temp_max)

            // let img = $("<img>").addClass("card-text").text( + forecast.list[0].main.temp_max)

            // col.append(card.append(body.append(title, img, p1, p2)));


        })

        //let searchEl = $("<input>").addClass("input-group-text")

    })








})




// # 06 Server-Side APIs: Weather Dashboard

// Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

// Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

// ## User Story

// ```
// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly
// ```

// ## Acceptance Criteria

// ```
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
// ```

// The following image demonstrates the application functionality:

// ![weather dashboard demo](./Assets/06-server-side-apis-homework-demo.png)

// ## Review

// You are required to submit the following for review:

// * The URL of the deployed application.

// * The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.