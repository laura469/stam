// // const mysql = require('mysql2');
// // const con = mysql.createConnection({
// //   host: '0.0.0.0',
// //   user: 'root',
// //   port: '3306',
// //   password: 'catering-gabay',
// //   database: 'mmg',
// // });

// // con.connect((err) => {
// //   if (err) console.log('err', err);
// //   console.log('Connected!');
// // });

// const mariadb = require('mariadb');
// const pool = mariadb.createPool(
//   {
//     host: 'localhost',
//     dialect: 'mariadb',
//     user: 'root',
//     port: '3306',
//     password: 'catering-gabay',
//     database: 'mmg',
//     define: {
//       charset: 'utf8',
//       collate: 'utf8_general_ci',
//     },
//     charset: 'utf8',
//     dialectOptions: {
//       ssl: Boolean(false),
//       charset: 'utf8',
//       collate: 'utf8_general_ci',
//       allowPublicKeyRetrieval: true,
//     },
//   }

//   //   {
//   //   host: '0.0.0.0',
//   //   user: 'root',
//   //   port: '3307',
//   //   password: 'catering-gabay',
//   //   database: 'mmg',
//   //   connectionLimit: 10,
//   //   timeout: 30,
//   //   idleTimeout: 30,
//   // }
// );

// const execute = async (query) => {
//   try {
//     const conn = await pool.getConnection();
//     const rows = await conn.query(query);
//     delete rows.meta;
//     conn.end();
//     return rows;
//   } catch (err) {
//     // conn.end();
//     console.log('errorrr :', err);
//     throw err;
//   }
// };

// module.exports = {
//   execute,
// };
const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  port: '3307',
  password: 'catering-gabay',
  database: 'mmg',
  connectionLimit: 10,
  connectTimeout: 30000,
  acquireTimeout: 30000,
  queueLimit: 1000,
  allowPublicKeyRetrieval: true,
  ssl: false,
});

pool
  .getConnection()
  .then((connection) => {
    console.log('Connected to the database!');
    connection.release();
  })
  .catch((err) => {
    console.log('Error connecting to the database:', err);
  });

const execute = async (query) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(query);
    return rows;
  } catch (err) {
    console.log('Error executing query:', err);
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

module.exports = {
  execute,
};
