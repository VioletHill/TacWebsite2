<?php 

require_once ('EventsBean.php');
include_once ('DatabaseInfo.php');
include_once ('../DatabaseInfo.php');	//给php路径跪了。。。。 别的文件include这个文件  这时候路径是相对于那个include你的文件

class EventsDao
{
	private static $_sharedEventsDao = null;

	private $con;
	private $isConnect;
	private $eventsArray;

	public static function  sharedEventsDao()
	{
		if (self::$_sharedEventsDao==null)
		{
			self::$_sharedEventsDao=new EventsDao();
		}
		return self::$_sharedEventsDao;
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
		if ($this->eventsArray!=null)
		{
			return $this->eventsArray;
		}
		$this->eventsArray=array();

		$this->connectDatabase();

		mysql_select_db (DatabaseInfo::database(), $this->con );

		$result = mysql_query ( "select * from Events" );

		while ( $row = mysql_fetch_array ( $result ) )
		{
			$event=new EventsBean();
			$event->setId($row['ID']);
			$event->setDate($row['Date']);
			$event->setEvent($row['Event']);
			$event->setEventImage($row['EventImage']);
			array_push($this->eventsArray,$event);
		}
		$this->closeDatabase();
		return $this->eventsArray;
	}
}
?>