import request from 'supertest';
import App from "../src/app";
import BookController from "../controllers/book.controller";
import BestsellersController from "../controllers/bestsellers.controller";

const bookController = new BookController();
const bestsellersController = new BestsellersController();

const appInstance = new App(
    [
        bestsellersController,
        bookController
    ]
);

describe('Book API Tests', () => {

    it('Test GET /api/v1/books', async () => {
        const response = await request(appInstance.app)
            .get('/api/v1/books')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('page');
        expect(response.body).toHaveProperty('limit');
        expect(response.body).toHaveProperty('total_pages');
    });

    it('Test POST + DELETE /api/v1/books', async () => {
        const newBook = {
            name: 'Test Book',
            author: 'Test Author',
            is_read: false,
            genre: 'Fiction',
            rating: 8.5
        };

        const response = await request(appInstance.app)
            .post('/api/v1/books')
            .send(newBook)
            .expect('Content-Type', /json/)
            .expect(201);

        console.log(response.body._id)

        expect(response.body).toHaveProperty('_id');
        expect(response.body.name).toBe(newBook.name);

        const deleteResponse = await request(appInstance.app)
            .delete(`/api/v1/books/${response.body._id}`)
            .expect(200);

        expect(JSON.parse(deleteResponse.text)).toBe(`Skasowano książkę o id: ${response.body._id}`);
    });

    it('Test GET /api/v1/books/:id', async () => {
        const newBook = {
            name: 'Test Book',
            author: 'Test Author',
            is_read: false,
            genre: 'Fiction',
            rating: 8.5
        };

        const postResponse = await request(appInstance.app)
            .post('/api/v1/books')
            .send(newBook);

        const book_id = postResponse.body._id;

        const getResponse = await request(appInstance.app)
            .get(`/api/v1/books/${book_id}`)
            .expect(200);

        expect(getResponse.body._id).toBe(book_id);
        expect(getResponse.body.name).toBe(newBook.name);

        const deleteResponse = await request(appInstance.app)
            .delete(`/api/v1/books/${book_id}`)
            .expect(200);

        console.log(deleteResponse.text);
    });

    it('Test PUT /api/v1/books/:id', async () => {
        const newBook = {
            name: 'Test Book',
            author: 'Test Author',
            is_read: false,
            genre: 'Fiction',
            rating: 8.5
        };

        const postResponse = await request(appInstance.app)
            .post('/api/v1/books')
            .send(newBook)
            .expect(201);

        const bookId = postResponse.body._id;

        const updatedBook = {
            name: 'Updated Put Test Book',
            author: 'Updated Put Test Author',
            is_read: true,
            genre: 'Thriller',
            rating: 8.5
        };

        const putResponse = await request(appInstance.app)
            .put(`/api/v1/books/${bookId}`)
            .send(updatedBook)
            .expect(200);

        expect(putResponse.body).toMatchObject(updatedBook);

        const getResponse = await request(appInstance.app)
            .get(`/api/v1/books/${bookId}`)
            .expect(200);

        expect(getResponse.body).toMatchObject(updatedBook);

        const deleteResponse = await request(appInstance.app)
            .delete(`/api/v1/books/${bookId}`)
            .expect(200);

        console.log(deleteResponse.text);
    });

});