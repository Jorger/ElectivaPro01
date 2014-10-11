window.onload = function()
{
	inicio();
}

function inicio()
{
	canvas = nom_div("canvas");
	var ctx = canvas.getContext("2d");
	var w = 450;
	var h = 450;
	//1 = Horizontal...
	//2 = Vertical...
	var obstaculos = [{xinicio: 10, yinicio : 10, xfinal : 20, yfinal : 10}, 
					  {xinicio: 20, yinicio : 11, xfinal : 20, yfinal : 23}];

	//canvas.style.width = w + "px";
	//canvas.style.height = h + "px";
	var dc = 15; //La dimensión que tendrá la culebrita...
	var direccion = 0; //Por defecto inciará hacia la derecha...
	var posMueve = [[-1, 0], [0, -1], [1, 0], [0, 1]];
	culebrita = [];
	var cilcloJuego = "";
	var pause = false;
	var score = 0;
	var colores = {
		fondo : "#72a5d2",
		culebrita : "#009193", 
		comida : "#d6a800", 
		obstaculo: "red"
	}
	var largoCulebrita = 15; 
	var velocidad = 25;
	var contVelocidad = 0;
	var numeroComidas = 3;
	comida = [];
	var comidaCulebrita = function()
	{
		//Generar puntos aletorios entre 0 - 44
		
		var xComida = 0;
		var yComida = 0;
		var hayComida = false;
		for(var i = 1; i <= numeroComidas; i++)
		{
			hayComida = false;
			do
			{
				xComida = Math.round(Math.random()*(w - dc) / dc);
				yComida = Math.round(Math.random()*(h - dc) / dc);
				for(var c = 0; c < comida.length; c++)
				{
					if(comida[c].x === xComida && comida[c].y === yComida)
					{
						hayComida = true;
						break;
					}

				}
				if(!hayComida)
				{
					break;
				}
			}while(1);
			comida.push({x: xComida, y: yComida, visible : true});
		}
		/*
		comida = {
					x: Math.round(Math.random()*(w - dc) / dc), 
					y: Math.round(Math.random()*(h-dc)/dc)
				 };
		*/
	}

	function iniciaJuego()
	{
		velocidad = 25;
		contVelocidad = 0;
		pause = false;
		score = 0;
		direccion = 2;
		//comidaCulebrita();
		nom_div("puntua").innerHTML = "Score: " + score;
		creaCulebrita();
		if(cilcloJuego != "")
		{
			clearInterval(cilcloJuego);
		}
		cilcloJuego = setInterval(function()
		{
			if(!pause)
			{
				//if(contVelocidad % velocidad == 0 || velocidad == 0)
				//{
					dibujarCulebrita();
				//	contVelocidad = 0;
				//}
				//contVelocidad++;
			}
		}, 100);
		//cilcloJuego = setInterval(dibujarCulebrita, 130);
		//console.log("Termina acá");
	}
	comidaCulebrita();
	iniciaJuego();

	var dibujaCanvas = function()
	{
		ctx.fillStyle = colores.fondo;
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "blue";
		ctx.lineWidth = 2;
		ctx.strokeRect(0, 0, w, h);	
	}
	
	var colisionCulebrita = function(x, y, cuerpo)
	{
		//Detectar si la posición x, y está en el cuerpo de la culebrita...
		var hayColision = false;
		for(var i in cuerpo)
		{
			if(cuerpo[i].x === x && cuerpo[i].y === y)
			{
				hayColision = true;
				break;
			}
		}
		return hayColision;
	}
	
	function creaCulebrita()
	{
		culebrita = []; //Vaciar el array...
		for(var i = largoCulebrita - 1; i >= 0; i--)
		{
			culebrita.push({x: i, y:0});
		}
	}

	function dibujarCulebrita()
	{
		dibujaCanvas();

		var cabezaX = culebrita[0].x;
		var cabezaY = culebrita[0].y;
		//cabezaX++;
		//var posMueve = [[-1, 0], [0, -1], [1, 0], [0, 1]];
		cabezaX += posMueve[direccion][0];
		cabezaY += posMueve[direccion][1];
		//Saber si la culebrita se choca contra el escenario...
		var colisionaCuerpo = colisionCulebrita(cabezaX, cabezaY, culebrita);
		if(cabezaX == -1 || cabezaX == w/dc || cabezaY == -1 || cabezaY == h/dc || colisionaCuerpo || accionObstaculos(false, cabezaX, cabezaY))
		{
			audios("muere.mp3");
			comidaCulebrita();
			iniciaJuego();
			return;
		}
		//console.log(cabezaX + " == " + comida.x + " Y " + cabezaY + " == " + comida.y);
		var comeCulebrita = false;
		for(var i in comida)
		{
			if(comida[i].visible)
			{
				if(cabezaX == comida[i].x && cabezaY == comida[i].y)
				{
					comeCulebrita = true;
					comida[i].visible = false;
				}
			}
		}
		if(comeCulebrita)
		{
			audios("moneda.mp3");
			score++;
			nom_div("puntua").innerHTML = "Score: " + score;
			var cola = {x: cabezaX, y : cabezaY};
			/*if(score === numeroComidas)
			{
				alert("Terminó de JUGAR");
			}
			*/
			//comidaCulebrita();
		}
		else
		{
			//Elimina el último objeto del array culebrita y lo guarda el cola...
			var cola = culebrita.pop();
			cola.x = cabezaX;
			cola.y = cabezaY;
		}
		//Pone la inicio...
		culebrita.unshift(cola);
		for(var i = 0; i < culebrita.length; i++)
		{
			var c = culebrita[i];
			dibujarCelda(c.x, c.y, colores.culebrita);
		}
		//Dibujar la comida en el escenario...
		for(var i in comida)
		{
			if(comida[i].visible)
			{
				dibujarCelda(comida[i].x, comida[i].y, colores.comida);
			}
		}
		//Dibujar los obstáculos...
		accionObstaculos(true, 0, 0);
		
	}

	function accionObstaculos(pintar, x, y)
	{
		var choca = false;
		for(var i in obstaculos)
		{
			var xobjeto = obstaculos[i].xinicio;
			var yobjeto = obstaculos[i].yinicio;
			var diferencia = 0;
			if(obstaculos[i].xinicio === obstaculos[i].xfinal)
			{
				//Verticales... Y
				diferencia = obstaculos[i].yfinal - obstaculos[i].yinicio;
			}
			else
			{
				//Horizontales... X
				diferencia = obstaculos[i].xfinal - obstaculos[i].xinicio;
			}
			for(var c = 1; c <= diferencia; c++)
			{
				if(obstaculos[i].xinicio === obstaculos[i].xfinal)
				{
					yobjeto++;
				}
				else
				{
					xobjeto++;
				}
				if(pintar)
				{
					dibujarCelda(xobjeto, yobjeto, colores.obstaculo);
				}
				else
				{
					if(x === xobjeto && y === yobjeto)
					{
						choca = true;
						break;
					}
				}
			}
			if(choca)
			{
				break;
			}
		}
		if(!pintar)
		{
			return choca;
		}
	}
	function dibujarCelda(x, y, color)
	{
		ctx.fillStyle = color;
		ctx.fillRect(x * dc, y * dc, dc, dc);
		ctx.lineWidth = 1;
		ctx.strokeStyle = "white";
		ctx.strokeRect(x * dc, y * dc, dc, dc);
	}

	
	//dibujarCulebrita();
	

	//Para controlar a la culebrita con el teclado...
	var presionado = false;
	window.onkeydown = function(e)
	{
		var code = e.keyCode ? e.keyCode : e.which;
		//console.log("Code: " + code);
		if(!presionado)
		{
			if(code >= 37 && code <= 40)
			{
				var reversa = false;
				switch(code)
				{
					case 37: if(direccion == 2) reversa = true;
							 break;
					case 38: if(direccion == 3) reversa = true;
							 break;
					case 39: if(direccion == 0) reversa = true;
							 break;
					case 40: if(direccion == 1) reversa = true;
							 break;
				}
				if(!reversa)
				{
					direccion = code - 37;
					//console.log(direccion);
				}
			}
			else
			{
				if(code == 80) //Pause...
				{
					pause = !pause;
					if(pause)
					{
						nom_div("detiene").value = "Continuar";
					}
					else
					{
						nom_div("detiene").value = "Pause";
					}
				}
			}
			presionado = true;
		}
	}
	window.onkeyup = function(e)
	{
		var code = e.keyCode ? e.keyCode : e.which;
		if(presionado)
		{
			presionado = false;
		}
	}

	for(var i = 1; i <= 3; i++)
	{
		nom_div("opcion_" + i).addEventListener('change', function(event)
		{
			var ind = event.target.id.split("_");
			console.log("Color: " + this.value);
			switch(Number(ind[1]))
			{
				case 1: colores.fondo = this.value; break;
				case 2: colores.culebrita = this.value; break;
				case 3: colores.comida = this.value; break;
			}
		});
	}
	nom_div("detiene").addEventListener('click', function(event)
	{
		pause = !pause;
		if(pause)
		{
			this.value = "Continuar";
		}
		else
		{
			this.value = "Pause";
		}
	});

	nom_div("descarga").addEventListener('click', function(event)
    {
        var nomfoto = prompt("Nombre de la Imagen", "Culebrita");
        this.download = nomfoto + ".png";
        this.href = canvas.toDataURL();
    });


	//fin de controlar con el teclado...
	function audios(audio)
	{
		var txt = "<audio autoplay>";
		txt += "<source src = '"+(audio)+"' type = 'audio/mpeg'></audio>";
		nom_div("sonido").innerHTML = txt;
	}

	function nom_div(div)
	{
		return document.getElementById(div);
	}
}