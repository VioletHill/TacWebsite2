<?php

include_once ('MembersBean.php');
include_once ('DatabaseInfo.php');
include_once ('../DatabaseInfo.php');	//给php路径跪了。。。。 别的文件include这个文件  这时候路径是相对于那个include你的文件

class MembersDao 
{
	private static $_sharedMembersDao = null;

	private $con;
	private $isConnect;
	private $membersArray;
	public static function sharedMembersDao() 			//单例失效？  why？ 难道在传送完网页以后 就被销毁了？
	{
		if (self::$_sharedMembersDao == null) {
			self::$_sharedMembersDao = new MembersDao();
		}
		return self::$_sharedMembersDao;
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
		if ($this->membersArray!=null)		
		{
			return $this->membersArray;
		}
		$this->membersArray=array();
		$this->connectDatabase();
		mysql_select_db (DatabaseInfo::database(), $this->con );
		$result = mysql_query ( "select * from Members" );
		
		while ( $row = mysql_fetch_array ( $result ) ) 
		{
			$member=new MembersBean();
			$member->setMembersID($row['MemberID']);
			$member->setName($row['Name']);
			$member->setLink($row['Link']);
			$member->setProfilePicture($row['ProfilePicture']);
			$member->setProfession($row['Profession']);
			array_push($this->membersArray,$member);		
		}	
		$this->closeDatabase();
		return $this->membersArray;
	}
}
?>
