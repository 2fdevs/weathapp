function Utils() {}

Utils.getDocumentHeight = function()
{
	var body = document.body,
   html = document.documentElement;

	return Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
} 

Utils.getCenterCoordinates = function(wObj, hObj)
{
	var w,
	h,
	coord;

	coord = {};
	w = $(window).outerWidth();
	h = $(window).outerHeight();
	coord.x = (w - wObj)/2;
	coord.y = (h - hObj)/2;

	return coord;
}