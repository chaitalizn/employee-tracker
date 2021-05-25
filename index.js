const db = require('./db/connection');
//const DB = require('./db/index');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


console.table(
    "\n------------ EMPLOYEE TRACKER ------------\n"
)

function mainMenu() {
    inquirer
    .prompt([
        {
        type: 'list',
        name: 'menu',
        message: 'Please select from following options.',
        choices: ['view all departments', 
        'view all roles', 
        'view all employees', 
        'add a department', 
        'add a role', 
        'add an employee',
        'update an employee role'],

        validate: (value)=> {
            if(value) {
                return true;
            } else {
                console.log('Please select a option')
                return false;
            }
            }
        }
    ])
    .then( answer => {
        switch(answer.menu) {
            case 'view all departments':
            displayDepartment();
            break;
            case 'view all roles':
            displayRoles();
            break;
            case 'view all employees':
            displayEmployee();
            break;
            case 'add a department':
            addDepartment();
            break;
            case 'add a role':
            addRole();
            break;
            case 'add an employee':
            addEmplopyee();
            break;
            case 'update an employee role':
            updateEmployeeRole();
            break;
            case 'quit app':
            exitApp();
            break;
        }
        }
    )
}

function displayDepartment() {
    console.log('All Department List')
    db.query('SELECT * FROM department ORDER BY id', (err, res) => {
        if (err) {
            return err;
          }
          console.table(res);

          //back to main menu
          mainMenu();
    });
};

function displayRoles() {
    console.log('All Roles List')
    db.query('SELECT * FROM roles LEFT JOIN department ON roles.department_id = department.id', (err, res) => {
        if (err) {
            return err;
          }
          console.table(res);

          //back to main menu
          mainMenu();
    });
};   

function displayEmployee() {
    //display employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
    console.log('All Employees List')
    db.query('SELECT employee.id, employee.first_name, employee.last_name, roles.title, roles.salary, department.name AS department_name FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id', (err, res) => {
        if (err) {
            return err;
          }
          console.table(res);

          //back to main menu
          mainMenu();
    });
};
 //enter the name of the department and that department is added to the database
function addDepartment() {
    console.log('Add new department')
    inquirer
    .prompt([
        //ask for department name
        {
            type: 'text',
            name: 'name',
            message: 'What is the name of the department you would like to add?',
        
            validate: (value)=> {
                if(value) {
                    return true;
                } else {
                    console.log("Please enter name of the new department")
                    return false;
                }
            }
        }
        ])
        .then(function(addDepartment) {
            db.query('INSERT INTO department SET ?', (addDepartment), (err, res) => {
                if (err) {
                    return err;
                  }
                  console.log(`${addDepartment} is add to database`);
                  mainMenu();
            })
        });
};
//enter the name, salary, and department for the role and that role is added to the database
//department options to choice from

function departmentOptions() {
    db.query('SELECT id, name FROM department', (err, res) => {
        if (err) {
            console.log(err);
          }
         return res;
         //console.log("departments", res);
    })
};

const addRole = async () => {
    console.log('Add new role')
    try {
    const promptUser = () => {
        return inquirer.prompt([
          //ask for role name
            {
                type: 'text',
                name: 'name',
                message: 'What role you would like to add?',
            
                validate: (value)=> {
                    if(value) {
                        return true;
                    } else {
                        console.log("Please enter role name")
                        return false;
                    }
                }
            },
          //ask for salary
            {
                type: 'text',
                name: 'salary',
                message: 'How much is the salary for this role?',
            
                validate: (value)=> {
                    if(value) {
                        return true;
                    } else {
                        console.log("Please salary amount for this role")
                        return false;
                    }
                }
            },
          //ask for department for the role
          {
            type: 'rawlist',
            name: 'department',
            message: 'Please select from following options.',
            choices: function() {
                //const departments = await departmentOptions();
                const choiceArray = [];
                departments.forEach(department => {
                    const departmentObj = {
                        name: department.name,
                        value: department.id
                    }
                    choiceArray.push(departmentObj)
                })
                return choiceArray;
          },
            validate: (value)=> {
                if(value) {
                    return true;
                } else {
                    console.log('Please select a department for this role')
                    return false;
                }
                }
            }
          ])
          .then(function(addRole) {
            // db.query('INSERT INTO role SET ?', (addRole.name, addRole.salary, addRole), 
            console.log(addRole)
          });
        };
    const departments = await departmentOptions();
    await promptUser();
    
    } catch (err) {
            console.log(err)
        }
};

//enter the employee’s first name, last name, role, and manager and that employee is added to the database
function addEmplopyee() {
    console.log('Add Emplopyee')
    inquirer
      .prompt([
          //ask for first name
          {
            type: 'text',
            name: 'firstName',
            message: 'What is the first name of the employee?',
        
            validate: (value)=> {
                if(value) {
                    return true;
                } else {
                    console.log("Please enter employee's first name")
                    return false;
                }
            }
        },
          //ask for last name
          {
            type: 'text',
            name: 'lastName',
            message: 'What is the last name of the employee?',
        
            validate: (value)=> {
                if(value) {
                    return true;
                } else {
                    console.log("Please enter employee's last name")
                    return false;
                }
            }
        },

          //ask for role 

          //select manager

      ])
      .then(function(addEmplopyee) {
        console.log(addEmplopyee)
      });

};

function updateEmployeeRole() {

};

function exitApp() {

};

mainMenu();