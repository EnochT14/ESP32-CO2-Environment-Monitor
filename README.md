![PCB](/PCB Gerber/3D_Design.png "3D PCB")

# ESP32 CO2 Monitor

This project is a React application that fetches data from an API and visualizes it using Highcharts. The application displays charts for temperature, humidity, CO2 (Carbon Dioxide), and TVOC (Total Volatile Organic Compounds) data. It fetches data at regular intervals and updates the charts dynamically.

## Prerequisites

To run this application, you need to have the following software installed on your system:

- Node.js
- NPM (Node Package Manager)
- XAMPP
- PHP installed on your server or local machine.
- A MySQL database with the appropriate sensor data table.

## Getting Started

### React App Setup

1. Clone the repository or download the source code.
2. Open a terminal and navigate to the project directory.
3. Install the dependencies by running the following command:

   ```
   npm install highcharts-react-official
   ```

4. Start the development server:

   ```
   npm start
   ```

5. The application should open in your default browser at `http://localhost:3000`. If it doesn't, manually open this URL.

### PHP Setup

1. Open the PHP script file (`api.php`) in a text editor.
2. Modify the database connection parameters:

   ```php
   $conn = mysqli_connect("localhost", "root", "", "sensor_data");
   ```

   - Replace `"localhost"` with the hostname or IP address of your MySQL server.
   - Replace `"root"` with the username for accessing the database.
   - Replace `""` with the password for the database.
   - Replace `"sensor_data"` with the name of the database containing the sensor data table.

3. Save the modified PHP script.
4. Upload the PHP script to your server or move it to the appropriate directory.

### Database Setup

1. Open the XAMPP Control Panel and start the Apache and MySQL services.
2. Navigate to http://localhost/phpmyadmin.
3. Click on the "SQL" tab at the top of the page.
4. Paste the code snippet into the SQL query editor.
5. Click the "Go" button to execute the query.

## Configuration

The application fetches data from an API endpoint. If you want to use a different API or modify the existing one, you can make the necessary changes in the `fetchData` function located in the `App` component.

By default, the data is fetched every 5 seconds (5000 milliseconds). If you want to change the fetch interval, you can modify the interval value in the `useEffect` hook of the `App` component.

## Notes

- Ensure that the database table and column names in the SQL query match your specific setup.
- Suppose the PHP script (`api.php`) is hosted at `http://example.com/api.php`. To retrieve the data, you can make an HTTP GET request to the URL `http://example.com/api.php`.