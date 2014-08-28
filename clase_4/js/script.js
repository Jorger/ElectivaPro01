window.onload = function()
{
	//console.log(nom_div("personaje"));
	var estaCaminando = false;
	var pies = 1;
	var pies2 = 5;
	nom_div("personaje").setAttribute("class", "caminar " + "paso_" + pies);
	function caminaPersonaje()
	{
		if(estaCaminando)
		{
			pies++;
			nom_div("personaje").setAttribute("class", "caminar " + "paso_" + pies);
			if(pies > 6)
			{
				pies = 1;
			}
			nom_div("personaje2").setAttribute("class", "caminar " + "paso_" + pies2);
			pies2--;
			if(pies2 < 0)
			{
				pies2 = 5;
			}
		}
	}
	var tiempo = setInterval(caminaPersonaje, 100);
	//Cuando el usuario haga click en el botón...
	
	nom_div("boton").addEventListener('click', function(event)
	{
		//alert("Hola Mundo");
		if(!estaCaminando)
		{
			estaCaminando = true;
			this.value = "DETIENE";
		}
		else
		{
			nom_div("personaje").setAttribute("class", "caminar " + "paso_1");
			pies = 1;
			estaCaminando = false;
			this.value = "Caminar";
		}
	});

	nom_div("velocidad").addEventListener('change', function(event)
	{
		//console.log(this.value);
		clearInterval(tiempo);
		tiempo = setInterval(caminaPersonaje, this.value);
	});

	



	function nom_div(div)
	{
		return document.getElementById(div);
	}
}