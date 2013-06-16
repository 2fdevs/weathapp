function MapManager(domId)
{
	this.APIKEY = '<YOUR_API_KEY>';
	this.map = null;
	this.markers = [];
	this.domMap = document.getElementById(domId);
}

MapManager.prototype.init = function(center, zoom) 
{
	this.map = L.map(this.domMap, {
		center: center,
		zoom: zoom,
		scrollWheelZoom: false
	});

	L.tileLayer('http://{s}.tile.cloudmade.com/'+this.APIKEY+'/997/256/{z}/{x}/{y}.png', {
	attribution: 'Mapa &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> gracias a, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a>', maxZoom: 18}).addTo(this.map);
};