<?php 
class Usuario{

	//ATRIBUTOS
	public $id;
	public $nombre;
	public $email;
	public $perfil;
	public $password;
	public $foto;

	//CONSTRUCTOR
	public function __construct($id = NULL)
	{
		if($id != NULL){
			$usuario = self::TraerUnUsuarioPorId($id);
			$this->id = $usuario->id;
			$this->nombre = $usuario->nombre;
			$this->email = $usuario->email;
			$this->perfil = $usuario->perfil;
			$this->foto = $usuario->foto;
		}
	}

	//MÉTODOS
	public static function TraerUnUsuarioPorId($id){
		$conexion = self::CrearConexion();

		$sql = "SELECT U.id, U.nombre, U.email, U.perfil, U.foto
				FROM usuarios U
				WHERE U.id = :id";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":id", $id, PDO::PARAM_INT);
		$consulta->execute();

		$usuario = $consulta->fetchObject('Usuario');
		return $usuario;
	}

	public static function TraerTodosLosUsuarios(){
		$conexion = self::CrearConexion();

		$sql = "SELECT U.id, U.nombre, U.email, U.perfil, U.foto
				FROM usuarios U";

		$consulta = $conexion->prepare($sql);
		$consulta->execute();

		$usuarios = $consulta->fetchall(PDO::FETCH_CLASS, 'Usuario');
		return $usuarios;
	}

	public static function TraerUsuarioLogueado($usuario){
		$conexion = self::CrearConexion();

		$sql = "SELECT U.id, U.nombre, U.email, U.perfil, U.foto
				FROM usuarios U
				WHERE U.email = :email AND U.password = :pass";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":email", $usuario->usuario, PDO::PARAM_STR);
		$consulta->bindValue(":pass", $usuario->clave, PDO::PARAM_STR);
		$consulta->execute();

		$usuarioLogueado = $consulta->fetchObject('Usuario');
		return $usuarioLogueado;
	}

	public static function Agregar($usuario){
		$conexion = self::CrearConexion();

		$sql = "INSERT INTO usuarios (nombre, email, password, perfil, foto)
				VALUES (:nombre, :email, :pass, :perfil, :foto)";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":nombre", $usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(":email", $usuario->email, PDO::PARAM_STR);
		$consulta->bindValue(":pass", $usuario->pass, PDO::PARAM_STR);
		$consulta->bindValue(":perfil", $usuario->perfil, PDO::PARAM_STR);
		$consulta->bindValue(":foto", $usuario->foto, PDO::PARAM_STR);
		$consulta->execute();

		$idAgregado = $conexion->lastInsertId();
		return $idAgregado;
	}

	public static function Modificar($usuario){
		$conexion = self::CrearConexion();

		$sql = "UPDATE usuarios
				SET nombre = :nombre, email = :email, password = :pass, perfil = :perfil, foto = :foto
				WHERE id = :id";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":nombre", $usuario->nombre, PDO::PARAM_STR);
		$consulta->bindValue(":email", $usuario->email, PDO::PARAM_STR);
		$consulta->bindValue(":pass", $usuario->pass, PDO::PARAM_STR);
		$consulta->bindValue(":perfil", $usuario->perfil, PDO::PARAM_STR);
		$consulta->bindValue(":foto", $usuario->foto, PDO::PARAM_STR);
		$consulta->bindValue(":id", $usuario->id, PDO::PARAM_INT);
		$consulta->execute();

		$cantidad = $consulta->rowCount();
		return $cantidad;
	}

	public static function Eliminar($id){
		$conexion = self::CrearConexion();

		$sql = "DELETE FROM usuarios
				WHERE id = :id";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":id", $id, PDO::PARAM_INT);
		$consulta->execute();

		$cantidad = $consulta->rowCount();
		return $cantidad;
	}

	public static function CrearConexion(){
		try
		{
			$conexion = new PDO("mysql:host=localhost;dbname=abm;charset=utf8;",'root','');
			return $conexion;
		}
		catch (Exception $e) {
			print_r("Error: " . $e->GetMessage());
			die();
			return;
		}
	}
}
 ?>