<?php 

class HomeDao
{
	private static $_sharedHomeDao = null;
	
	private $con;
	private $isConnect;
	private $homeArray;

	public static function  sharedHomeDao()
	{
		if (self::$_sharedHomeDao==null)
		{
			self::$_sharedHomeDao=new HomeDao();
		}
		return self::$_sharedHomeDao;
	}
	
	public function _construct()
	{
	}
	
	private function connectDatabase()
	{
		if ($this->isConnect == true)	return;
	
		$this->con = mysql_connect (DatabaseInfo::ipAddress(), DatabaseInfo::account(), DatabaseInfo::password() );
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
	
	function getAllData()
	{
		if ($this->homeArray!=null)
		{
			return $this->homeArray;
		}
		$this->homeArray=array();
		
		$this->connectDatabase();
		
		mysql_select_db (DatabaseInfo::database(), $this->con );
		
		$result = mysql_query ( "select * from Home" );
		
		while ( $row = mysql_fetch_array ( $result ) )
		{
			$home=new HomeBean();
			$home->setBackgroundImage($row['BackgroundImage']);
			$home->setId($row['ID']);
			array_push($this->homeArray,$home);
		}
		$this->closeDatabase();
		return $this->homeArray;
	}
	
}


?>