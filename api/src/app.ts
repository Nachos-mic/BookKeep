import mongoose from 'mongoose';
import {config} from "./config";
import express from 'express'
import http from 'http';
import {Server} from 'socket.io';
import Controller from "../interfaces/controller.inteface";
import cors from 'cors';
import morgan from 'morgan';

class App {
    public app: express.Application;
    public httpServer: http.Server;
    public io: Server;

    constructor(controllers: Controller[]) {
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.io = new Server(this.httpServer, {
            cors: {
                origin: 'http://localhost:5173',
                methods: ['GET', 'POST' , 'DELETE' , 'PUT'],
            },
        });

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private connectToDatabase() {
        mongoose.connect(`${config.database_URL}${config.database_name}`)
            .then(() => {
                console.log('Połączono z bazą');
            })
            .catch(err => {
                console.error('Błąd połączenia z bazą: ', err);
            });
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan('dev'));
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.httpServer.listen(config.port, () => {
            console.log(`Serwer używa portu: ${config.port}`);
        });
    }
}

export default App;