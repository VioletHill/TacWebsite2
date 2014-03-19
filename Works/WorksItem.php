<?php 

	require_once ('WorksBean.php');
	require_once ('WorksDao.php');
	include_once ('DatabaseInfo.php');

	$itemId=$_POST['id'];
	$workItem = WorksDao::sharedWorksDao()->getItemById($itemId);
	
	if ($workItem)
	{
		$json=array('name'=>$workItem->getName(),'description'=>$workItem->getDescription(),'screenShoot'=>$workItem->getScreenShoot(),'itunsLink'=>$workItem->getItunsLink(),'author'=>$workItem->getAuthor());
		echo json_encode($json);
	}
	else
	{
		echo null;
	}
	
?>