# Weather-Dashboard

**version 1.0.0**

[For deployed version, click me](https://joeybrown-ctrl.github.io/Weather-Dashboard/)

For week five of bootcamp, I was assigned with creating a weather dashboard where a user can enter a city into the search input, and be returned a current weather forecast, a five-day-forecast, and the UV index for that city. The user's searches are saved to a list, and the forecasts for those cities can be viewed by clicking on the city within the list. 
<br>

## Making the Front-End

I built the front-end using Bootstrap. I chose card elements for the forecast queries, and a list group and form input for the search element and search history list. I used jQuery to create and append the five-day-forecast and list group to the document, and then used Bootstrap and HTML for the current forecast. I chose to use this combination mostly to challenge my own comprehension of how these two different methods work when building out the front-end.
<br><hr>

![Image of Weather-Dashboard web page](https://github.com/joeybrown-ctrl/Weather-Dashboard/blob/master/images/forecast-pic.png)
<br>

## Using OpenWeather APIs

I used AJAX to make API calls to three of OpenWeather's APIs: Current Weather Data, 5 Day/3 Hour Forecast, and UV Index. Using a combination of JavaScript and jQuery, I wrapped these calls in a search function, and coded logic using for loops, as well as if/else statements ensuring that the user enters a city into the search input. Using JSON, the user's searches are set to local storage, then saved to a search history list on the web page. The user's searches persist until they are manually cleared from the user's local storage.
<br><hr>

![Image of text input saved in local storage](https://github.com/joeybrown-ctrl/Weather-Dashboard/blob/master/images/local-storage-pic.png)
<br>

## Built With

* [OpenWeather APIs](https://openweathermap.org/api)
* [Visual Studio Code](https://code.visualstudio.com/)
* [jQuery](https://jquery.com/)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [Bootstrap 4](https://getbootstrap.com/)
* [HTML 5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
* [Markdown](https://guides.github.com/features/mastering-markdown/) 


## Contributors

-Joey Brown <br> <gjoey.brown@gmail.com> <br> &copy; 2020 Joey Brown. All rights reserved.