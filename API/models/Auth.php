<?php
	class Auth {
		protected $gm;
		protected $pdo;
    

		public function __construct(\PDO $pdo) {
			$this->gm = new GlobalMethods($pdo);
			$this->pdo = $pdo;
		}
		
		########################################
		# 	USER AUTHORIZATION RELATED METHODS
		########################################
		protected function generateHeader() {
			$h=[
				"typ"=>"JWT",
				"alg"=>'HS256',
				"app"=>"Tinda",
				"dev"=>"Ramirez, Jimenez, Marchan"
			];
			return str_replace(['+','/','='],['-','_',''], base64_encode(json_encode($h)));
		}

		protected function generatePayload($uid, $un, $fn) {
			$p = [   
				'uid'=>$uid,
				'un'=>$un,
				'fn'=>$fn,
				'iby'=>'Ramirez Chris John',
				'ie'=>'ramirez@futuredev.com',
				'idate'=>date_create()
			];
			return str_replace(['+','/','='],['-','_',''], base64_encode(json_encode($p)));
		}

		protected function generateToken($userid, $uname, $fullname) {
			$header = $this->generateHeader();
			$payload = $this->generatePayload($userid, $uname, $fullname);
			$signature = hash_hmac('sha256', "$header.$payload", "www.gordoncollege.edu.ph");
			return str_replace(['+','/','='],['-','_',''], base64_encode($signature));
		}

    ########################################
		# 	USER AUTHENTICATION RELATED METHODS
		########################################
		public function encrypt_password($pword) {
			$hashFormat="$2y$10$";
		    $saltLength=22;
		    $salt=$this->generate_salt($saltLength);
		    return crypt($pword,$hashFormat.$salt);
		}


    protected function generate_salt($len) {
			$urs=md5(uniqid(mt_rand(), true));
	    $b64String=base64_encode($urs);
	    $mb64String=str_replace('+','.', $b64String);
	    return substr($mb64String,0,$len);
		}

    public function pword_check($pword, $existingHash) {
			$hash=crypt($pword, $existingHash);
			if($hash===$existingHash){
				return true;
			}
			return false;
		}

    public function regUser($dt){
			$payload = "";
			$remarks = "";
			$message = "";
            $payload = $dt;
            $encryptedPassword = $this->encrypt_password($dt->user_password);

            $payload = array(
                'uname'=>$dt->user_name,
                'pword'=>$this->encrypt_password($dt->user_password)
            );

            $sql = "INSERT INTO tbl_user( user_name, user_contact, user_interests, user_email, user_password) 
                           VALUES ('$dt->user_name', '$dt->user_contact', '$dt->user_interests', '$dt->user_email','$encryptedPassword')";                     

                           $data = array(); $code = 0; $errmsg= ""; $remarks = "";
                           try {
                       
                               if ($res = $this->pdo->query($sql)->fetchAll()) {
                                   foreach ($res as $rec) { array_push($data, $rec);}
                                   $res = null; 
								   $code = 200; $message = "Successfully Registered"; $remarks = "success";
                                   return array("code"=>200, "remarks"=>"success");
                               }
                           } catch (\PDOException $e) {
                               $errmsg = $e->getMessage();
                               $code = 403;
                           }
						return $this->gm->sendPayload($payload, $remarks, $message, $code);                
        }


      public function loginUser($dt){
			$payload = $dt;
			$user_email = $dt->user_email;
			$user_password = $dt->user_password;
			$payload = "";
			$remarks = "";
			$message = "";
			$code = 403;

			$sql = "SELECT * FROM tbl_user WHERE user_email='$user_email' LIMIT 1";
			$res = $this->gm->generalQuery($sql, "Incorrect username or password");
			if($res['code'] == 200) {
				if($this->pword_check($user_password, $res['data'][0]['user_password'])) {
					
				
					$user_name =$res['data'][0]['user_name'];
					$user_id = $res['data'][0]['user_id'];
					$user_interests = $res['data'][0]['user_interests'];				

					$code = 200;
					$remarks = "success";
					$message = "Logged in successfully";
					$payload = array("user_id"=>$user_id, "user_name"=>$user_name, "user_interests"=>$user_interests);
				} else {
					$payload = null; 
					$remarks = "failed"; 
					$message = "Incorrect username or password";
				}
			}	else {
				$payload = null; 
				$remarks = "failed"; 
				$message = $res['errmsg'];
			}
			return $this->gm->sendPayload($payload, $remarks, $message, $code);
		}


    }
    ?>
