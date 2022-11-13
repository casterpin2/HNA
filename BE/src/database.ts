import dotenv from 'dotenv';
import { createPool, Pool, PoolConnection } from 'mysql';

dotenv.config();

const DATA_SOURCE = {
  DB_HOST: process.env.MY_SQL_DB_HOST,
  DB_USER: process.env.MY_SQL_DB_USER,
  DB_PASSWORD: process.env.MY_SQL_DB_PASSWORD,
  DB_PORT: process.env.MY_SQL_DB_PORT,
  DB_DATABASE: process.env.MY_SQL_DB_DATABASE,
  DB_CONNECTION_LIMIT: process.env.MY_SQL_DB_CONNECTION_LIMIT ? parseInt(process.env.MY_SQL_DB_CONNECTION_LIMIT) : 4,
}

/**
 * generates pool connection to be used throughout the app
 */
export const init = async () => {
  try {
    const connect = createPool({
      connectionLimit: DATA_SOURCE.DB_CONNECTION_LIMIT,
      host: DATA_SOURCE.DB_HOST,
      user: DATA_SOURCE.DB_USER,
      password: DATA_SOURCE.DB_PASSWORD,
      database: DATA_SOURCE.DB_DATABASE
    });
    return connect;
  } catch (error) {
    console.error('[mysql.connector][init][Error]: ', error);
    throw new Error('failed to initialized pool');
  }
};
export const execute = async <T>(query: string, params: string[] | Object | Object[],isMultiple:boolean = false): Promise<T> => {
  try {
    const pool = await init();
    if (!pool) throw new Error('Pool was not created. Ensure pool is created when running the app.');

    return new Promise<T>((resolve, reject) => {
      pool.getConnection((err, conn) => {
      

        if (err) {
          reject(err);
        } else{
          conn.beginTransaction((err) => {
            if (err) { //Transaction Error (Rollback and release connection)
              conn.rollback(() => {
                conn.release();
              });
            }
            pool.query(query,isMultiple? [params] : params, (error, results) => {
              
              if (error) {
                conn.rollback();
                conn.release();
                reject(error);
               
              }
              else {
                
                resolve(results);
                conn.release();
                conn.commit();
             
               
              };
         
            });
            
          })
        }
        
       
      })


    });

  } catch (error) {
    console.error('[mysql.connector][execute][Error]: ', error);
    throw new Error('failed to execute MySQL query');
  }
}





