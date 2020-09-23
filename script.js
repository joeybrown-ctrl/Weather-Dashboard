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

    //functions containing API calls
    function queries(location) {

        //API key and query for Current Forecast
        let apiKey = "ad17440b66c552dbcec2d851d01b43a3";
        let searchQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey + "&units=imperial";

        //ajax call for Current Forecast
        $.ajax({
            url: searchQuery,
            method: "GET"
        }).then(function (response) {

            $("#city").text(response.name);
            $("#temp").html("Temperature " + response.main.temp + " &#176; F");
            $("#wind").text("Wind Speed: " + response.wind.speed + " mph");
            $("#humidity").text("Humidity: " + response.main.humidity + "%");


        //query for UV index
        let uvQuery = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + response.coord.lat + "&lon=" + response.coord.lon 

        console.log(uvQuery)

        //ajax call for UV index
        $.ajax({
            url: uvQuery,
            method: "GET"
        }).then(function (uv) {
            console.log(uv);

            $("#uv").text("UV Index: " + uv.value);

            //logic to change color of UV Index
            console.log(uv.value);
            if (uv.value <= 2) {
                $("#uv").addClass(".text-light");
                $("#uv").attr("style", "background-color: green");
            } else if (uv.value > 3 && uv.value <= 5) {
                $("#uv").addClass(".text-light");
                $("#uv").attr("style", "background-color: yellow");
            } else if (uv.value > 5 && uv.value <= 7) {
                $("#uv").addClass(".text-light");
                $("#uv").attr("style", "background-color: orange");
            } else if (uv.value > 7 && uv.value < 10) {
                $("#uv").addClass(".text-light");
                $("#uv").attr("style", "background-color: red");
            } else if (uv.value > 11) {
                $("#uv").addClass(".text-light");
                $("#uv").attr("style", "background-color: violet");
            }
        })

    })
        //query for 5-Day Forecast
        let fiveDayQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&appid=" + apiKey + "&units=imperial";
        console.log(fiveDayQuery);

        //ajax call to 5-Day Forecast
        $.ajax({
            url: fiveDayQuery,
            method: "GET"
        }).then(function (five) {
            console.log(five);

            let list = five.list
            console.log(list);
            $("#forecast-list").empty()

            //for loop iterating through array of days/hours and appending elements to document
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
    }
    

    //search city click event function
    $("#searchBtn").click(function() {
        let location = $("#searchInput").val();
        locationArr.push(location)
        queries(location)

         //setting items to local storage using JSON
        console.log(locationArr);
        localStorage.setItem("locations", JSON.stringify(locationArr));

        //function call to display searched cities
        displaySearches()

    })

    //click function to show search history
    $(document).on("click", ".list-group-item", function(){
        let location = $(this).text()
        queries(location)
    })

     //function call to display searched cities
    displaySearches();

})