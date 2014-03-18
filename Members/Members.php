<div id="startMembers"></div>

<div class="membersDiv">
	<br>
	<br>
	<p class="startMembersTitle">MEMBERS</p>		
	<div class="membersList">
		<div class="membersListContainer">
			<div class="membersMoveContainer">
			
				 <?php
    				require_once ('MembersDao.php');
    				require_once ('MembersBean.php');	
    				
    				$pageItemCount=3;
    				$membersArray=MembersDao::sharedMembersDao()->getAllData();
    				
    				for ($i=1; $i<=(count($membersArray)-1)/$pageItemCount+1; $i++)
    				{
       					for ($j=($i-1)*$pageItemCount; $j<min($pageItemCount*$i,count($membersArray) ); $j++)
    					{
    						$item=$membersArray[$j];
    						
    						$itemLink=$item->getLink();
    						$itemProfilePicture=$item->getProfilePicture(); 
    						$itemName=$item->getName();
    						$itemProfession=$item->getProfession();
    						
    						echo "<div class=\"membersBox\">";
    						echo "<div class=\"membersItem\">";
    						echo "<a href=\" $itemLink \"> ";
    						echo "<img class=\"membersItemImage\" src=\" $itemProfilePicture \">";
    						echo "</a>";
    						echo "</div>";
    						echo "<div class=\"membersInfo\"> $itemName/$itemProfession </div>";
    						echo "</div>";
    					}
    				}
    			?>			
<!-- 				<div class="membersBox"> -->
<!-- 					<div class="membersItem"> -->
<!-- 						<a href="http://www.baidu.com"> -->
<!--  						<img class="membersItemImage" src="Members/Image/mark.png"> -->
<!--  						</a>  -->
<!-- 					</div> -->
<!-- 					<div class="membersInfo">zhihao/chairMan</div> -->
<!-- 				</div> -->
			</div>
		</div>
		
		<div style="clear:both"></div>
		<?php
			echo "<div class=\"membersIndicateDiv\">";
			echo "<a class=\"membersIndicateItem membersIndicateSelected\" id=\"member1\"></a>";
			for ($i=2; $i<=(count($membersArray)-1)/$pageItemCount+1; $i++)
			{
				echo "<a class=\"membersIndicateItem\" id=\"member$i\"></a>" ;
			}
			echo "</div>"
		?>
<!--     	<div class="membersIndicateDiv"> -->
<!--     		<a class="membersIndicateItem" id="member1"></a> -->
<!--     	</div> -->
    		    		   	
	</div>
</div>