var homeController = app.controller(
	"HomeController",
	function HomeController($scope, $location, $routeParams, weatherData, MapsAPI)
	{	
		$scope.mapMng = new MapManager('map-info');
		$scope.weatherData = weatherData;
		$scope.weatherData.currently.temperature = Math.round($scope.weatherData.currently.temperature);
		$scope.addressData = "";


		$scope.onClickSettings = function()
		{
			$location.path("/settings");
		};

		$scope.showHome = function(viewHeight)
		{
			var $home;

			$home = $('#home');

			$home.css('display','block');
			$home.height(viewHeight);
			$home.children('#weather-info').height(viewHeight/2);
			$home.children('#map-info').height(viewHeight/2);

			TweenLite.from($home, 1, {
				top: $home.height()+'px',
				onComplete: $scope.showMap
			});
		};

		$scope.showMap = function()
		{
			$scope.mapMng.init([$scope.weatherData.latitude,$scope.weatherData.longitude], 12);
		};

		var viewHeight,
			loaderPos,
			$loading,
			$content;

		$loading = $('#loading');
		$content = $('#main-content');

		viewHeight = Utils.getDocumentHeight();
		loaderPos = Utils.getCenterCoordinates($loading.width(), $loading.height());

		$content.height(viewHeight);

		$loading
			.css('left', loaderPos.x+'px')
			.css('top', loaderPos.y+'px');

		TweenLite.to($loading, 1, {
			opacity: 0,
			onComplete: $scope.showHome,
			onCompleteParams: [viewHeight]
		});

		MapsAPI.getAddressByCoords($scope.weatherData,
			function(response)
			{
				if (response.status == "OK")
				{
					$scope.addressData = response.results[0].address_components[2].long_name + ", " + response.results[0].address_components[5].long_name;
				}
				else
				{
					$scope.addressData = "Error getting address";
				}
			}
		);
	}
);

homeController.getWeatherData = function($q, $rootScope, $route, ForecastAPI, GeolocationAPI)
{	
	var deferred = $q.defer();

	if ($route.current.params.lat && $route.current.params.lon)
	{
		ForecastAPI.getWeather($route.current.params.lat, $route.current.params.lon,
			function(response)
			{
				deferred.resolve(response.contents);
			}
		);
	}
	else
	{
		GeolocationAPI.getPosition(
			function(coords)
			{
				if (coords)
				{
					ForecastAPI.getWeather(coords.lat, coords.lon,
						function(response)
						{
							deferred.resolve(response.contents);
						}
					);
				}
			}
		);
	}

	return deferred.promise;
};
