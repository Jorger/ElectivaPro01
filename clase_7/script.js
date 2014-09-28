window.onload = function()
{
    inicio();
}

function inicio()
{
    /*
    Tamaño/tomaño del sol = %
    */
    var velObjetos = 1;
    function movimiento(path, obj, vel)
    {
        //console.log("Vel de: "  + obj + " es: " + vel);
        var pathLength = path.getTotalLength();
        var tween = new TWEEN.Tween({ length: 0  })
        .to({ length: pathLength }, vel)
        .onUpdate(function()
        {
            var point = path.getPointAtLength(this.length);
            obj.style.webkitTransform = 'translate('+ point.x + 'px,'+ point.y +'px)';
        }).repeat(999999999).start();
        animate = function()
        {
            requestAnimationFrame(animate);
            TWEEN.update();
            //console.log("Ingresa");
        }
        animate();
    }
    var tamReal = false;
    var creaPlanetas = function(objeto, planeta)
    {
        //console.log(planeta.nombre);
        var tamanoPlaneta = planeta.tamano;
        //console.debug(objeto);
        if(tamReal)
        {
            //console.log("Ingresa");
            tamanoPlaneta = Math.round(elSol.tamano * (planeta.porcentaje / 100));
            //console.log(planeta.nombre + " = " + tamanoPlaneta);
        }
        objeto.style.width = tamanoPlaneta + "px";
        objeto.style.height = tamanoPlaneta + "px";
        objeto.style.backgroundImage = "url('planetas/"+planeta.imagen+"')";
        objeto.style.backgroundSize = tamanoPlaneta + "px " + tamanoPlaneta + "px";
        var margen = (Math.round(tamanoPlaneta / 2)) * -1;
        objeto.style.marginTop = margen + "px";
        objeto.style.marginLeft = margen + "px";
        //objeto.style.borderRadius = "50%";
        objeto.style.position = "absolute";
        //console.debug(objeto);
        //console.log("basePlaneta " + planeta.imagen);
        //objeto.style.border = "thick solid #FFF";
        //objeto.setAttribute("class", "basePlaneta " + planeta.imagen);
    }
    planetas = [
                {nombre: "Mercurio", 
                 imagen: "mercurio.gif",
                 porcentaje: 0.4,
                 tamano: 10, 
                 tacontante : 10
                },
                {nombre: "Venus", 
                 imagen: "venus.gif",
                 porcentaje: 0.9,
                 tamano: 20, 
                 tacontante : 20
                },
                {nombre: "Tierra", 
                 imagen: "tierra.png",
                 porcentaje: 0.9,
                 tamano: 20, 
                 tacontante : 20
                },
                {nombre: "Marte", 
                 imagen: "marte.gif",
                 porcentaje: 0.5,
                 tamano: 15, 
                 tacontante : 15 
                },
                {nombre: "Júpiter", 
                 imagen: "jupiter.gif",
                 porcentaje: 10.3,
                 tamano: 50, 
                 tacontante : 50
                },
                {nombre: "Saturno", 
                 imagen: "saturno.gif",
                 porcentaje: 8.7,
                 tamano: 45, 
                 tacontante : 45
                },
                {nombre: "Urano", 
                 imagen: "urano.gif",
                 porcentaje: 3.7,
                 tamano: 35, 
                 tacontante : 35
                },
                {nombre: "Neptuno", 
                 imagen: "neptuno.gif",
                 porcentaje: 3.6,
                 tamano: 30, 
                 tacontante : 30
                }];
    var objSol = nom_div('sol_svg');
    var elSol = {
        tamano: objSol.height.baseVal.value, 
        x : objSol.x.baseVal.value, 
        y : objSol.y.baseVal.value
    };
    var objeto = "";
    var ruta = "";
    var velInicia = 3000;

    nom_div("opcion_1").addEventListener('change', function(event)
    {
        for(var i = 1; i < planetas.length; i++)
        {
            planetas[i - 1].tamano = planetas[i - 1].tacontante * Number(this.value);
            creaPlanetas(nom_div("objeto_" + i), planetas[i - 1]);
        }
        //console.log(this.value);
    });

    nom_div("opcion_2").addEventListener('change', function(event)
    {
        var velInicia = 3000 / Number(this.value);
        for(var i = 1; i < planetas.length; i++)
        {
            movimiento(nom_div("ruta_" + i), nom_div("objeto_" + i), velInicia);
            velInicia += (4000 / Number(this.value));
        }
    });
    



    for(var i = 1; i <= planetas.length; i++)
    {
        objeto = nom_div("objeto_" + i);
        ruta = nom_div("ruta_" + i);
        //console.debug(ruta);
        creaPlanetas(objeto, planetas[i - 1]);
        movimiento(ruta, objeto, velInicia);
        velInicia += 4000;
    }
    //console.log("Hola mundo");
    function nom_div(div)
    {
        return document.getElementById(div);
    }
}