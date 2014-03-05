<div id="startWorks"></div>
  
    <div class="worksDiv" id="worksDiv">
    	<div class="galleryDiv">
    		<div class="galleryMoveContainer">
    			<?php
    				require_once ('WorksDao.php');
    				require_once ('WorksBean.php');
    				$pageItemCount=6;
    				$worksArray=WorksDao::sharedWorksDao()->getAllData();
    				for ($i=1; $i<=(count($worksArray)-1)/$pageItemCount+1; $i++)
    				{
    					echo "<span class=\"galleryMoveSpan\">";		
       					for ($j=($i-1)*$pageItemCount; $j<min($pageItemCount*$i,count($worksArray) ); $j++)
    					{
    						$item=$worksArray[$j];
    					//	$itemId=$item->getWorkID();
    						$itemIcon=$item->getIcon();
    						
    						$itemHover=$item->getIconHover();
    						$itemLaunchImage=$item->getLaunchImage();
    						echo  "<div class=\"worksItem\" style=\"background:url($itemIcon)\"  icon=\"$itemIcon\" launchImage=\"$itemLaunchImage\"  iconHover=\"$itemHover\"></div>" ;		
    					}
    					echo "</span>";
    				}
    			?>
    		</div>
    		
    	</div>
    	
    	<div style="clear:both"></div>
    	<span class="worksIndicateDiv">
    		<?php
    			echo "<a class=\"worksIndicateItem selected\" id=\"1\"></a>" ;
    			for ($i=2; $i<=(count($worksArray)-1)/$pageItemCount+1; $i++)
    			{ 
    				echo "<a class=\"worksIndicateItem\" id=\"$i\"></a>" ;
    			}
    		?>
    	</span>
  </div>
