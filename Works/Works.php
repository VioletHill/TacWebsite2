	<div id="startWorks" style="height:60px; margin-top:0px"></div>
 
    <div class="worksDiv" id="worksDiv">
    	<br>
  		<p class="startWorksTitle">WORKS</p>
  		
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
    						$itemId=$item->getWorkID();
    						$itemIcon=$item->getIcon();
    						
    						$itemHover=$item->getIconHover();
    						$itemLaunchImage=$item->getLaunchImage();
    						echo  "<div class=\"worksItem\" style=\"background:url($itemIcon); background-repeat:no-repeat; background-size:100% 100%; \" id=\"$itemId\" icon=\"$itemIcon\" launchImage=\"$itemLaunchImage\"  iconHover=\"$itemHover\"></div>" ;		
    					}
    					echo "</span>";
    				}
    			?>
    		</div>
    		
    	</div>
    	
    	<div style="clear:both"></div>
    	<div class="worksIndicateDiv">
    		<?php
    			echo "<a class=\"worksIndicateItem selected\" id=\"1\"></a>" ;
    			for ($i=2; $i<=(count($worksArray)-1)/$pageItemCount+1; $i++)
    			{ 
    				echo "<a class=\"worksIndicateItem\" id=\"$i\"></a>" ;
    			}
    		?>
    	</div>    	
  	</div>
<!--   	tempItem -->
<!--   	<div class="itemShowDiv"> -->
<!--     	<div class="itemIcon"> -->
<!--     		<div class="closeShowItem"></div> -->
<!--     		<h1 class="itemShowName"></h1> -->
<!--     		<img src="Works/Image/abc.png" class="itemShowIcon"> -->
<!--     		<div class="itemViewInITunes">View In iTunes</div> -->
<!--     		<p class="itemAuthor"></p> -->
<!--     	</div> -->
<!--     	<div class="itemDescription"> -->
<!--     		<h1>Description</h1> -->
<!--     		<div class="itemShowDescription"></div> -->
<!--    			<div class="itemShowScreenShoot"> -->
<!--     		</div> -->
<!--     	</div> -->

<!--     </div> -->

