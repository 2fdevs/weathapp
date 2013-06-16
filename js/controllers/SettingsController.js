var settingsController = app.controller(
	"SettingsController",
	function SettingsController($scope, $location, MapsAPI, GeolocationAPI)
	{
		var defaultValue = "enter a city";
		$scope.mapMng = new MapManager('map-info');
		$scope.addressData = defaultValue;

		$scope.onClickGo = function()
		{
			MapsAPI.getCoordsByAddress($scope.addressData,
				function(response)
				{
					if (response.status == "OK")
					{
						var coords = response.results[0].geometry.location;
						$location.path("/" + coords.lat + "," + coords.lng);
					}
					else
					{
						$scope.addressData = defaultValue;
					}
				}
			);
		};

		$scope.onClickInput = function()
		{
			if ($scope.addressData == defaultValue)
			{
				$scope.addressData = "";
			}
		};

		$scope.onClickBack = function()
		{
			$location.path("/");
		};

		$scope.showMap = function()
		{
			GeolocationAPI.getPosition(
				function(coords)
				{
					if (coords)
					{
						$scope.mapMng.init([coords.lat, coords.lon], 12);
					}
				}
			);
		};

		var $settings;
		var $content;
		var viewHeight;

		viewHeight = Utils.getDocumentHeight();

		$settings = $('#settings');
		$content = $('#main-content');
		$content.height(viewHeight);

		$settings
			.css('display','block')
			.height(viewHeight);

		$settings.children('#data-entry').height(viewHeight/2);
		$settings.children('#map-info').height(viewHeight/2);

		TweenLite.from($settings, 1, {
			top: $settings.height()+'px',
			onComplete: $scope.showMap
		});
	}
);
