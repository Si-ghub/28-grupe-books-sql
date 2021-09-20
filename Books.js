/**
 * Kaip rasyti JSDOc'sus?
 * Link: https://jsdoc.app
 */

const Books = {};
// const Validations = require('./Validatios');

/**
 * Autoriaus isleistos knygos irasymas i duombaze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @param {string} bookName Knygos pavadinimas.
 * @param {number} bookReleaseYear Knygos isleidimo metai.
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius ir kurias metais isleido knyga.
 */
Books.create = async (connection, authorId, bookName, bookReleaseYear) => {
    const sql = 'INSERT INTO `books`\
                    (`id`, `author_id`, `book_name`, `release_year`)\
                VALUES (NULL, "' + authorId + '", "' + bookName + '" , "' + bookReleaseYear + '")';
    const [rows] = await connection.execute(sql);
    return `Knygos autoriaus ${authorId} knyga ${bookName}, isleista ${bookReleaseYear} buvo sekmingai irasyta.`
}

/**
 * Visu autoriu isleistu knygu sarasas.
 * @param {object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius ir kurias metais isleido knyga.
 */
Books.listAll = async (connection) => {
    const sql = 'SELECT * FROM `books`\
                    ORDER BY `author_id`';
    const [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return `Jokia knyga nerasta`;
    }

    const booksList = [];
    let count = 0;
    for (const books of rows) {
        booksList.push(`${++count}. Autorius ID ${books.author_id} isleido knyga ${books.book_name}. Leidimo metai ${books.release_year}.`);
    }
    return 'Knygu sarasas: \n' + booksList.join('\n');
}

/**
 * Knygos paieska pagal pavadinima.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} bookName Knygos pavadinimas.
 * @returns {Promise<string>} Tekstas su knygu pavadinimais.
 */
Books.findByName = async (connection, bookName) => {
    const sql = 'SELECT * FROM `books`\
                    WHERE `book_name` = "'+ bookName + '" ';
    const [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return `Knyga nerasta`
    } else {
        return `Pasirinkta knyga pagal pavadinima:\n ${bookName}.`
    }
}

/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookReleaseYear Skaicius, knygos leidimo metai.
 * @returns {Promise<string>} Tekstas, knygu sarasas pagal leidimo metus. 
 */
Books.findByYear = async (connection, bookReleaseYear) => {
    const sql = 'SELECT * FROM `books`\
                    WHERE `release_year` = "'+ bookReleaseYear + '"\
                    ORDER BY `release_year` ASC';
    const [rows] = await connection.execute(sql);

    const booksListByYear = [];
    let count = 0;
    for (const books of rows) {
        booksListByYear.push(`${++count}. Leidimo metai: ${books.release_year}, knygos Autorius su ID ${books.author_id}, isleido knyga ${books.book_name}.`)
    }
    return 'Knygu leidimai: \n' + booksListByYear.join('\n');
}

/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @param {string} propertyName Knygos savybes pavadinimas.
 * @param {string} propertyValue Atnaujintos savybes pavadinimas.
 * @returns {Promise<string>} Tekstas, atnaujinta knygos savybe.
 */
Books.updateById = async (connection, bookId, propertyName, propertyValue) => {
    const sql = 'UPDATE `books`\
                SET `'+ propertyName + '`= "' + propertyValue + '" \
                WHERE `books`.`id` =' + bookId;
    const [rows] = await connection.execute(sql);
    return `Knygos, pagal ID ${bookId} pavadinimas atnaujintas sekmingai i "${propertyValue}".`
}

/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @param {string} bookName Knygos pavadinimas.
 * @returns {Promise<string>} Tekstas, atnaujinta knygos savybe pagal ID.
 */
Books.updateNameById = async (connection, bookId, bookName) => {
    const sql = 'UPDATE `books`\
                SET `book_name` = "' + bookName + '" \
                WHERE `books`.`id` =' + bookId;
    const [rows] = await connection.execute(sql);
    return `Knygos, pagal ID ${bookId} pavadinimas atnaujintas sekmingai i "${bookName}".`
}

/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @param {string} bookReleaseYear Atnaujinti knygos isleidimo metai. 
 * @returns {Promise<string>} Tekstas, atnaujinti knygos isleidimo metai.
 */
Books.updateYearById = async (connection, bookId, bookReleaseYear) => {
    const sql = 'UPDATE `books`\
                SET `release_year` = "' + bookReleaseYear + '" \
                WHERE `books`.`id` =' + bookId;
    const [rows] = await connection.execute(sql);
    return `Knygos, pagal ID ${bookId} leidimo metai atnaujinti sekmingai i ${bookReleaseYear} metus.`
}

/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @returns {Promise<string>} Tekstas, knyga pagal nurodyta ID istrinta.
 */
Books.delete = async (connection, bookId) => {
    const sql = 'DELETE FROM `books`\
                WHERE `id` =' + bookId;
    const [rows] = await connection.execute(sql);
    return `Knyga, kurios ID: ${bookId}, sekmingai istrinta.`
}

/**
 * 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @returns {Promise<string>} Tekstas, visos nurodyto autoriaus ID knygos istrintos.
 */
Books.deleteAllByAuthorId = async (connection, authorId) => {
    const sql = 'DELETE FROM `books`\
                WHERE `author_Id` =' + authorId;
    const [rows] = await connection.execute(sql);
    return `Visos autoriaus pagal ID: ${authorId}, knygos sekmingai istrintos.`
}

module.exports = Books;