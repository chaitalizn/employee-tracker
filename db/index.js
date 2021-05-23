//this is to hold all sql queries
const connection = require('./connection');

class DB{
    constructor(connection){
        this.connection = connection;
    }

    createEmployee() {
        return this.connection.query(
            'INSERT into employee SET ?', (employee)
        );
    }
};