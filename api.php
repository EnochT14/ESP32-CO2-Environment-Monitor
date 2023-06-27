//simple php script to retrive JSON data from the DB
<?php
header('Access-Control-Allow-Origin: *');
$conn = mysqli_connect("localhost", "root", "", "sensor_data");
$result = mysqli_query($conn, "SELECT temperature, humidity, pressure, co2, tvoc, date FROM sensor_readings");

$data = array();

while ($row = mysqli_fetch_assoc($result)) {
  $data[] = array(
    "temperature" => $row["temperature"],
    "humidity" => $row["humidity"],
    "pressure" => $row["pressure"],
    "co2" => $row["co2"],
    "tvoc" => $row["tvoc"],
    "date" => $row["date"]
  );
}

echo json_encode($data, JSON_PRETTY_PRINT);
?>