CREATE TABLE data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  temperature DECIMAL(5, 2),
  humidity DECIMAL(5, 2),
  pressure DECIMAL(7, 2),
  co2 DECIMAL(6, 2),
  tvoc DECIMAL(6, 2),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
