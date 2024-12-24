"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WssService = void 0;
const ws_1 = require("ws");
class WssService {
    //ESTO HARA QUE SE CONSTUYA DENTRO DEL A MISMA CLASE
    constructor(options) {
        const { server, path = "/ws" } = options; // localhost:PORT/ws
        this.wss = new ws_1.WebSocketServer({ server, path });
        this.start();
    }
    static get instance() {
        if (!WssService._instance) {
            throw new Error("WssService no inicializado");
        }
        return WssService._instance;
    }
    //CREACION DE LA INSTANCIA
    static intiWss(options) {
        WssService._instance = new WssService(options);
    }
    start() {
        this.wss.on("connection", (ws) => {
            console.log("cliente conectado");
            ws.on("close", () => {
                console.log("cliente desconectado");
            });
        });
    }
}
exports.WssService = WssService;
