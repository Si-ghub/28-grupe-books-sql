const db = require('./db');
const Author = require('./Author');
const Books = require('./Books');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const conn = await db.init({
        host: 'localhost',
        user: 'root',
        database: 'books',
    });

    // LOGIC BELOW
    // create
    console.log('');
    const paula = await Author.create(conn, 'Paula', 'Paulaviciute')
    const vardas = await Author.create(conn, 'Vardenis', 'Pavardenis');
    const tomas = await Author.create(conn, 'Tomas', 'Manas');
    const alessandro = await Author.create(conn, 'Alessandro', 'Baricco');
    const michael = await Author.create(conn, 'Michael', 'Ondaatje');

    console.log(paula);
    console.log(vardas);
    console.log(tomas);
    console.log(alessandro);
    console.log(michael);

    // listAll
    console.log('');
    const authorsList = await Author.listAll(conn);
    console.log(authorsList);

    // findById
    console.log('');
    const authorsById1 = await Author.findById(conn, 1);
    const authorsById2 = await Author.findById(conn, 2);
    const authorsById3 = await Author.findById(conn, 3);

    console.log(authorsById1);
    console.log(authorsById2);
    console.log(authorsById3);
}


app.init();

module.exports = app;