import express, { Router } from 'express';
import path from 'path';

interface Options {
  port: number;
  public_path?: string;
}


export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  //private readonly routes: Router;

  constructor(options: Options) {
    const { port, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    //this.routes = routes;
    // Y aqui se inicializaria para que se quede la condiguracion
    this.configure();
  }

  
  private configure() { 
    
    //* Middlewares
    this.app.use( express.json() ); // raw
    this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded

    //* Public Folder
    this.app.use( express.static( this.publicPath ) );

    //* Routes
    //this.app.use( this.routes );

    //IMPORTANT: * SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    // Unicamente si no existe la palabra api en la URL
    this.app.get(/^\/(?!api).*/, (req, res) => {
      const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
      res.sendFile(indexPath);
    });

  }
  //MINE: PORQUE SE ESTA SEPARANDO EL ROUTES Y NO SE PONE DIRECTAMENTE EN EL CONSTRUCTOR
  // ESTO ES DEBIDO A QUE OCMO EL WEBSOCKET DEBE INICIALIZAR TAMBIEN ENTONCES, SE DEBEN
  // ADECUAR LAS RUTAS, PARA QUE SE PUEDAN INICIALIZAR DE FORMA CORRECTA Y DAR LA REPSONSABILIDAD
  // AL SERVER Y LAS RUTAS Y SE PARARLAS AL DEL WEBSOCKET
  public setRoutes(routes: Router) {
    this.app.use(routes);
  }

  async start() {
     
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }

  public close() {
    this.serverListener?.close();
  }

}
