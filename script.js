$(document).ready(function () {
    
    //search click event
    $("#searchBtn").click(function () {

        let location = $("#searchInput").val();
        let apiKey = "ad17440b66c552dbcec2d851d01b43a3";
        let queryURl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey + "&units=imperial";

        if (location !== "") {

                    //first ajax call
                    $.ajax({
                        url: queryURl,
                        method: "GET"
                    }).then(function (response) {
                        console.log(response);

                        $("#city").text(response.name);
                        $("#temp").html("Temperature " + response.main.temp + " &#176; F");
                        $("#wind").text("Wind Speed: " + response.wind.speed + " km/h");
                        $("#humidity").text("Humidity: " + response.main.humidity + "%");
                        

                        //query for UV index
                        let uvQuery = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&units=imperial"

                        console.log(uvQuery)

                        //ajax call for UV index
                        $.ajax({
                            url: uvQuery,
                            method: "GET"
                        }).then(function (uv) {
                            console.log(uv);

                            $("#uv").text("UV Index: " + uv.value);

                            //query for five-day-forecast
                            let forecastQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + apiKey + "&units=imperial";

                            console.log(forecastQuery);
                            //ajax call for five-day-forecast
                            $.ajax({
                                url: forecastQuery,
                                method: "GET"
                            }).then(function (forecast) {
                                console.log(forecast);

                                let list = forecast.list
                                console.log(list);

                                for (let i = 7; i < list.length; i += 8) {

                                    $(".humidity").text(list[i].main.humidity);
                                    $(".date").text(list[i].dt_txt);
                                    $(".temp").text(list[i].main.temp)
                                    
                                }

                                localStorage.setItem("location", location);

                            })


                        })

                    })


        }else {
            alert("Enter location into input field");
        };





        });





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