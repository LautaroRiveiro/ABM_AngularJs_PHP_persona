<?php
	include_once '../vendor/autoload.php';
	use \Firebase\JWT\JWT;


	/*   -------------------------------------------------
		|         RECIBO DEL CLIENTE LOS DATOS            |
		| VALIDAR SI LOS DATOS INGRESADOS SON CORRECTOS   |
		 -------------------------------------------------
	*/



	# 1. RECUPERO LOS DATOS PASADOS POR $authProvider DEL app.js
		//Utilizo file_get_contents para tomar los valores pasados al .php
		//$post va a valer un string con forma de JSON con los datos pasados en $auth.login(). Por ej: "{usuario: "Lautaro", clave: "1234"}"
		$post = file_get_contents("php://input");
		//Decodifico el string en un objeto JSON.
		$respuesta = json_decode($post);



	# 2. ESTABLEZCO UNA CONEXIÓN CON LA BD Y CONSULTO SI EXISTE EL USUARIO LOGUEADO
		//Incluyo la librería Usuario (la que usaba en Progra 3) que es la que tiene las funciones para SQL
		require_once '../../clases/Usuario.php';
		//Llamo a esta función que consulta con la BD indicada si existe y devuelve los datos del usuario o false/null si no existe.
		//NOTA: Habría que configurar los campos y la BD con la que hace conexión.
		$usuarioLogueado = Usuario::TraerUsuarioLogueado($respuesta);



	# 3. SI SE CONECTÓ CORRECTAMENTE, CREO UN TOKEN Y LO DEVUELVO AL CLIENTE
		//Evalúo si $usuarioLogueado es distinto de false (quiere decir que se ingresó correctamente las credenciales)
		if($usuarioLogueado){
			//LOGIN CORRECTO
			//Creo una key que sólo sabe el lado servidor, para encriptar/desencriptar el token
			$key = "1234";
			//Creo un Token Web con los datos que quiera, tanto los de configuración (tiempo de expiración, etc) como los que quiera mostrar (nombre de pila del usuario, etc). Este token es en definitiva lo que se va a pasar al lado cliente.
			$token["usuario"] = "usuario";
			$token["tipoUsuario"] = "tipoUsuario";
			$token["post"] = $post;
			$token["respuesta"] = $respuesta->usuario;
			$token["usuarioLogueado"] = $usuarioLogueado;
			//Llamo a la función JWT (JSON Web Token) que va a encriptar los datos.
			$jwt = JWT::encode($token, $key);
			//Almaceno en un array, un campo llamado igual que el $authProvider.tokenName de app.js, con el valor del JWT.
			$array["miToken"] = $jwt;
		}
		else{
			//LOGIN INCORRECTO
			//Creo el token en false, para que la función $auth.isAuthenticated() del controlador retorne "false" (no sé cómo detecta cuando es true, pero si está bien logueado su valor es true). De esta manera puedo manipular desde el controlador el éxito en el acceso.
			$array["miToken"] = false;
			/*Esto lo puse para probar si entraba al false y en ese caso, qué almacenaba $usuarioLogueado cuando estaba mal
			$key = "1234";
			$token["usuarioLogueado"] = $usuarioLogueado;
			$jwt = JWT::encode($token, $key);
			$array["miToken"] = $jwt;*/
		}
		//Independientemente de estar bien o mal logueado, imprimo por echo un string con forma de JSON el resultado, que será almacenado en $auth.getPayload().
		echo json_encode($array);



	# 4. FIN
		//Llamo a die(), para que supuestamente no se siga ejecutando el .php
		die();



	# 5. NOTAS
		/* Algunas aclaracione sobre el uso de esta autenticación:
			- Al ir haciendo modificaciones en la programación de este .php, además de refrescar el navegador, fijarse que no haya quedado almacenado el token anterior. Para eso ir a la consola (F12) y ver en "Application" -> Storage -> Local Storage -> http://localhost, que no haya tokens almacenadas. En ese caso borrarlas. Si no, no vamos a percibir los cambios.
			- Algunas de las configuraciones (JWT Claims) posibles para el Web Token son:
				"iss" => "http://example.org"	| 
				"aud" => "http://example.com"	| 
				"iat" => 1356999524				| Fecha de creación del token, en formato de tiempo UNIX
				"nbf" => 1357000000				| 
			- Más info: https://carlosazaustre.es/blog/que-es-la-autenticacion-con-token/
			- IMPORTANT: You must specify supported algorithms for your application. See https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40 for a list of spec-compliant algorithms.
		*/




	#
	###  DECODED - ESTO TODAVÍA NO LO VI  ###
	#

	$decoded = JWT::decode($jwt, $key, array('HS256'));

	print_r($decoded);

	/*
	 NOTE: This will now be an object instead of an associative array. To get
	 an associative array, you will need to cast it as such:
	*/

	$decoded_array = (array) $decoded;

	/**
	 * You can add a leeway to account for when there is a clock skew times between
	 * the signing and verifying servers. It is recommended that this leeway should
	 * not be bigger than a few minutes.
	 *
	 * Source: http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#nbfDef
	 */
	JWT::$leeway = 60; // $leeway in seconds
	$decoded = JWT::decode($jwt, $key, array('HS256'));
?>