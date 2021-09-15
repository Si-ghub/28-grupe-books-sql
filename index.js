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
    const name1 = await Author.create(conn, 'Paula', 'Paulaviciute')
    const name2 = await Author.create(conn, 'Vardenis', 'Pavardenis');
    const name3 = await Author.create(conn, 'Tomas', 'Manas');

    console.log(name1);
    console.log(name2);
    console.log(name3);

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

    // findByFirstName
    console.log('');
    const authorsByFirstName1 = await Author.findByFirstname(conn, 'Paula');
    const authorsByFirstName2 = await Author.findByFirstname(conn, 'Vardenis');
    const authorsByFirstName3 = await Author.findByFirstname(conn, 'Tomas');

    console.log(authorsByFirstName1);
    console.log(authorsByFirstName2);
    console.log(authorsByFirstName3);

    // findByLastName
    console.log('');
    const authorsByLastName1 = await Author.findByLastname(conn, 'Paulaviciute');
    const authorsByLastName2 = await Author.findByLastname(conn, 'Pavardenis');
    const authorsByLastName3 = await Author.findByLastname(conn, 'Manas');

    console.log(authorsByLastName1);
    console.log(authorsByLastName2);
    console.log(authorsByLastName3);
}


app.init();

module.exports = app;