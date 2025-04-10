"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        this.httpServer = http_1.default.createServer(this.app);
        this.io = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: 'http://localhost:5173',
                methods: ['GET', 'POST', 'DELETE', 'PUT'],
            },
        });
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    connectToDatabase() {
        mongoose_1.default.connect(`${config_1.config.databaseURL}${config_1.config.databaseName}`)
            .then(() => {
            console.log('Połączono z bazą');
        })
            .catch(err => {
            console.error('Błąd połączenia z bazą: ', err);
        });
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
    }
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    listen() {
        this.httpServer.listen(config_1.config.port, () => {
            console.log(`Serwer używa portu: ${config_1.config.port}`);
        });
    }
}
exports.default = App;
