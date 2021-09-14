const Author = {};

/**
 * Knygos autoriaus irasymas i duomenu baze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes manipuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas.
 * @param {string} authorLastname Autoriaus pavarde.
 * @returns Tekstas, apibudinantis, koks autorius buvo irasytas i duomenu baze.
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
 * @returns Visu autoriu, irasytu i duomenu baze, sarasas.
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

Author.findById = async (connection, authorId) => {
}

Author.findByFirstname = async (connection, authorFirstname) => {
}

Author.findByLastname = async (connection, authorLastname) => {
}

Author.updatePropertyById = async (connection, authorId, propertyName, propertyValue) => {
}

Author.delete = async (connection, authorId) => {
}

module.exports = Author;