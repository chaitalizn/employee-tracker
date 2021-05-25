//this is to hold all sql queries
const connection = require('./connection');

class DB{
    constructor(connection){
        this.connection = connection;
    }

    createEmployee() {
        return this.connection.query(
            'INSERT INTO employee SET ?', (employee)
        );
    }

    createRole() {
        return this.connection.query(
            'INSERT INTO roles SET ?', (role)
        );
    };

    createDepartment() {
        return this.connection.query(
            'INSERT INTO department SET ?', (department)
        );
    };
};

module.exports = DB;