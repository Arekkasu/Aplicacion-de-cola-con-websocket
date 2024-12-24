import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/service/wss.service';


(async()=> {
  main();
})();


function main() {

  const server = new Server({
    port: envs.PORT,
  })
  // servidor con la configuracion de express
  const httpServer = createServer(server.app);
  WssService.intiWss({server: httpServer})
  server.setRoutes(AppRoutes.routes);
  httpServer.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
  }
  );
}
