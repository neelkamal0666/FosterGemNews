<?php
class APICaller {
    function getDataFromDB($url){
        $curl = curl_init($url);
        //log_error("calling api".$url,"API caller.php");
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array( 'Content-Type: application/json') );
        $json_response = curl_exec($curl);
        $curl_errno = curl_errno($curl);
        $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        if ($status == 200)
        {
            //log_error("got api response","API caller.php");
        } else {
           // log_error($status.$json_response,"Get data api call".$url);
        }

        curl_close($curl);
        return $json_response;
    }

    function postData($url,$data_string){
        $curl = curl_init($url);

        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array( 'Content-Type: application/json', 'Content-Length: ' . strlen($data_string)) );
        $json_response = curl_exec($curl);
        $curl_errno = curl_errno($curl);
        $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        if ($status == 200)
        {

        } else {
            //log_error($status.$json_response,"Post data api call".$url.$data_string);
        }

        curl_close($curl);
        return $json_response;
    }
}