<?php 
	include "clases/Usuario.php";
	
	if(isset($_GET['accion']))
	{
		$accion=$_GET['accion'];
		if($accion=="traer")
		{
			$respuesta= array();
			$respuesta['listado']=Usuario::TraerTodosLosUsuarios();
			$arrayJson = json_encode($respuesta);
			echo  $arrayJson;
		}
		else if($accion=="insertar")
		{
			$respuesta= array();
			$usuario = isset($_GET["persona"]) ? json_decode($_GET['persona']) : NULL;
			$respuesta['listado']=Usuario::Agregar($usuario);
			$arrayJson = json_encode($respuesta);
			echo  $arrayJson;
		}
		else if($accion=="borrar")
		{
			$respuesta= array();
			$usuario = isset($_GET["persona"]) ? $_GET['persona'] : NULL;
			$respuesta['listado']=Usuario::Eliminar($usuario);	
			$arrayJson = json_encode($respuesta);
			echo  $arrayJson;
		}
		return;
	}
	else{
		//var_dump($_REQUEST);
		echo "No está conectando el $GET";
		var_dump($_POST);
		/*
		$DatosPorPost = file_get_contents("php://input");
		$respuesta = json_decode($DatosPorPost);
		var_dump($respuesta);
		*/
		//echo $respuesta->datos->persona->nombre;
		//Persona::InsertarPersona($respuesta->datos->persona);
	}
?>