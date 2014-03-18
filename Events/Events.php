

<div id="startEvents"></div>
<div class="eventsDiv">
	<br>
	<br>
	<p class="startEventsTitle">EVENTS</p>
	
	<div class="timeLineCanvasDiv">		<!-- ��Ӧ����¼� -->
		<canvas id="timeLineCanvas" width="1234px" height="30px">
		</canvas>
		<canvas id="timeEventsCanvas" width="1234px" height="80px"> 
		</canvas>
	</div>
	
	<div class="eventImageDiv" >
		<?php 
			require_once ('EventsDao.php');
    		require_once ('EventsBean.php');
    		$eventsArray=EventsDao::sharedEventsDao()->getAllData();
    		$eventImage=$eventsArray[count($eventsArray)-1]->getEventImage();
    		$eventImage=explode(",",$eventImage);
    		for ($i=0; $i<4; $i++)
    		{
    			echo "<div class='eventImageItemDiv'>";
    			echo "<img class=\"eventImage\" src=\" $eventImage[$i] \">";
    			echo "</div>";
    		}
		?>
		
	</div>
</div>