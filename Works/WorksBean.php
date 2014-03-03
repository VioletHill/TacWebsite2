<?php
class WorksBean {
	private $workID;
	private $name;
	private $icon;
	private $iconHover;
	private $launchImage;
	private $Description;
	
	
	public function _construct()
	{
		echo "new worksBean";
	}
	
	/**
	 *
	 * @return the $workID
	 */
	public function getWorkID() {
		return $this->workID;
	}
	
	/**
	 *
	 * @return the $name
	 */
	public function getName() {
		return $this->name;
	}
	
	/**
	 *
	 * @return the $icon
	 */
	public function getIcon() {
		return $this->icon;
	}
	
	/**
	 *
	 * @return the $iconHover
	 */
	public function getIconHover() {
		return $this->iconHover;
	}
	
	/**
	 *
	 * @return the $launchImage
	 */
	public function getLaunchImage() {
		return $this->launchImage;
	}
	
	/**
	 *
	 * @return the $Description
	 */
	public function getDescription() {
		return $this->Description;
	}
	
	/**
	 *
	 * @param field_type $workID        	
	 */
	public function setWorkID($workID) {
		$this->workID = $workID;
	}
	
	/**
	 *
	 * @param field_type $name        	
	 */
	public function setName($name) {
		$this->name = $name;
	}
	
	/**
	 *
	 * @param field_type $icon        	
	 */
	public function setIcon($icon) {
		$this->icon = $icon;
	}
	
	/**
	 *
	 * @param field_type $iconHover        	
	 */
	public function setIconHover($iconHover) {
		$this->iconHover = $iconHover;
	}
	
	/**
	 *
	 * @param field_type $launchImage        	
	 */
	public function setLaunchImage($launchImage) {
		$this->launchImage = $launchImage;
	}
	
	/**
	 *
	 * @param field_type $Description        	
	 */
	public function setDescription($Description) {
		$this->Description = $Description;
	}
}


?>