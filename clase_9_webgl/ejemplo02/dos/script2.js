window.onload = function()
{
	nom_div("texturas").addEventListener('change', function(event)
	{
		inicio(this.value);
	});
	function nom_div(div)
	{
		return document.getElementById(div);
	}
	inicio(1);
}

function inicio(num)
{
	var canvas = document.getElementsByTagName("canvas")[0];
	var w = window.innerWidth - 50;
	var h = window.innerHeight - 100;
  	var lienzo = new THREE.WebGLRenderer({canvas:canvas});
  	lienzo.setSize(w, h);
  	//limpia el color del render...
  	lienzo.setClearColor(new THREE.Color(0xeeeeee));
  	//Creando la escena...
  	var escena = new THREE.Scene();
  	var camara = new THREE.PerspectiveCamera(15,  w / h, 0.1, 10000);
  	camara.position.set( 5, 5, 100 );
  	var controlMouse = new THREE.OrbitControls(camara, canvas);
  	var cuboUno = new THREE.CubeGeometry(10, 10, 10);
  	var texturaUno = THREE.ImageUtils.loadTexture("box_"+num+".jpg");
	texturaUno.anisotropy = lienzo.getMaxAnisotropy();
	var materialUno = new THREE.MeshBasicMaterial( { map: texturaUno } );
  	var cubo = new THREE.Mesh(cuboUno, materialUno);
  	escena.add( cubo );
  	var reloj = new THREE.Clock();
  	var renderizar = function()
  	{
  		var tiempo_delta = reloj.getDelta();
  		//console.log("FP: " + tiempo_delta);
    	controlMouse.update(renderizar);
    	lienzo.render(escena,camara);
    	requestAnimationFrame(renderizar);
  	}	
  	requestAnimationFrame(renderizar);
}