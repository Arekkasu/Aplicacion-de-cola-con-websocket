# Aplicacion de Colas con WebSocket

Este proyecto es la integracion de Express y Websocket para la comunicacion de
monitoria de sistema de colas, usado principalmente como en los cajeros o siste-
mas de turno

## Instalación

1. Clonar el repositorio
2. Instalar las dependencias 
```bash
npm install
```
3. Configurar el .env
4. Correr el servidor
```bash
npm start
```


### Que es un web Socket
Un websocket es un puerto establecido para la comunicacion directa con el servidor sin necesidad de peticiones HTTP. Principalmente usado en cuestiones de tiempo real. como puede ser un chat o la carga de datos al tiempo o hacer un directo


![image](https://github.com/user-attachments/assets/f2351e20-d1c1-4d09-8781-dd26e538c8a0)


### Como se maneja?
Al estar conectados se termina estableciendo como un punto de conexion de webSocket
este tiene Tres estas
1. On
2. Message
3. close
por lo que se manejan todas las peticiones desde un mismo canal y no por ruta como
ws://server/get o ws://server/post, no, esto se deben ser manejados por los clientes que esten conectados al websocket y por el payload. Lo mejor es que estos se identifiquen por un type en el payload
```json
{
	"payload": {
		"type": "peticion"
		"data": // Segun la logica del programa
	}
}
```
haciendo que este verifique los types para que trabajen y la respuesta se adecue en el cliente
