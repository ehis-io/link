const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
    });

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    //console.log('db is ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "select * from names;"; 

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);  
                })
            });
           
           // console.log(response);
            return response;

        }catch (error){
            console.log(error);
        }
    }
    async insertNewName(name){
        try{
            const dateAdded =new Date();
            const insertId = await new Promise((resolve, reject) => {
                const query = "insert into names (name, date_added) values (?,?);"; 

                connection.query(query,[name, dateAdded], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);  
                })
            });
           
            //console.log(insertId);
            return {
                id : insertId,
                name : name,
                dateAdded : dateAdded

            };

        }catch (error){
            console.log(error);
        }
    }
    
    async deleteRowById(id) {
        try {
            id = parseInt(id,10);
            const response = await new Promise((resolve, reject) => {
                 const query = "delete from names WHERE id = ?;"; 
    
                connection.query(query,[id,], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedrows);  
                })
            });
            return response === 1 ? true :false;  
        } catch (error){ 
            console.log(error);
            return false;
        }
    }
}
module.exports =DbService;