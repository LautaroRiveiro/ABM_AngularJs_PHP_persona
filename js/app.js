
var app = angular.module('ABMangularPHP', []);


app.controller('controlMenu', function($scope, $http) {
    $scope.DatoTest="**Menu**";
});


app.controller('controlAlta', function($scope, $http) {
    $scope.DatoTest="**alta**";

    //Inicio las variables
    $scope.persona = {};
    $scope.persona.nombre = "" ;
    $scope.persona.apellido = "" ;
    $scope.persona.dni = "" ;
    $scope.persona.correo;
    $scope.persona.estadoCivil;
    $scope.persona.fechaNacimiento;
    $scope.persona.edad;
    $scope.persona.sexo;
    $scope.persona.foto = "sinfoto";
    $scope.persona.clave;
    $scope.persona.confirmarClave;


    $scope.Guardar=function(){


  	console.log("persona a guardar:");
    console.log($scope.persona);

    /*
    $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
 	.then(function(respuesta) {     	
 		//aca se ejetuca si retorno sin errores      	
      	console.log(respuesta.data);
    },function errorCallback(response) {     		
     	//aca se ejecuta cuando hay errores
     	console.log( response);     			
 	});
    */
  }
});

app.controller('controlGrilla', function($scope, $http) {
  	$scope.DatoTest="**grilla**";
 	
    /* EJEMPLO PARA TRAER DATOS POR HTTP:
    $http.get('PHP/nexo.php', { params: {accion :"traer"}})
 	.then(function(respuesta) {     	
        $scope.ListadoPersonas = respuesta.data.listado;
      	console.log(respuesta.data);
    },function errorCallback(response) {
     	$scope.ListadoPersonas= [];
     	console.log( response);
 	});*/

    $http.get("http://www.mocky.io/v2/57c822aa120000fc03e7699e")
    .then(function(datos){

        //Almaceno los datos recuperados en una variable de $scope.
        console.info("datos: ",datos.data);
        $scope.listadoDeDatos = datos.data;

    },function(error){

        //En caso de error, pongo como un array vacío la variable de $scope.
        $scope.listadoDeDatos = [];

    });


    /*
    https://docs.angularjs.org/api/ng/service/$http

    the response object has these properties:

    data – {string|Object} – The response body transformed with the transform functions.
    status – {number} – HTTP status code of the response.
    headers – {function([headerName])} – Header getter function.
    config – {Object} – The configuration object that was used to generate the request.
    statusText – {string} – HTTP status text of the response.
    
    A response status code between 200 and 299 is considered a success
    status and will result in the success callback being called. 
    Note that if the response is a redirect, XMLHttpRequest will 
    transparently follow it, meaning that 
    the error callback will not be called for such responses.
    */

 	$scope.Borrar=function(persona){
		console.log("borrar"+persona);

        /*
        $http.post("PHP/nexo.php",{accion :"borrar",persona:persona},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        .success(function(data, status, headers, config) {
            console.log("bien"+data);
          }).error(function(data, status, headers, config) {
             console.log("mal"+data);
        });
        */

        /*
        $http.post('PHP/nexo.php', 
          headers: 'Content-Type': 'application/x-www-form-urlencoded',
          params: {accion :"borrar",persona:persona})
        .then(function(respuesta) {       
             //aca se ejetuca si retorno sin errores        
             console.log(respuesta.data);

        },function errorCallback(response) {        
            //aca se ejecuta cuando hay errores
            console.log( response);           
        });
        */
 	}




 	$scope.Modificar=function(id){
 		
 		console.log("Modificar"+id);
 	}





});
