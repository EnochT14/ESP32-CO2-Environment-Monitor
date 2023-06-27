#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <Adafruit_CCS811.h>
#include <Adafruit_SH1106.h>
#include <WiFiMulti.h>

const char *ssid = "YourWifi";
const char *password = "Password";
const char *host = "host-ip";
const char *url = "/your-directory/your-endpoint.php";

Adafruit_SH1106 display(4);
Adafruit_BME280 bme;
Adafruit_CCS811 ccs;
WiFiMulti WiFiMulti;

void setup() {
  Serial.begin(115200);
  Wire.begin();
  display.begin(SH1106_SWITCHCAPVCC, 0x3C);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(15, OUTPUT);

  WiFiMulti.addAP(ssid, password);
  while (WiFiMulti.run() != WL_CONNECTED) delay(500);

  if (!bme.begin(0x76)) while (1);
  if (!ccs.begin()) while (1);
  delay(2000);
}

void loop() {
  float temperature = bme.readTemperature();
  float humidity = bme.readHumidity();
  float pressure = bme.readPressure() / 100.0F;
  int co2 = ccs.geteCO2();
  int tvoc = ccs.getTVOC();

  WiFiClient client;
  if (!client.connect(host, 8089)) return;

  String postData = String("temperature=") + String(temperature) + String("&humidity=") + String(humidity) + String("&pressure=") + String(pressure) + String("&co2=") + String(co2) + String("&tvoc=") + String(tvoc); 

  client.print("POST " + String(url) + " HTTP/1.1\r\n"
               + "Host: " + String(host) + "\r\n"
               + "Content-Type: application/x-www-form-urlencoded\r\n"
               + "Content-Length: " + String(postData.length()) + "\r\n"
               + "\r\n"
               + postData);

  while (client.connected()) {
    if (client.available()) Serial.println(client.readStringUntil('\r'));
  }

  if (ccs.available() && ccs.readData()) return;

  if (co2 < 500) {
    digitalWrite(15, HIGH);
    digitalWrite(4, LOW);
    digitalWrite(5, LOW);
  } else if (co2 < 1200) {
    digitalWrite(15, LOW);
    digitalWrite(4, HIGH);
    digitalWrite(5, LOW);
  } else {
    digitalWrite(15, LOW);
    digitalWrite(4, LOW);
    digitalWrite(5, HIGH);
  }

  display.clearDisplay(); 
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0); 
  display.print("Temp: ");
  display.print(temperature);
  display.print(" C");
  display.setCursor(0, 13); 
  display.print("Humidity: ");
  display.print(humidity);
  display.print(" %");
  display.setCursor(0, 26); 
  display.print("Pressure: ");
  display.print(pressure);
  display.print(" hPa");
  display.setCursor(0, 39); 
  display.print("CO2: ");
  display.print(co2);
  display.print(" ppm");
  display.setCursor(0, 52);  
  display.print("TVOC: ");
  display.print(tvoc);
  display.print(" ppb");
  display.display(); 
  

  
  Serial.print("Temp: ");                //Display readings on serial monitor
  Serial.println(temperature);
  Serial.print("Humidity: ");
  Serial.println(humidity);
  Serial.print("Pressure: ");
  Serial.println(pressure);
  Serial.print("CO2: ");
  Serial.print(ccs.geteCO2());
  Serial.println(" ppm");
  Serial.print("TVOC: ");
  Serial.print(ccs.getTVOC());
  Serial.println(" ppb");
  delay(10000);
  display.clearDisplay(); 
}
