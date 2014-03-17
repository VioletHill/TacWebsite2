<?php

include_once ('WorksBean.php');
include_once ('DatabaseInfo.php');
include_once ('../DatabaseInfo.php');	//给php路径跪了。。。。 别的文件include这个文件  这时候路径是相对于那个include你的文件

class WorksDao 
{
	private static $_sharedWorksDao = null;

	private $con;
	private $isConnect;
	private $worksArray;
	public static function sharedWorksDao() 			//单例失效？  why？ 难道在传送完网页以后 就被销毁了？
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
		if ($this->isConnect == true)  return;
		$this->con = mysql_connect (DatabaseInfo::ipAddress(), DatabaseInfo::account(), DatabaseInfo::password() );
		if (! $this->con) {
			die ( 'Could not connect: ' . mysql_error () );
		}
		$this->isConnect = true;
	}
	
	private function closeDatabase() 
	{
		mysql_close ( $this->con );
		$this->isConnect = false;
	}
	
	public function getAllData() 
	{
		if ($this->worksArray!=null)		
		{
			return $this->worksArray;
		}
		$this->worksArray=array();
		
		$this->connectDatabase();
		mysql_select_db (DatabaseInfo::database(), $this->con );
		
		$result = mysql_query ( "select * from Works" );
		
		while ( $row = mysql_fetch_array ( $result ) ) 
		{
			$work=new WorksBean();
			$work->setWorkID($row['WorkID']);
			$work->setName($row['Name']);
			$work->setLaunchImage($row['LaunchImage']);
			$work->setDescription($row['Description']);
			$work->setIcon($row['Icon']);
			$work->setIconHover($row['IconHover']);
			$work->setScreenShoot($row['ScreenShoot']);
			$work->setItunsLink($row['ITunsLink']);
			$work->setAuthor($row['Author']);
			array_push($this->worksArray,$work);		
		}	
		$this->closeDatabase();
		return $this->worksArray;
	}
	
	public function getItemById($id)
	{
		$tempWorksArr=$this->getAllData();
		foreach ($tempWorksArr as $item) 
		{
			if ($item->getWorkID()==$id) return $item;
		}
		return  null;
	}
}
?>
