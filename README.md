Aplikacja posiada zestaw 6 endpointów:

GET - localhost:3100/api/v1/books (pobiera wszystkie książki w bazie) <br />
GET - localhost:3100/api/v1/books/id (pobiera daną książkę z bazy na podstawie jej id nadanego przez mongoDB, bezpośrednio w aplikacji webowej nie jest wykorzystany) <br />
POST - localhost:3100/api/v1/books (dodaje ksiażkę do bazy danych) <br />
PUT - localhost:3100/api/v1/books/id (edytuje daną książkę w bazie) <br />
DELETE - localhost:3100/api/v1/books/id (usuwa daną książkę z bazy) <br />
GET - localhost:3100/api/v1/bestsellers (pobiera bestsellery z bazy danych, które zostały wczytane przez API z api deweloperskiego New York Times - pobiera je co 4 godziny do bazy danych zamieniając je z poprzednimi) <br /> <br />

Żeby uruchomić projekt potrzebny jest Node.js oraz MongoDB.

Przed uruchomieniem projektu należy utworzyć nową bazę danych w MongoDB (jeśli takowa nie istnieje)

Po pobraniu projektu,należy w terminalu najpierw przejść do folderu api i wykonać komendę: npm install <br />
Po wykonaniu tej komendy, proszę przejść do pliku .env_example i w nim podać URL do bazy danych oraz jej nazwę. Po tym należy zmienić nazwę pliku na .env <br />
(klucz api potrzebny do pobierania książek z zewnętrznego źródła się znajduje już w pliku .env_example)

PORT=3100  <br />
MONGO_URL= URL DO BAZY W MONGODB <br />
DATABASE_NAME= NAZWA BAZY  <br />
NYT_API_KEY= KLUCZ DO API NEW YORK TIMES <br /> <br />

Aby uruchomić api, trzeba wykonać komendy:

npm run build <br />
npm start <br />

(Można jeszcze przeprowadzić testy wykonując komendę: npm run test) <br />

Aby uruchomić UI należy wejść do folderu front, wykonać ten zestaw komend w terminalu:

npm install <br />
npm run build <br />
npm run dev <br />

UI będzie dostępne pod linkiem [localhost:](http://localhost:5173/)
