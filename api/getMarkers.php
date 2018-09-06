<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');


$markersJson = file_get_contents('../markers_json.txt');
echo $markersJson;
exit();


/**This code show how it is could be possible with mysql database
 *
    $db_host = "localhost";
    $db_user = "root";
    $db_password = "";
    $db_base = 'mybase';

    $mysqlConnect = new mysqli($db_host, $db_user, $db_password, $db_base);
    if ($mysqlConnect->connect_error) {
        die('Ошибка : ('. $mysqlConnect->connect_errno .') '. $mysqlConnect->connect_error);
    }

    $query = "SELECT lat, lng from table_name ";
    $resSql = mysqli_query($mysqlConnect, $query) or die('Read error of coordinates from table_name.');

    $markersArray = array();
    while($row = mysqli_fetch_assoc($resSql)){
        $markersArray[] = $row;
    }

    mysqli_close($mysqlConnect);
    echo json_encode($markersArray);
    exit();
 *
 */








