import { Server } from "http";
import {WebSocket,  WebSocketServer } from "ws";

interface Options {
  server: Server; // IMPORTANTE SEA HTTP
  path?: string;

}



export class WssService {

  //Almacenar la instancia iniciada
  private static _instance: WssService;
  private wss: WebSocketServer;
  
  //ESTO HARA QUE SE CONSTUYA DENTRO DEL A MISMA CLASE
  private constructor(options: Options) {
    const { server, path = "/ws" } = options; // localhost:PORT/ws

    this.wss = new WebSocketServer({ server, path });
    this.start();
  }
  

  static get instance() {
    if (!WssService._instance) {
      throw new Error("WssService no inicializado");
    }
    return WssService._instance;
  }

  //CREACION DE LA INSTANCIA
  static intiWss(options: Options) {
    WssService._instance = new WssService(options);
  }
  

  public sendMessage(type: string, payload: Object) {
    this.wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        console.log("enviando mensaje");
        client.send(JSON.stringify({ type, payload }));
      }
    });
  }

  public start() {

    this.wss.on("connection", (ws: WebSocket) => {
      console.log("cliente conectado");
      ws.on("close", () => {
        console.log("cliente desconectado");
      })
      
  })

  }

}
