window.onload = function()
{
	//Rango inferior...
	var rangoMaximo = 0;
	var adivinaNumero = 0;
	var numIntentos = 20;
	var intetosRealizados = 1;
	var iniciaJuego = function()
	{
		rangoMaximo = Math.floor((Math.random() * 200) + 50);
		adivinaNumero = Math.floor((Math.random() * rangoMaximo) + 1);
		console.log("Número a adivinar: " + adivinaNumero);
		intetosRealizados = 1;
		nom_div("pista").innerHTML = "PISTA";
		nom_div("rangoAdivina").innerHTML = "El número está entre 1 y " + rangoMaximo;
		nom_div("intentos").innerHTML = "INTENTO "+intetosRealizados+" DE " + numIntentos;
		nom_div("adivina").value = "";
		nom_div("adivina").focus();
	};
	iniciaJuego();
	//Para reiniciar el Juego...
	nom_div("reinicia").addEventListener('click', function(event)
	{
		iniciaJuego();
	});

	var comprueba = function()
	{
		//Primer saber que el valor del texto y que este no esté vacio...
		var estados = ["Frio", "Templado", "Caliente"];
		var valadivina = nom_div("adivina");
		if(valadivina.value.length != 0)
		{
			var valTiene = Number(valadivina.value);
			if(valTiene >= 1 && valTiene <= rangoMaximo)
			{
				var txtPista = "";
				if(intetosRealizados < numIntentos)
				{
					intetosRealizados++;
					nom_div("intentos").innerHTML = "INTENTO "+intetosRealizados+" DE " + numIntentos;
					//console.log(valTiene);
					if(valTiene == adivinaNumero)
					{
						txtPista = "MUY BIEN EL NÚMERO ES: " + adivinaNumero;
					}
					else
					{
						var porcentaje = (valTiene / adivinaNumero) * 100;
						var numEstado = 0;
						if(valTiene < adivinaNumero)
						{
							if(porcentaje <= 50)
							{
								numEstado = 1;
							}
							else
							{
								if(porcentaje <= 90)
								{
									numEstado = 2;
								}
								else
								{
									numEstado = 3;
								}
							}
						}
						else
						{
							porcentaje -= 100;
							console.log("porcentaje es: " + porcentaje);
							if(porcentaje <= 10)
							{
								numEstado = 3;
							}
							else
							{
								if(porcentaje <= 60)
								{
									numEstado = 2;
								}
								else
								{
									numEstado = 1;	
								}
							}
						}
						txtPista = "Estas " + estados[numEstado - 1];
					}
				}
				else
				{
					txtPista = "El número era: " + adivinaNumero;
				}
				nom_div("pista").innerHTML = txtPista;
			}
			else
			{
				nom_div("pista").innerHTML = "El número debe estar entre 1 y " + rangoMaximo;
				valadivina.focus();
			}
		}
		else
		{
			nom_div("pista").innerHTML = "Por favor escribe un número";
			valadivina.focus();
		}
	}
	nom_div("form").addEventListener('submit', function(event)
	{
		comprueba();
		event.preventDefault();
		return false;
	});
	function nom_div(div)
	{
		return document.getElementById(div);
	}
};