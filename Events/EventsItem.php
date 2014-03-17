<?php 

	require_once ('EventsBean.php');
	require_once ('EventsDao.php');
	include_once ('DatabaseInfo.php');
	
	$eventsItem = EventsDao::sharedEventsDao()->getAllData();
	for ($i=0; $i<count($eventsItem); $i++)
	{
 		$item=$eventsItem[$i];
 		$json=array('date'=>$item->getDate(),'event'=>$item->getEvent(),'eventImage'=>$item->getEventImage());
 		echo json_encode($json);
 		echo ';';
	}
	
?>