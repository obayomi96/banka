import pool from './db';

/**
  * @function query
  * @description queries the db with the specified string
  * @param {string} queryString - the query string
  * @returns {*} nothing
  */
const query = async (queryString) => {
  console.log(queryString);
  pool.on('connect', () => {
    console.log('connected to the db');
  });
  pool.query(queryString)
    .then(() => {
      pool.end();
    })
    .catch((err) => {
      console.log('error', err);
      pool.end();
    });

  pool.on('remove', () => {
    console.log('client removed');
    process.exit();
  });
};

export default query;
