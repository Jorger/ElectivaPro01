$(function()
{
	$("#ejecuta").click(function(event)
	{
		//alert($("#tipoanima").val());
		$("#animar").addClass('animated ' + $("#tipoanima").val());
		$("#animar").css({
			"color": 'red',
			"background-color": 'gray'
		});
		//$("#animar").on('webkitAnimationEnd', alert("Termina"));
	});
});