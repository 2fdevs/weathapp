var app = angular.module(
	"WeathApp", ["ngResource"]
);

app.factory("ForecastAPI",
	function($http)
	{
		return {
            // PhoneGap Prefix: http://twofuckingdevelopers.com/examples/adobecreativedays/
			URL: "ba-simple-proxy.php?url=https://api.forecast.io/forecast/<YOUR_FORCASTIO_API_KEY>/",
			// URL: "https://api.forecast.io/forecast/<YOUR_FORCASTIO_API_KEY>/",
			getWeather: function(lat, lon, callback)
			{
				var url = this.URL + lat + "," + lon + "?units=si";

				$http.get(url).success(
					function(response)
					{
						callback(response);
					}
				);
			}
		}
	}
);

app.factory("MapsAPI",
	function($http)
	{
		return {
            // PhoneGap Prefix: http://twofuckingdevelopers.com/examples/adobecreativedays/
			URL: "ba-simple-proxy.php?url=http://maps.googleapis.com/maps/api/geocode/json",
			// URL: "http://maps.googleapis.com/maps/api/geocode/json?address=",
			getCoordsByAddress: function(address, callback)
			{
				var encodedAddress = encodeURI(address);
				encodedAddress = encodedAddress.replace(/%20/g, '+');
				var url = this.URL + "?address%3D" + encodedAddress + "%26sensor%3Dfalse";

				$http.get(url).success(
					function(response)
					{
						callback(response.contents);
					}
				);
			},
			getAddressByCoords: function(coords, callback)
			{
				var url = this.URL + "?latlng%3D" + coords.latitude + "," + coords.longitude + "%26sensor%3Dfalse";

				$http.get(url).success(
					function(response)
					{
						callback(response.contents);
					}
				);
			}
		}
	}
);

app.factory("GeolocationAPI",
	function()
	{
		return {
			getPosition: function(callback)
			{
				if (navigator.geolocation)
				{
					navigator.geolocation.getCurrentPosition(
						function(position)
						{
							callback({lat: position.coords.latitude, lon: position.coords.longitude});
						},
						function(msg)
						{
							callback(null);
						}
					);
				}
				else
				{
					callback(null);
				}
			}
		};
	}
);

app.config(
	function ($routeProvider, $compileProvider)
	{
		// $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
		
		$routeProvider.when("/",
		{
			templateUrl: "partials/home.html",
			controller: "HomeController",
			resolve: {
				weatherData: homeController.getWeatherData
			}
		})
		.when("/:lat,:lon",
		{
			templateUrl: "partials/home.html",
			controller: "HomeController",
			resolve: {
				weatherData: homeController.getWeatherData
			}
		})
		.when("/settings",
		{
			templateUrl: "partials/settings.html",
			controller: "SettingsController"
		})
		.otherwise({redirectTo: '/'});
	}
);

