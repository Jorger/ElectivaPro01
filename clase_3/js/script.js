window.onload = function()
{
	nom_div("ejecuta").addEventListener('click', function(event)
	{
		var objAnima = nom_div("animar");
		var objAnima2 = nom_div("imagen");
		var objAnima3 = nom_div("texto");
		objAnima.setAttribute("class", "animated " + nom_div("tipoanima").value);
		objAnima2.setAttribute("class", "animated " + nom_div("tipoanima2").value);
		objAnima3.setAttribute("class", "animated " + nom_div("tipoanima2").value);
		/*
		objAnima = nom_div("animar");
		objAnima.setAttribute("class", "animated " + nom_div("tipoanima").value);
		*/
	});
	
	function nom_div(div)
	{
		return document.getElementById(div);
	}
};