
var app = angular.module('ABMangularPHP',['angularFileUpload', 'ui.router', 'satellizer']);

//Configuración del ui-router
app.config(function($stateProvider, $urlRouterProvider, $authProvider) {

    //Configuracion del auth
    $authProvider.loginUrl = 'PHP/jwt/php/auth.php';
    $authProvider.tokenName = 'miToken';
    $authProvider.tokenPrefix = 'ABMangularPHP';
    $authProvider.authHeaders = 'data';

    // Now set up the states 
    $stateProvider
    .state('inicio', {
        url: '/',
        templateUrl: "templates/inicio.html",
        controller: 'controlInicio'
    })
    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'controlLogin'
    })
    .state('abm', {
        url: '/abm',
        abstract: true,
        templateUrl: 'templates/abm.html',
        controller: 'controlABMMain'
    })
    .state('abm.menu', {
        url: '/menu',
        templateUrl: 'templates/abm/menu.html',
        controller: 'controlMenu'
    })
    .state('abm.form', {
        url: '/form',
        templateUrl: 'templates/abm/form.html',
        controller: 'controlForm'
    })
    .state('abm.grilla', {
        url: '/grilla',
        templateUrl: 'templates/abm/grilla.html',
        controller: 'controlGrilla'
    })
    //CONTINUAR
  


         .state(
          'persona.alta',{
          url:'/alta',
          views:
          {
            'contenido':
            {
                templateUrl:'formAlta.html',controller:'controlAlta'
            }
          }
        })


















    // For any unmatched url, redirect to /state1 
    $urlRouterProvider.otherwise('/');
});

app.controller('controlMenu', function($scope, $http) {
    $scope.DatoTest="**Menu**";
});


app.controller('controlABMMain', function($scope, $http) {
    $scope.DatoTest="**controlABMMain**";
});



app.controller('controlLogin', function($scope, $http, $auth) {
    $scope.datos.hola = "HOLA";
    $scope.Loguear = function(){
        alert("HOLA");
        $auth.login({
            usuario: $scope.datos.usuario,
            pass: $scope.datos.clave
        })
        .then(function(){
            if($auth.isAuthenticated())
                console.info("info login: ", $auth.getPayload());
            else
                console.info("info no-login: ", $auth.getPayload());
        });
    }

});

app.controller('controlInicio', function($scope, $http) {
    $scope.DatoTest="**Inicio**";
});


app.controller('controlAlta', function($scope, $http, FileUploader) {
    $scope.DatoTest="**alta**";

    //Inicio las variables
    $scope.persona = {};
    $scope.persona.nombre;
    $scope.persona.apellido;
    $scope.persona.dni;
    $scope.persona.correo;
    $scope.persona.estadoCivil;
    $scope.persona.fechaNacimiento;
    $scope.persona.edad;
    $scope.persona.sexo;
    $scope.persona.foto = "sinfoto";
    $scope.persona.clave;
    $scope.persona.confirmarClave;


    $scope.ValidarText = function(name){
        return !($scope.formAlta[name].$dirty && $scope.formAlta[name].$invalid);
    }

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

    //--------------------------- FILE-UPLOAD --------------------------------------
    $scope.uploader = new FileUploader({url:'PHP/upload.php'});
    $scope.uploader.queueLimit = 1;
    
    $scope.cargar = function(){
        $scope.uploader.uploadAll();
    }

    $scope.uploader.onCompleteAll = function() {
        console.info('Se cargo con exito');
    };

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
