<?php

class Get{
    protected $gm, $pdo;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
    }

    //User Operations

    public function pullAllUser ($d) {
		  $sql = "SELECT * FROM tbl_user";
		
		  $res = $this->gm->generalQuery($sql, "No records found");
		  if ($res['code'] == 200) {
			  $payload = $res['data'];
			  $remarks = "success";
			  $message = "Successfully retrieved requested data";
		  } else {
			  $payload = null;
			  $remarks = "failed";
			  $message = $res['errmsg'];
		  }
		  return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
	  }
    
    public function pullSpecUser ($d) {
		  $sql = "SELECT * FROM tbl_user WHERE user_id = '$d'";
		
		  $res = $this->gm->generalQuery($sql, "No records found");
		  if ($res['code'] == 200) {
			  $payload = $res['data'];
			  $remarks = "success";
			  $message = "Successfully retrieved requested data";
		  } else {
			  $payload = null;
			  $remarks = "failed";
			  $message = $res['errmsg'];
		  }
		  return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
	  }

	//Employee Operations    

    public function pullAllEmp ($d) {

		$sql = "SELECT * FROM employees_tb ";
		
		$res = $this->gm->generalQuery($sql, "No records found");
		  if ($res['code'] == 200) {
			  $payload = $res['data'];
			  $remarks = "success";
			  $message = "Successfully retrieved requested data";
		  } else {
			  $payload = null;
			  $remarks = "failed";
			  $message = $res['errmsg'];
		  }
		  return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
	  }

    public function pullSpecEmp ($d) {

		$sql = "SELECT * FROM employees_tb WHERE emp_id = '$d'";
		
		$res = $this->gm->generalQuery($sql, "No records found");
		  if ($res['code'] == 200) {
			  $payload = $res['data'];
			  $remarks = "success";
			  $message = "Successfully retrieved requested data";
		  } else {
			  $payload = null;
			  $remarks = "failed";
			  $message = $res['errmsg'];
		  }
		  return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
	  }

	  //Wage Operations  

	  public function pullAllWage ($d) {

		$sql = "SELECT * FROM wage_tb ";
		
		$res = $this->gm->generalQuery($sql, "No records found");
		  if ($res['code'] == 200) {
			  $payload = $res['data'];
			  $remarks = "success";
			  $message = "Successfully retrieved requested data";
		  } else {
			  $payload = null;
			  $remarks = "failed";
			  $message = $res['errmsg'];
		  }
		  return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
	  }

	   //Attendance Operations  

	  public function pullAllAtt ($d) {

		$sql = "SELECT * FROM attendance_tb ";
		
		$res = $this->gm->generalQuery($sql, "No records found");
		  if ($res['code'] == 200) {
			  $payload = $res['data'];
			  $remarks = "success";
			  $message = "Successfully retrieved requested data";
		  } else {
			  $payload = null;
			  $remarks = "failed";
			  $message = $res['errmsg'];
		  }
		  return $this->gm->sendPayload($payload, $remarks, $message, $res['code']);
	  }

    


  //End of Methods
}
?>
