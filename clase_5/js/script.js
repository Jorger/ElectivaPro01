window.onload = function()
{
	inicia();
};

function inicia()
{
	//alert("Cargó...");
	//tecla abajo...
	var direccion = 0;
	var txtDirecciones = ["Izquierda", "Arriba", "Derecha", "Abajo"];
	var direcciones = ["left", "top", "right", "front"];
	nom_div("personaje").setAttribute("class", "basepersonaje top_1");
	nom_div("personaje").style.left = "0px"; //x 530
	nom_div("personaje").style.top = "0px";//y 330
	nom_div("llama").style.left = "210px"; //x 530
	nom_div("llama").style.top = "210px";//y 330
	var caminar = false;
	var paso = 1;
	setInterval(function()
	{
		if(caminar)
		{
			nom_div("personaje").setAttribute("class", "basepersonaje " + direcciones[direccion] + "_" + paso);
			paso++;
			if(paso >= 5)
			{
				paso = 1;
			}
			var posX = parseInt(nom_div("personaje").style.left); //x
			var posY = parseInt(nom_div("personaje").style.top); //Y
			//Posición de la llama...
			var posLlamaX = parseInt(nom_div("llama").style.left); //x
			var posLlamaY = parseInt(nom_div("llama").style.left); //x
			
			//console.log("El personaje en x es: " + posX + " en Y es: " + posY);
			//console.log("La llama en x es: " + posLlamaX + " en Y es: " + posLlamaY);


			switch(direccion)
			{
				case 0: posX -= 10; break;
				case 1: posY -= 10; break;
				case 2: posX += 10; break;
				case 3: posY += 10; break;
			}
			if((posX >= 0 && posX <= 530) && (posY >= 0 && posY <= 330))
			{
				nom_div("personaje").style.left = posX + "px";
				nom_div("personaje").style.top = posY + "px";
				//Detectar si esta cerca de la llama...
				if(posLlamaX - 70 < posX && posLlamaY - 70 < posY)
				{
					console.log("Se quemó!!");
				}
			}
		}
	}, 100);

	window.onkeydown = function(e)
	{
    	e.preventDefault();
		var code = e.keyCode ? e.keyCode : e.which;
		//37 hasta el 40..
		if(!caminar)
		{
			if(code >= 37 && code <= 40)
			{
				direccion = code - 37;
				caminar = true;
				//console.log("Presionó:" + txtDirecciones[code - 37]);
			}
		}
	}
	//Tecla arriba...
	window.onkeyup = function(e)
	{
		var code = e.keyCode ? e.keyCode : e.which;
		if(caminar)
		{
			if(code >= 37 && code <= 40)
			{			
				direccion = code - 37;
				nom_div("personaje").setAttribute("class", "basepersonaje " + direcciones[direccion] + "_1");
				//console.log("Suelta: " + txtDirecciones[code - 37]);
				caminar = false;

			}
		}
	}
	function nom_div(div)
	{
		return document.getElementById(div);
	}
}