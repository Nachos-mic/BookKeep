import App from "./app"
import BookController from "../controllers/book.controller";
import BestsellersController from "../controllers/bestsellers.controller";

const bookController = new BookController();
const bestsellerController = new BestsellersController();

const app = new App(
    [
        bestsellerController,
        bookController
    ]
);


app.listen();