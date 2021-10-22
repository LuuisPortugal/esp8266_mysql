/**
   PostHTTPClient.ino

    Created on: 21.11.2016

*/

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

/* this can be run with an emulated server on host:
        cd esp8266-core-root-dir
        cd tests/host
        make ../../libraries/ESP8266WebServer/examples/PostServer/PostServer
        bin/PostServer/PostServer
   then put your PC's IP address in SERVER_IP below, port 9080 (instead of default 80):
*/
#define SERVER_IP "IP_DO_SERVIDOR:3000"

#ifndef STASSID
#define STASSID "NOME_DO_WIFI"
#define STAPSK  "SENHA_DO_WIFI"
#endif

// variables will change:
int buttonState = 0;   
int ldrState = 0;

void setup() {

  Serial.begin(115200);

  Serial.println();
  Serial.println();
  Serial.println();

  WiFi.begin(STASSID, STAPSK);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());

  pinMode(D1, INPUT);
}

void loop() {
  // wait for WiFi connection
  if ((WiFi.status() == WL_CONNECTED)) {
    
    int _buttonState = digitalRead(D1);
    int _ldrState = analogRead(A0);

    if(ldrState != _ldrState){
      ldrState = _ldrState;

      char payload[255];
      sprintf(payload, "{\"pino\":\"A0\", \"valor\":\"%d\"}", ldrState);

      Serial.print("POST: ");
      Serial.println(payload);

      WiFiClient client;
      HTTPClient http;
      http.begin(client, "http://" SERVER_IP "/pino_valor"); //HTTP
      http.addHeader("Content-Type", "application/json");
      http.POST(payload);
      http.end();
    }
    
    if(buttonState != _buttonState){ 
      buttonState = _buttonState;

      WiFiClient client;
      HTTPClient http;
      http.begin(client, "http://" SERVER_IP "/pino_valor"); //HTTP
      http.addHeader("Content-Type", "application/json");
      
      if(buttonState == 0){
        Serial.print("POST: ");
        Serial.println("{\"pino\":\"D1\", \"valor\":\"false\"}");
        
        http.POST("{\"pino\":\"D1\", \"valor\":\"false\"}");
      }else{
        Serial.print("POST: ");
        Serial.println("{\"pino\":\"D1\", \"valor\":\"true\"}");
       
        http.POST("{\"pino\":\"D1\", \"valor\":\"true\"}");
      }
      
      http.end();
    }
  }

  delay(1000);
}
