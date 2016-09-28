
var app = angular.module('ABMangularPHP',['angularFileUpload', 'ui.router', 'satellizer']);

//Configuración del ui-router
app.config(function($stateProvider, $urlRouterProvider, $authProvider) {

    //Configuracion del auth
    $authProvider.loginUrl = 'LABIV---ABM_Personas/PHP/jwt/php/auth.php'; //PONER LA RUTA DESDE CERO!!!
    $authProvider.tokenName = 'miToken';
    $authProvider.tokenPrefix = 'ABMangularPHP';
    $authProvider.authHeader = 'data';


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

    // For any unmatched url, redirect to /state1 
    $urlRouterProvider.otherwise('/');
});


//-------------------------- CONTROLADORES ----------------------------------//


app.controller('controlMenu', function($scope, $http) {
    $scope.DatoTest="**Menu**";
    //..
});


app.controller('controlABMMain', function($scope, $http, $auth, $state) {
    $scope.DatoTest="**controlABMMain**";

    if($auth.isAuthenticated()){
        console.log("Sesión iniciada!");
    }
    else{
        console.log("No hay sesión!");
        $state.go('login');
    }

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
});


app.controller('controlLogin', function($scope, $http, $auth, $state){
    
    $scope.datos = {};
    
    /* ¿Qué hago en Loguear()?
     Llamo por POST (http) al authProvider, que configuré en app.config.
     Le paso como parámetro un objeto JSON que contiene las credenciales del login.
     Si la conexión fue exitosa (no importa si el log existe), se ejecuta la función success del then(), donde recién ahí evalúo si existe o no el usuario y la clave.
     Si hubo algún error en la conexión, se ejecuta la función de error del then(), donde muestro por consola el error.
    */
    $scope.Loguear = function(){

        $auth.login({
            usuario: $scope.datos.usuario,
            clave: $scope.datos.clave
        })
        .then(function(response){
            if($auth.isAuthenticated()){
                //Si se logueó correctamente, isAuthenticated vale true. Entonces muestro por consola y redirijo al ABM.
                console.log("Sesión iniciada!");
                console.info("Info isAuthenticated: ", $auth.isAuthenticated());
                console.info("Info getPayload: ", $auth.getPayload());
                console.info("Info response: ", response);
                $state.go('abm.menu');
            }
            else{
                console.info("Info isAuthenticated: ", $auth.isAuthenticated());
                console.info("info no-login: ", $auth.getPayload());
            }
        },
        function(err){
            console.log("Error de conexión", err);
        });
    }
});


app.controller('controlInicio', function($scope, $http) {
    $scope.DatoTest="**Inicio**";
    //continuar
});


app.controller('controlForm', function($scope, $http, FileUploader) {
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



    /*
        $http.get("http://www.mocky.io/v2/57c822aa120000fc03e7699e")
        .then(function(datos){

            //Almaceno los datos recuperados en una variable de $scope.
            console.info("datos: ",datos.data);
            $scope.listadoDeDatos = datos.data;

        },function(error){

            //En caso de error, pongo como un array vacío la variable de $scope.
            $scope.listadoDeDatos = [];

        });
    */

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
