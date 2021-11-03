#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define SERVER_IP "ec2-18-191-253-24.us-east-2.compute.amazonaws.com:3000"

#ifndef STASSID
#define STASSID "NOME_DO_WIFI"
#define STAPSK  "SENHA_DO_WIFI"
#endif

// Variaveis dos componentes
int buttonState = 0;   
int ldrState = 0;

// Carrego o setup do arduino
void setup() {
  // Inicio o monitor serial
  Serial.begin(115200);

  // Conecto o wifi
  WiFi.begin(STASSID, STAPSK);

  // Verifico se o Wifi foi conectado, caso não aguardo a conexão
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  // Mostro o ip da rede
  Serial.println("");
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());

  // Seto o pino como entrada
  pinMode(D1, INPUT);
}

void loop() {
  // Verifico se o wifi esta conectado
  if (WiFi.status() == WL_CONNECTED) {
    
    // Leio o valor do sensor
    int _buttonState = digitalRead(D1);
    int _ldrState = analogRead(A0);

    // Verifico se mudou o valor do sensor
    if(ldrState != _ldrState){
      // Se sim, atualizo para a proxima verificação
      ldrState = _ldrState;

      // Construo o payload de envio
      char payload[255];
      sprintf(payload, "{\"pino\":\"A0\", \"valor\":\"%d\"}", ldrState);

      Serial.print("POST: ");
      Serial.println(payload);

      // Envio o valor para a API salvar no banco de dados
      WiFiClient client;
      HTTPClient http;
      http.begin(client, "http://" SERVER_IP "/pino_valor"); //HTTP
      http.addHeader("Content-Type", "application/json");
      http.POST(payload);
      http.end();
    }
    
    // Verifico se mudou o valor do sensor
    if(buttonState != _buttonState){ 
      // Se sim, atualizo para a proxima verificação
      buttonState = _buttonState;

      // Envio o valor para a API salvar no banco de dados
      WiFiClient client;
      HTTPClient http;
      http.begin(client, "http://" SERVER_IP "/pino_valor"); //HTTP
      http.addHeader("Content-Type", "application/json");
      
      // Construo o payload de envio
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

  // Aguardo 1s para realizar novo envio
  delay(1000);
}
