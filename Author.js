const Author = {};

/**
 * Knygos autoriaus irasymas i duomenu baze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas.
 * @param {string} authorLastname Autoriaus pavarde.
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius buvo irasytas i duomenu baze.
 */
Author.create = async (connection, authorFirstname, authorLastname) => {
    const sql = 'INSERT INTO `authors`\
                    (`id`, `firstname`, `lastname`)\
                VALUES (NULL, "'+ authorFirstname + '", "' + authorLastname + '")';
    const [rows] = await connection.execute(sql);
    return `${authorFirstname} ${authorLastname} buvo sekmingai irasytas`;
}

/**
 * Knygu autoriu saraso isspausdinimas.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @returns {Promise<string>} Visu autoriu, irasytu i duomenu baze, sarasas.
 */
Author.listAll = async (connection) => {
    const sql = 'SELECT * FROM `authors`';
    const [rows] = await connection.execute(sql);
    let count = 0;
    const authorsList = [];
    for (let { firstname, lastname } of rows) {
        authorsList.push(`${++count}. ${firstname} ${lastname}`);
    };
    const list = 'Autoriu sarasas:\n';
    return list + authorsList.join('\n');
}

/**
 * Knygu autoriaus isspausdinimas pagal ID, nurodant varda ir pavarde.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {number} authorId Autoriaus ID numeris.
 * @returns {Promise<string>} Autoriaus vardas ir pavarde, pagal nurodyta ID numeri.
 */
Author.findById = async (connection, authorId) => {
    const sql = 'SELECT * FROM `authors`\
                     WHERE `id`= ' + authorId;
    const [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return `Autorius nerastas`
    } else {
        const firstName = rows[0].firstname;
        const lastName = rows[0].lastname;
        return `Pasirinktas autorius:\n ${firstName} ${lastName}.`
    }
}

/**
 * Knygu autoriaus isspausdinimas pagal varda, nurodant ir ID.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {string} authorFirstname  Autoriaus vardas.
 * @returns {Promise<string>} Autoriaus vardas, pagal nurodyta ID numeri.
 */
Author.findByFirstname = async (connection, authorFirstname) => {
    const sql = 'SELECT * FROM `authors`\
                    WHERE `firstname`= "'+ authorFirstname + '" ';
    const [rows] = await connection.execute(sql);
    console.log(rows);
    if (rows.length === 0) {
        return `Autorius nerastas`
    } else {
        const authorID = rows[0].id;
        return `Pasirinktas autorius pagal varda:\n ID ${authorID} First name: ${authorFirstname}.`
    }
}

/**
 * Knygu autoriaus isspausdinimas pagal pavarde, nurodant ir ID.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {string} authorLastname  Autoriaus pavarde.
 * @returns {Promise<string>} Autoriaus pavarde, pagal nurodyta ID numeri.
 */
Author.findByLastname = async (connection, authorLastname) => {
    const sql = 'SELECT * FROM `authors`\
                    WHERE `lastname`= "'+ authorLastname + '" ';
    const [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return `Autorius nerastas`
    } else {
        const authorID = rows[0].id;
        return `Pasirinktas autorius pagal pavarde:\n ID ${authorID} Last name: ${authorLastname}.`
    }
}

/**
 * Autoriaus savybes atnaujinimas pagal nurodyta ID.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {number} authorId Autoriaus ID numeris.
 * @param {string} propertyName Savybes pavadinimas.
 * @param {string} propertyValue Savybes nauja reiksme.
 * @returns {Promise<string>} Tekstas, nurodantis, kad autoriaus pagal nurodyta ID, nurodyta savybe atnaujinta. 
 */
Author.updatePropertyById = async (connection, authorId, propertyName, propertyValue) => {
    const sql = 'UPDATE `authors` SET\
        '+ propertyName + ' = "' + propertyValue + '"\
            WHERE `authors`.`id` =' + authorId;
    [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return `Autorius pagal ID ${authorId} nerastas`;
    } else {
        return `Autoriaus duomenys pagal ID ${authorId} sekmingai atnaujinti`;
    }
}

/**
 * Autoriaus istrinimas pagal nurodyta ID
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {number} authorId Autoriaus ID numeris.
 * @returns {Promise<string>} Tekstas, nurodantis, kad autorius pagal nurodyta ID yra istrintas. 
 */
Author.delete = async (connection, authorId) => {
    const sql = 'DELETE FROM `authors`\
                    WHERE `authors`.`id`='+ authorId;
    const [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return `Autorius pagal ID ${authorId} nerastas`;
    } else {
        return `Autorius pagal ID ${authorId} sekmingai istrintas`;
    }
}

module.exports = Author;