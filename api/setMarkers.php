<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

$entityBody = file_get_contents('php://input');
file_put_contents('../markers_json.txt', $entityBody);
echo 'success';
exit();

/**This code show how it is could be possible with mysql database
 *
    $db_host = "localhost";
    $db_user = "root";
    $db_password = "";
    $db_base = 'mybase';

    $entityBody = file_get_contents('php://input');

    $mysqlConnect = new mysqli($db_host, $db_user, $db_password, $db_base);
    if ($mysqlConnect->connect_error) {
    die('Ошибка : ('. $mysqlConnect->connect_errno .') '. $mysqlConnect->connect_error);
    }
    mysqli_query($mysqlConnect, 'DELETE from table_name') or die('Delete error of coordinates from table_name.');

    $coordinatesVal = '';
    $coordinatesArr = json_decode($entityBody, true, 3);

    foreach($coordinatesArr as $coordinate){
    $coordinatesVal .= '('.$coordinate['lat'].', '.$coordinate['lng'].'),';
    }

    $coordinatesVal = substr($coordinatesVal, 0, -1);

    $query = "INSERT INTO table_name (lat, lng) VALUES ".$coordinatesVal." ";
    mysqli_query($mysqlConnect, $query) or die('Write error of coordinates in a table_name.');
    mysqli_close($mysqlConnect);
 *
 */











