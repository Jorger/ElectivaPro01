/*
Miércoles laboratorio Sprites...
Invesrigación 
Animación
*/
window.onload = function()
{
	nom_div("ejecuta").addEventListener('click', function(event)
	{
		var objAnima = nom_div("imagen");
		objAnima.setAttribute("class", "animated " + nom_div("tipoanima").value);
		/*
		objAnima = nom_div("animar");
		objAnima.setAttribute("class", "animated " + nom_div("tipoanima").value);
		*/
	});
	function nom_div(div)
	{
		return document.getElementById(div);
	}
}