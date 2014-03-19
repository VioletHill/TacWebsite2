<?php 
class MembersBean {
	private $membersID;
	private $name;
	private $link;
	private $profilePicture;
	private $profession;
	
	public function _construct()
	{
	}
	
	/**
	 * @return the $membersID
	 */
	public function getMembersID() {
		return $this->membersID;
	}

	/**
	 * @return the $name
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * @return the $link
	 */
	public function getLink() {
		return $this->link;
	}

	/**
	 * @return the $profilePictre
	 */
	public function getProfilePicture() {
		return $this->profilePicture;
	}

	/**
	 * @return the $profession
	 */
	public function getProfession() {
		return $this->profession;
	}

	/**
	 * @param field_type $membersID
	 */
	public function setMembersID($membersID) {
		$this->membersID = $membersID;
	}

	/**
	 * @param field_type $name
	 */
	public function setName($name) {
		$this->name = $name;
	}

	/**
	 * @param field_type $link
	 */
	public function setLink($link) {
		$this->link = $link;
	}

	/**
	 * @param field_type $profilePictre
	 */
	public function setProfilePicture($profilePicture) {
		$this->profilePicture = $profilePicture;
	}

	/**
	 * @param field_type $profession
	 */
	public function setProfession($profession) {
		$this->profession = $profession;
	}

	
	
}


?>