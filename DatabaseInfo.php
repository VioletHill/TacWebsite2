<?php 

class DatabaseInfo{
	
	private static $ipAddress = "www.violethill.com";
	private static $account = "root";
	private static $password = "";
	private static $database = "TacWebsite";
	
	public static function ipAddress()
	{
		return self::$ipAddress;
	}
	
	public static function account()
	{
		return self::$account;
	}
	
	public static function password()
	{
		return self::$password;
	}
	
	public static function database()
	{
		return  self::$database;
	}
}


?>