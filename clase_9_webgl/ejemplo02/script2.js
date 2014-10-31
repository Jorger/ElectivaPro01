window.onload = function()
{
	inicio();
}

function inicio()
{
	//alert("cargó la página...");
	var texturaUno = THREE.ImageUtils.loadTexture( 'box.jpg' );
	var texturaDos = THREE.ImageUtils.loadTexture( 'box2.jpg' );
	var ancho = window.innerWidth;
	var alto = window.innerHeight;

	//var lienzo = new THREE.WebGLRenderer({antialias: true});
	var lienzo = new THREE.WebGLRenderer();
	lienzo.setSize(ancho,alto);
	lienzo.setClearColor(new THREE.Color("gray"));
	document.body.appendChild(lienzo.domElement);
	var escena = new THREE.Scene;
	var geometriaUno = new THREE.CubeGeometry(100,100,100);
	var geometriaDos = new THREE.CubeGeometry(100,100,100);
	var colorCubo = new THREE.MeshLambertMaterial({color: "gray"});
	var colorDos = new THREE.MeshLambertMaterial({color: "red"});
	texturaUno.anisotropy = lienzo.getMaxAnisotropy();
	texturaDos.anisotropy = lienzo.getMaxAnisotropy();	

	var materialUno = new THREE.MeshBasicMaterial( { map: texturaUno } );
	var materialDos = new THREE.MeshBasicMaterial( { map: texturaDos } );

	var cubo1 = new THREE.Mesh(geometriaUno, materialUno);
	var cubo2 = new THREE.Mesh(geometriaDos, materialDos);

	escena.add(cubo1);
	escena.add(cubo2);
	//console.log(escena);

	var camara = new THREE.PerspectiveCamera(50, (ancho / alto),0.1,10000);
	camara.position.y = 160;
	camara.position.z = 400;
	camara.lookAt(cubo1.position);
	cubo1.position.x = -100;
	cubo2.position.x = 100;

	escena.add(camara);

	var luz1 = new THREE.PointLight(0xff0044);
	luz1.position.set(120,260,100);
	var luz2 = new THREE.PointLight(0x4499ff);
	luz2.position.set(-100,100,200);
	escena.add(luz1);
	escena.add(luz2);

	var inicia = true;
	var encima = true;
	function renderizar()
	{
		if(!encima || inicia)
		{
			inicia = false;
			requestAnimationFrame(renderizar);
			return false;
			//break;
		}
		/*
		cubo1.rotation.y += Math.PI * 0.5 / 180;
		cubo1.rotation.z += Math.PI * Math.cos(x++ / 50) / 180;
		cubo2.rotation.y += Math.PI * Math.cos(x++ / 100) / 180;
		cubo2.rotation.z += Math.PI * 0.2 / 180;
		*/
		cubo1.rotation.y += 0.1;
		cubo2.rotation.x += 0.1;
		cubo2.rotation.y += 0.1;
		cubo2.rotation.z += 0.1;
		//cubo2.rotation.x += 0.1;
		lienzo.render(escena, camara);
		requestAnimationFrame(renderizar);
	}
	renderizar();
	
	addEventListener("mouseover",function(){encima=true;});
	addEventListener("mouseout",function(){encima=false;});
	
}