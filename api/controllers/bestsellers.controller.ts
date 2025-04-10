import Controller from '../interfaces/controller.inteface';
import { Request, Response, Router } from 'express';
import BestsellersService from "../services/bestseller.service";

class BookController implements Controller {
    public main_path = '/api/v1/bestsellers';
    public router = Router();
    private bestsellerService: BestsellersService;

    constructor() {
        this.bestsellerService = new BestsellersService();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(this.main_path, this.getBestsellers);
    }


    private getBestsellers = async (request: Request, response: Response): Promise<void> => {
        try {
            const products = await this.bestsellerService.getBestsellers();
            response.status(200).json(products);
        } catch (error: any) {
            console.error('Błąd podczas pobierania danych:', error);
            response.status(500).json({error: error.message || 'Wystąpił błąd podczas pobierania danych'});
        }
    }
}


export default BookController;