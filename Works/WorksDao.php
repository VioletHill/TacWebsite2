<?php

include_once ('WorksBean.php');

class WorksDao 
{
	private static $_sharedWorksDao = null;
	static $ipAddress = "www.violethill.com";
	static $account = "root";
	static $password = "";
	static $database = "TacWebsite";
	private $con;
	private $isConnect;
	private $worksArray;
	public static function sharedWorksDao() 
	{
		if (self::$_sharedWorksDao == null) {
			self::$_sharedWorksDao = new WorksDao();
		}
		return self::$_sharedWorksDao;
	}
	
	public function _construct() 
	{
	}
	
	private function connectDatabase() 
	{
		if ($this->isConnect == true)	return;
	
		$this->con = mysql_connect (self::$ipAddress, self::$account, self::$password );
		if (! $this->con) {
			die ( 'Could not connect: ' . mysql_error () );
		}
		$this->isConnect = true;
	}
	
	private function closeDatabase() 
	{
		mysql_close ( $this->con );
		$isConnect = false;
	}
	
	public function getAllData() 
	{
		if ($this->worksArray!=null)
		{
			return $this->worksArray;
		}
		$this->worksArray=array();
		
		$this->connectDatabase();

		mysql_select_db (self::$database, $this->con );
	
		$result = mysql_query ( "select * from Works" );
		
		while ( $row = mysql_fetch_array ( $result ) ) 
		{
			$work=new WorksBean();
			$work->setWorkID($row['WorkID']);
			$work->setName($row['Name']);
			$work->setLaunchImage($row['LaunchImage']);
			$work->setDescription($row['Description']);
			$work->setIcon($row['Icon']);
				
			array_push($this->worksArray,$work);
			
		}	
		$this->closeDatabase();
		return $this->worksArray;
	}
}
?>
