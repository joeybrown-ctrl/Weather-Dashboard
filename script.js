$(document).ready(function () {

    //logic for getting and parsing search history from local storage using JSON
    let locationArr = localStorage.getItem("locations");
    if (locationArr === null) {
        locationArr = [];
    } else {
        locationArr = JSON.parse(locationArr);
    }

    //function to display searched cities
    function displaySearches() {

        let sHistory = $("#searchHistory")
        sHistory.empty();

        for (let i = 0; i < locationArr.length; i++) {

            let sCity = $("<li>").text(locationArr[i]);
            sCity.addClass("list-group-item");
            sHistory.prepend(sCity);
        }
    }
    //first call for function to display searched cities
    displaySearches();

    //click function to show search history using API calls
    $(document).on("click", ".list-group-item", function () {

        let location = $(this).text()
        let apiKey = "ad17440b66c552dbcec2d851d01b43a3";
        let searchQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey + "&units=imperial";

        $.ajax({
            url: searchQuery,
            method: "GET"
        }).then(function (sResponse) {

            $("#city").text(sResponse.name);
            $("#temp").html("Temperature " + sResponse.main.temp + " &#176; F");
            $("#wind").text("Wind Speed: " + sResponse.wind.speed + " mph");
            $("#humidity").text("Humidity: " + sResponse.main.humidity + "%");
        })

        let fiveDayQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + apiKey + "&units=imperial";
        console.log(fiveDayQuery);

        $.ajax({
            url: fiveDayQuery,
            method: "GET"
        }).then(function (five) {
            console.log(five);

            let list = five.list
            console.log(list);
            $("#forecast-list").empty()

            for (let i = 0; i < list.length; i += 8) {

                let colDiv = $("<div class='col text-center align-items-center'>");
                let dateDiv = $("<h4 class='card-title'>").text(list[i].dt_txt.split(" ")[0]);
                let humidDiv = $("<p class='card-subtitle'>").text("Humidity: " + list[i].main.humidity + " %");
                let tempDiv = $("<p class='card-subtitle'>").html("Temp: " + list[i].main.temp + " &#176; F");
                let img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + list[i].weather[0].icon + "@2x.png");

                colDiv.append(dateDiv);
                colDiv.append(tempDiv);
                colDiv.append(humidDiv);
                colDiv.append(img);
                $("#forecast-list").append(colDiv);

            }
        })
    })

    //search city click event function
    $("#searchBtn").click(function () {

        let location = $("#searchInput").val();
        locationArr.push(location);

        //query for current forecast
        let apiKey = "ad17440b66c552dbcec2d851d01b43a3";
        let queryURl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey + "&units=imperial";

        //start of if statement logic 
        if (location !== "") {

            //ajax call for current forecast
            $.ajax({
                url: queryURl,
                method: "GET"
            }).then(function (response) {
                console.log(response);

                $("#city").text(response.name);
                $("#temp").html("Temperature " + response.main.temp + " &#176; F");
                $("#wind").text("Wind Speed: " + response.wind.speed + " mph");
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

                    // if(uv.value <= "2") {
                    //     $("#uv").addClass(".text-light bg-success");
                    // } else if(uv.value > "3" && uv.value < "5") {
                    //     $("#uv").addClass(".text-dark bg-warning");
                    // } else if(uv.value > "5" && uv.value < "7") {
                    //     $("#uv").addClass(".text-light bg-warning-dark");
                    // } else if(uv.value > "7" && uv.value < "10") {
                    //     $("#uv").addClass(".text-light bg-danger");
                    // } else if(uv.value > "11") {
                    //     $("#uv").addClass(".text-light bg-secondary-dark");
                    // }

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
                        $("#forecast-list").empty()

                        //for loop iterating through the list array
                        for (let i = 0; i < list.length; i += 8) {

                            //repeats five times
                            let colDiv = $("<div class='col text-center align-items-center'>");
                            let dateDiv = $("<h4 class='card-title'>").text(list[i].dt_txt.split(" ")[0]);
                            let humidDiv = $("<p class='card-subtitle'>").text("Humidity: " + list[i].main.humidity + " %");
                            let tempDiv = $("<p class='card-subtitle'>").html("Temp: " + list[i].main.temp + " &#176; F");
                            let img = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + list[i].weather[0].icon + "@2x.png");

                            colDiv.append(dateDiv);
                            colDiv.append(tempDiv);
                            colDiv.append(humidDiv);
                            colDiv.append(img);
                            $("#forecast-list").append(colDiv);

                        }

                        //setting items to local storage using JSON
                        console.log(locationArr);
                        localStorage.setItem("locations", JSON.stringify(locationArr));

                        //function call to display searched cities
                        displaySearches()
                    })
                })
            })

        //final else statement alerting user to enter city into input field
        } else {
            alert("Enter city into input field");
        };





    })

    //TO DO

    // WHEN I view the UV index
    // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

    // WHEN I click on a city in the search history
    // THEN I am again presented with current and future conditions for that city
    // WHEN I open the weather dashboard
    // THEN I am presented with the last searched city forecast
})