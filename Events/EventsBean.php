<?php 

class EventsBean
{
	private $id;
	private $date;
	private $event;
	private $eventImage;
	
	public function _construct()
	{
	}
	
	/**
	 * @return the $id
	 */
	public function getId() {
		return $this->id;
	}

	/**
	 * @return the $date
	 */
	public function getDate() {
		return $this->date;
	}

	/**
	 * @return the $event
	 */
	public function getEvent() {
		return $this->event;
	}

	/**
	 * @return the $eventImage
	 */
	public function getEventImage() {
		return $this->eventImage;
	}

	/**
	 * @param field_type $id
	 */
	public function setId($id) {
		$this->id = $id;
	}

	/**
	 * @param field_type $date
	 */
	public function setDate($date) {
		$this->date = $date;
	}

	/**
	 * @param field_type $event
	 */
	public function setEvent($event) {
		$this->event = $event;
	}

	/**
	 * @param field_type $eventImage
	 */
	public function setEventImage($eventImage) {
		$this->eventImage = $eventImage;
	}

}



?>