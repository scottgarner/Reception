var startTime;
var firstLoad = true;
var childLoaded = false;

$(document).ready( function () {

	displayDialog();
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

function displayDialog() {

	$("#dialog").css({
		top:'50%',
		left:'50%',
		margin:'-'+($('#dialog').height() / 2)+'px 0 0 -'+($('#dialog').width() / 2)+'px'
	}).show();

}

function checkLoad() {
	if (childLoaded) {
		//console.log("Failed to load");
		displayDialog();
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
