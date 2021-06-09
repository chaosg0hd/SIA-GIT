<?php


class Post{
    protected $gm, $pdo, $get;

    public function __construct(\PDO $pdo) {
        $this->pdo = $pdo;
        $this->gm = new GlobalMethods($pdo);
        $this->get = new Get($pdo);
    }

    // Request Operations

    public function addReq($data) {
        $code = 401;
        $payload = null;
        $remarks = "failed";
        $message = "Unable to retrieve data";
        $reqInfo = $data;
        $res = $this->gm->insert('tbl_req', $reqInfo);
        if($res['code']==200) {
            $code = 200;
            $payload = $res;
            $remarks = "success";
            $message = "Successfully retrieved data";
        }
        return $this->gm->sendPayload($payload, $remarks, $message, $code);
    }

    public function delReq($d) {
      $data = $d;
      $req_id = $data->req_id;
      $res = $this->gm->delete('tbl_req', $data, "req_id = '$req_id'");
      if ($res['code'] == 200) {
			  $payload = $res['data'];
			  $remarks = "success";
			  $message = "Successfully retrieved requested data";
		  } else {
			  $payload = null;
			  $remarks = "failed";
			  $message = $res['errmsg'];
		  }
      return $this->gm->sendPayload($payload, $remarks, $message, $code);
    }

    public function editReq($d) {
      $data = $d;
      $req_id = $data->req_id;
      $res = $this->gm->edit('tbl_req', $data, "req_id = '$req_id'");
      if ($res['code'] == 200) {
			  $payload = $res['data'];
			  $remarks = "success";
			  $message = "Successfully retrieved requested data";
		  } else {
			  $payload = null;
			  $remarks = "failed";
			  $message = $res['errmsg'];
		  }
      return $this->gm->sendPayload($payload, $remarks, $message, $code);
    }

    // Comment Operations

    public function addCom($data) {
      $code = 401;
      $payload = null;
      $remarks = "failed";
      $message = "Unable to retrieve data";
      $comInfo = $data;

      $res = $this->gm->insert('tbl_com', $comInfo);

      if($res['code']==200) {
          $code = 200;
          $payload = $res;
          $remarks = "success";
          $message = "Successfully retrieved data";
      }
      return $this->gm->sendPayload($payload, $remarks, $message, $code);
    }

    public function delCom($d) {
      $data = $d;
      $com_id = $data->com_id;
      $res = $this->gm->delete('tbl_com', $data, "com_id = '$com_id'");
      if ($res['code'] == 200) {
			  $payload = $res['data'];
			  $remarks = "success";
			  $message = "Successfully retrieved requested data";
		  } else {
			  $payload = null;
			  $remarks = "failed";
			  $message = $res['errmsg'];
		  }
      return $this->gm->sendPayload($payload, $remarks, $message, $code);
    }

    public function editCom($d) {
        $data = $d;
        $com_id = $data->com_id;
        $res = $this->gm->edit('tbl_com', $data, "com_id = '$com_id'");
        if ($res['code'] == 200) {
			$payload = $res['data'];
			$remarks = "success";
			$message = "Successfully retrieved requested data";
		} else {
			$payload = null;
			$remarks = "failed";
			$message = $res['errmsg'];
		}
    }
    
}
