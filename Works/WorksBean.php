<?php
class WorksBean {
	private $workID;
	private $name;
	private $icon;
	private $iconHover;
	private $launchImage;
	private $Description;
	private $screenShoot;
	private $author;
	private $itunsLink;
	
	public function _construct()
	{
	}
	
	/**
	 * @return the $author
	 */
	public function getAuthor() {
		return $this->author;
	}

	/**
	 * @return the $itunsLink
	 */
	public function getItunsLink() {
		return $this->itunsLink;
	}

	/**
	 * @param field_type $author
	 */
	public function setAuthor($author) {
		$this->author = $author;
	}

	/**
	 * @param field_type $itunsLink
	 */
	public function setItunsLink($itunsLink) {
		$this->itunsLink = $itunsLink;
	}

	/**
	 * @return the $screenShoot
	 */
	public function getScreenShoot() {
		return $this->screenShoot;
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
	
	/**
	 * @param field_type $screenShoot
	 */
	public function setScreenShoot($screenShoot) {
		$this->screenShoot = $screenShoot;
	}
	
}


?>