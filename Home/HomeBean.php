<?php 

class HomeBean{
	private $backgroundImage;
	private $id;
	
	/**
	 * @return the $id
	 */
	
	public function _construct()
	{
	}
	
	public function getId() {
		return $this->id;
	}

	/**
	 * @param field_type $id
	 */
	public function setId($id) {
		$this->id = $id;
	}

	/**
	 * @return the $backgroundImage
	 */
	public function getBackgroundImage() {
		return $this->backgroundImage;
	}

	/**
	 * @param field_type $backgroundImage
	 */
	public function setBackgroundImage($backgroundImage) {
		$this->backgroundImage = $backgroundImage;
	}

}


?>