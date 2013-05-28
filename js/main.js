var startTime;
var firstLoad = true;
var childLoaded = false;

$(document).ready( function () {

	if (!checkFilters()){

		displayDialog("#error");
		return;
	}

	displayDialog('#dialog');
	animate();

	startTime = Date.now();

	$("#button").click( function() {

		if (!/^http:\/\//.test($("#url").val())) {
            $("#url").val("http://" + $("#url").val());
        }

		$("#frameOne").attr("src",
			$("#url").val()
		);
		$("#dialog").hide();
	});

	$('#url').keypress(function (e) {
		if (e.which == 13) {
            $(this).blur();
        	$('#button').focus().click();
			return false; 
		}
	});		

	$("#frameOne").load (function () {

		if (firstLoad) {
			firstLoad = false;
			return;
		}

		$("#frameOne")[0].contentWindow.postMessage("hello there!", "*");
		childLoaded = false;
		setTimeout(checkLoad, 2000);
	});
	
});

$(window).bind('message', function(e) {

	if (e.originalEvent.data == "child") childLoaded = true;
});

function displayDialog(name) {

	$(name).css({
		top:'50%',
		left:'50%',
		margin:'-'+($(name).height() / 2)+'px 0 0 -'+($(name).width() / 2)+'px'
	}).show();

}

function checkFilters() {

	var property = "filter"
	var value = "custom(none mix(url(http://www.example.com/)))";
	var prefixes = ["", "-webkit-", "-moz-", "-ms-", "-o-"];

	var div = $("<div />");
	for (var i = 0; i < prefixes.length; ++i) {
		var prefixedProperty = prefixes[i] + property;
		if (div.css(prefixedProperty, value).css(prefixedProperty) == value)
		    return true;
	}
	return false;

}

function checkLoad() {
	if (childLoaded) {
		//console.log("Failed to load");
		displayDialog('#dialog');
	} else {
		//console.log("Load successful!")
	}
}

function animate() {

	var elapsedTime = Date.now() - startTime;

	$("#frameOne").css(
		'-webkit-filter',
		'custom(url(shaders/distortion.vs) mix(url(shaders/distortion.fs) screen source-atop), 1 128 , time '+elapsedTime+')'
	);			

	window.requestAnimationFrame(animate);

};
