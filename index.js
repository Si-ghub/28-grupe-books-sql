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

    //AUTHOR AUTHOR AUTHOR AUTHOR AUTHOR

    // create
    console.log('');
    const name1 = await Author.create(conn, 'Paula', 'Paulaviciute')
    const name2 = await Author.create(conn, 'Vardenis', 'Pavardenis');
    const name3 = await Author.create(conn, 'Tomas', 'Manas');
    const name4 = await Author.create(conn, 'Tadas', 'Blinda');
    const name5 = await Author.create(conn, 'Laura', 'May');

    console.log(name1);
    console.log(name2);
    console.log(name3);
    console.log(name4);
    console.log(name5);

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

    // updatePropertyById
    console.log('');
    const updateById1 = await Author.updatePropertyById(conn, 1, 'lastname', 'Paulavice');
    const updateById2 = await Author.updatePropertyById(conn, 2, 'firstname', 'Vardas');

    console.log(updateById1);
    console.log(updateById2);

    // delete
    console.log('');
    const deleteAuthor1 = await Author.delete(conn, 3);

    console.log(deleteAuthor1);

    //BOOKS BOOKS BOOKS BOOKS BOOKS

    // create
    console.log('');
    const createBooks1 = await Books.create(conn, 1, 'Jura', 1990);
    const createBooks2 = await Books.create(conn, 2, 'Vandevynas', 1991);
    const createBooks3 = await Books.create(conn, 3, 'Upe', 1992);
    const createBooks4 = await Books.create(conn, 4, 'Ezeras', 1993);

    console.log(createBooks1);
    console.log(createBooks2);
    console.log(createBooks3);
    console.log(createBooks4);

    // listAll
    console.log('');
    const listAllBooks = await Books.listAll(conn);
    console.log(listAllBooks);

    // findByName
    console.log('');
    const booksByName1 = await Books.findByName(conn, 'Jura');
    const booksByName2 = await Books.findByName(conn, 'Vandevynas');
    const booksByName3 = await Books.findByName(conn, 'Upe');

    console.log(booksByName1);
    console.log(booksByName2);
    console.log(booksByName3);

    console.log('');
    const booksByYear1 = await Books.findByYear(conn, 1990, 'Jura');
    const booksByYear2 = await Books.findByYear(conn, 1991, 'Vandevynas');
    const booksByYear3 = await Books.findByYear(conn, 1992, 'Upe');

    console.log(booksByYear1);
    console.log(booksByYear2);
    console.log(booksByYear3);

    console.log('');
    const bookUpdateById1 = await Books.updateById(conn, 1, 'book_name', 'Juodoji jura');
    console.log(bookUpdateById1);

    console.log('');
    const updateNameById1 = await Books.updateNameById(conn, 1, 'Rami jura');
    console.log(updateNameById1);

    console.log('');
    const updateYearById1 = await Books.updateYearById(conn, 1, '1994');
    console.log(updateYearById1);

    console.log('');
    const booksDelete1 = await Books.delete(conn, 2);
    console.log(booksDelete1);

    console.log('');
    const deleteAllByAuthorId1 = await Books.deleteAllByAuthorId(conn, 3);
    console.log(deleteAllByAuthorId1);
}

app.init();

module.exports = app;